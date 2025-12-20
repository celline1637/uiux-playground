import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// ----------------------------------------------------------------------

export function usePageScrollToTop() {
  const { pathname } = useLocation()

  // biome-ignore lint/correctness/useExhaustiveDependencies: 페이지 이동 시 스크롤 상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
