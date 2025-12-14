import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

// ----------------------------------------------------------------------

export interface PortalProps {
  children: React.ReactNode
  container?: HTMLElement | null
}

export function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
    }, 0)
  }, [])

  if (!mounted) {
    return null
  }

  return createPortal(children, container || document.body)
}
