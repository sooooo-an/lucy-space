'use client'

import React from 'react'
import { usePixiCanvas } from '@/hooks/usePixiCanvas'
import usePixiCircle from '@/hooks/usePixiCircle'

export default function Visual() {
  const { canvasRef, app } = usePixiCanvas()
  usePixiCircle(app)

  return (
    <section className="relative flex w-full flex-col items-center">
      {app && (
        <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl">
          <span className="typed-out">Hello World!</span>
        </h2>
      )}

      <div className="w-full bg-background" ref={canvasRef} />
    </section>
  )
}
