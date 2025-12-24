import { useCallback, useEffect, useRef, useState } from "react"

import { useBoolean } from "@/shared/hooks/use-boolean"
import { useIntersectionObserver } from "@/shared/hooks/use-intersection-observer"
import { useVerticalSnapScroll } from "@/features/vertical-scroll-feed/model/use-vertical-snap-scroll"

import { generateMockItems } from "../../entities/feed/mock/generate-mock-items"
import { FeedItemComponent } from "../../features/vertical-scroll-feed/components/feed-item"
import { SideControls } from "../../features/vertical-scroll-feed/components/side-controls"
import { LAYOUT_CONSTANTS } from "@/shared/config/layout-constants"

// ----------------------------------------------------------------------

export function XYDragFeedView() {
  const [items, setItems] = useState(() => generateMockItems(10))
  const mute = useBoolean(false)
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set())
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map())
  const observerRef = useRef<IntersectionObserver | null>(null)

  const { status, actions, containerRef } = useVerticalSnapScroll(items.length, {
    smooth: true,
  })

  const loadMoreItems = useCallback(() => {
    const newItems = generateMockItems(5)
    setItems((prev) => [...prev, ...newItems])
  }, [])

  const { setObservationTarget } = useIntersectionObserver(loadMoreItems, {
    threshold: 0.5,
  })

  // 각 피드 아이템의 가시성 추적을 위한 Intersection Observer 설정
  useEffect(() => {
    if (!containerRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const itemId = entry.target.getAttribute("data-item-id")
          if (!itemId) continue

          setVisibleItems((prev) => {
            const next = new Set(prev)
            if (entry.isIntersecting) {
              next.add(itemId)
            } else {
              next.delete(itemId)
            }
            return next
          })
        }
      },
      {
        root: containerRef.current,
        rootMargin: "0px",
        threshold: 0.5, // 뷰포트의 50% 이상 보일 때 visible로 간주
      }
    )

    // 모든 아이템 관찰 시작
    for (const element of itemRefs.current.values()) {
      observerRef.current?.observe(element)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [containerRef])

  // 아이템 ref 등록 함수
  const registerItemRef = useCallback((itemId: string, element: HTMLElement | null) => {
    if (element) {
      element.setAttribute("data-item-id", itemId)
      itemRefs.current.set(itemId, element)
      observerRef.current?.observe(element)
    } else {
      const existingElement = itemRefs.current.get(itemId)
      if (existingElement) {
        observerRef.current?.unobserve(existingElement)
        itemRefs.current.delete(itemId)
      }
    }
  }, [])

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: LAYOUT_CONSTANTS.FEED_VIEW_HEIGHT }}
    >
      {/* 메인 스크롤 컨테이너 */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {items.map((item, index) => {
          const isLastOfSecond = items.length > 1 && items.length - 2 === index
          const isVisible = visibleItems.has(item.id)

          return (
            <FeedItemComponent
              key={item.id}
              ref={isLastOfSecond ? setObservationTarget : undefined}
              item={item}
              mute={mute.value}
              isVisible={isVisible}
              observationRef={isLastOfSecond ? setObservationTarget : undefined}
              onRef={(element) => registerItemRef(item.id, element)}
            />
          )
        })}
      </div>

      {/* 사이드 컨트롤 */}
      <SideControls status={status} actions={actions} />

      {/* 인덱스 표시 (디버깅용) */}
      <div className="absolute left-4 top-4 z-10 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
        {status.currentIndex + 1} / {items.length}
      </div>
    </div>
  )
}
