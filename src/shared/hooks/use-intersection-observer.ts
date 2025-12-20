import { useCallback, useEffect, useRef, useState } from "react"

// ----------------------------------------------------------------------

type UseIntersectionObserverOptions = {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

type UseIntersectionObserverReturn = {
  setObservationTarget: (element: HTMLElement | null) => void
  isIntersecting: boolean
}

// ----------------------------------------------------------------------

export function useIntersectionObserver(
  callback: () => void,
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const targetRef = useRef<HTMLElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  const setObservationTarget = useCallback(
    (element: HTMLElement | null) => {
      // 기존 observer 정리
      if (observerRef.current && targetRef.current) {
        observerRef.current.unobserve(targetRef.current)
      }

      targetRef.current = element

      // 새로운 observer 생성
      if (element) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            const entry = entries[0]
            setIsIntersecting(entry.isIntersecting)

            if (entry.isIntersecting) {
              callback()
            }
          },
          {
            root: options.root || null,
            rootMargin: options.rootMargin || "0px",
            threshold: options.threshold || 0.1,
          }
        )

        observerRef.current.observe(element)
      }
    },
    [callback, options.root, options.rootMargin, options.threshold]
  )

  // cleanup
  useEffect(() => {
    return () => {
      if (observerRef.current && targetRef.current) {
        observerRef.current.unobserve(targetRef.current)
      }
    }
  }, [])

  return {
    setObservationTarget,
    isIntersecting,
  }
}

