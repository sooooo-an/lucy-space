import { Application, Circle, Graphics } from 'pixi.js'
import React, { useEffect } from 'react'

export default function usePixiCircle(appInstance: Application | null) {
  useEffect(() => {
    if (!appInstance) return
    const app = appInstance

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePointerMove = (e: any) => {
      const circle = app.stage.addChild(
        new Graphics().circle(0, 0, 40).stroke({ width: 1, color: getColor() })
      )
      circle.position.set(app.screen.width / 2, app.screen.height / 2)
      circle.position.copyFrom(e.global)
    }

    app.stage.addEventListener('pointermove', handlePointerMove)

    return () => {
      app.stage?.removeEventListener('pointermove', handlePointerMove)
    }
  }, [appInstance])
}

const colors = [0x526e8c, 0x1b91e3, 0x29b191, 0xe5473c]
const getColor = () => {
  const idx = Math.floor(Math.random() * colors.length)
  return colors[idx]
}
