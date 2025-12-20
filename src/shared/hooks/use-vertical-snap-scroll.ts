import { useCallback, useEffect, useRef, useState } from "react"

import { useEventListener } from "./use-event-listener"

// ----------------------------------------------------------------------

type UseVerticalSnapScrollOptions = {
  smooth?: boolean // 부드러운 스크롤 사용 여부
}

type ScrollStatus = {
  hasPrev: boolean
  hasNext: boolean
  currentIndex: number
  isScrolling: boolean
}

type ScrollActions = {
  scrollNext: () => void
  scrollPrev: () => void
  scrollToIndex: (index: number) => void
}

type UseVerticalSnapScrollReturn = {
  status: ScrollStatus
  actions: ScrollActions
  containerRef: React.RefObject<HTMLDivElement>
}

// ----------------------------------------------------------------------

export function useVerticalSnapScroll(
  itemCount: number,
  options: UseVerticalSnapScrollOptions = {}
): UseVerticalSnapScrollReturn {
  const { smooth = true } = options

  const containerRef = useRef<HTMLDivElement>(null)
  const [hasPrev, setHasPrev] = useState(false)
  const [hasNext, setHasNext] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const updateScrollStatus = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const containerHeight = container.clientHeight
    const scrollTop = container.scrollTop
    const scrollHeight = container.scrollHeight

    // 이전/다음 스크롤 가능 여부
    setHasPrev(scrollTop > 0)
    setHasNext(scrollTop + containerHeight < scrollHeight - 1)

    // 현재 인덱스 계산 - 뷰포트 중앙에 있는 아이템 찾기
    const children = container.children
    let newIndex = 0
    const viewportCenter = scrollTop + containerHeight / 2

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement
      const childTop = child.offsetTop
      const childBottom = childTop + child.offsetHeight

      if (viewportCenter >= childTop && viewportCenter < childBottom) {
        newIndex = i
        break
      }
    }

    setCurrentIndex(Math.min(newIndex, itemCount - 1))
  }, [itemCount])

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    updateScrollStatus()

    // 스크롤 중 상태 관리
    setIsScrolling(true)
    if (scrollTimeoutRef.current !== undefined) {
      clearTimeout(scrollTimeoutRef.current)
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false)
    }, 150)
  }, [updateScrollStatus])

  // 스크롤 이벤트 리스너 등록
  useEventListener("scroll", handleScroll, containerRef as React.RefObject<HTMLElement>)

  // 초기 상태 업데이트
  useEffect(() => {
    updateScrollStatus()
  }, [updateScrollStatus])

  // 스크롤 액션들
  const scrollNext = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    // 현재 인덱스의 다음 아이템으로 이동
    const nextIndex = Math.min(currentIndex + 1, itemCount - 1)
    const children = container.children
    if (children[nextIndex]) {
      const targetElement = children[nextIndex] as HTMLElement
      targetElement.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "start",
      })
    }
  }, [currentIndex, itemCount, smooth])

  const scrollPrev = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    // 현재 인덱스의 이전 아이템으로 이동
    const prevIndex = Math.max(currentIndex - 1, 0)
    const children = container.children
    if (children[prevIndex]) {
      const targetElement = children[prevIndex] as HTMLElement
      targetElement.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "start",
      })
    }
  }, [currentIndex, smooth])

  const scrollToIndex = useCallback(
    (index: number) => {
      const container = containerRef.current
      if (!container) return

      const children = container.children
      if (children[index]) {
        const targetElement = children[index] as HTMLElement
        targetElement.scrollIntoView({
          behavior: smooth ? "smooth" : "auto",
          block: "start",
        })
      }
    },
    [smooth]
  )

  // CSS snap이 자동으로 스냅을 처리하므로 JavaScript 스냅 로직 제거

  return {
    status: {
      hasPrev,
      hasNext,
      currentIndex,
      isScrolling,
    },
    actions: {
      scrollNext,
      scrollPrev,
      scrollToIndex,
    },
    containerRef: containerRef as React.RefObject<HTMLDivElement>,
  }
}
