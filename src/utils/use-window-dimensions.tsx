import React from 'react'

interface Size {
  width: number | undefined
  height: number | undefined
  isDesktop: boolean
}

export default function useWindowSize(): Size {
  const [windowSize, setWindowSize] = React.useState<Size>({
    width: undefined,
    height: undefined,
    isDesktop: false
  })

  React.useEffect(() => {
    function handleResize(): void {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isDesktop: window.innerWidth >= 850
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
