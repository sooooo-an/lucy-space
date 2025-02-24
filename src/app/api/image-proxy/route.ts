import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const imageUrl = req.nextUrl.searchParams.get('url')

  if (!imageUrl) {
    return NextResponse.json({ error: 'Image URL is Required' }, { status: 400 })
  }

  try {
    const response = await fetch(imageUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ImageProxy/1.0)' },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`)
    }

    const headers = new Headers(response.headers)
    headers.set('Cache-Control', 's-maxage=86400, stale-while-revalidate=43200')

    return new NextResponse(response.body, {
      status: response.status,
      headers,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
