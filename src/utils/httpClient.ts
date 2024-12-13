import { ResponseError } from './ResponseError'

interface ResponseDataType<T> {
  data: T
  status: number
}

type HttpResponseType<T> = Promise<ResponseDataType<T>>

export interface HttpClientData {
  post<T>(url: string, options: HttpOptions): HttpResponseType<T>
  get<T>(url: string, options: HttpOptions): HttpResponseType<T>
  put<T>(url: string, options: HttpOptions): HttpResponseType<T>
  delete<T>(url: string, options: HttpOptions): HttpResponseType<T>
}

interface HttpOptions {
  body?: unknown
  query?: Record<string, string | number>
  headers?: HeadersInit
}

class HttpClient implements HttpClientData {
  constructor(
    private baseUrl: string = '',
    private headers: HeadersInit = {}
  ) {
    this.baseUrl = baseUrl
    this.headers = headers
  }

  private async request<T>(
    method: string,
    url: string,
    options: HttpOptions
  ): Promise<HttpResponseType<T>> {
    const queryString = options.query
      ? `?${new URLSearchParams(options.query as Record<string, string>).toString()}`
      : ''
    const fullUrl = `${this.baseUrl}${url}${queryString}`

    try {
      const response = await fetch(fullUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...this.headers,
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new ResponseError({
          status: response.status,
          message: `Error: ${response.statusText}`,
        })
      }

      return {
        status: response.status,
        data,
      }
    } catch (error) {
      console.error('[HTTP CLIENT ERROR]:', error)
      if (error instanceof ResponseError) {
        throw error
      }

      throw new ResponseError({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }

  public async post<T>(url: string, options?: HttpOptions): HttpResponseType<T> {
    return this.request<T>('POST', url, { ...options })
  }

  public async get<T>(url: string, options?: HttpOptions): HttpResponseType<T> {
    return this.request<T>('GET', url, { ...options })
  }

  public async put<T>(url: string, options?: HttpOptions): HttpResponseType<T> {
    return this.request<T>('PUT', url, { ...options })
  }

  public async delete<T>(url: string, options?: HttpOptions): HttpResponseType<T> {
    return this.request<T>('DELETE', url, { ...options })
  }
}

export const httpClient = new HttpClient()
