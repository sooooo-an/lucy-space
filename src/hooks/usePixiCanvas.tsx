import { Application } from 'pixi.js'
import { useCallback, useEffect, useRef, useState } from 'react'

const getApp = async () => {
  const app = new Application()
  await app.init({
    resizeTo: window,
    backgroundAlpha: 0,
    antialias: true,
  })
  return app
}

export const usePixiCanvas = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const [app, setApp] = useState<Application | null>(null)

  useEffect(() => {
    let isMounted = true

    const initApp = async () => {
      const instance = await getApp()
      if (isMounted) {
        setApp(instance)
      }
    }

    if (!app) {
      initApp()
    }

    return () => {
      isMounted = false
    }
  }, [app])

  const initPixi = useCallback(
    (container: HTMLDivElement) => {
      if (!app) return

      container.appendChild(app.canvas)
      app.stage.eventMode = 'static'
      app.stage.hitArea = app.screen
    },
    [app]
  )

  useEffect(() => {
    if (!canvasRef.current) return
    initPixi(canvasRef.current)

    return () => {
      if (app) {
        setApp(null)
      }
    }
  }, [initPixi, app])

  return { canvasRef, app }
}
