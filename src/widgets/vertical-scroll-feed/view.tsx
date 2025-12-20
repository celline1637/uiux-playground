import { useCallback, useState } from "react"

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
  const mute = useBoolean(true)

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

          return (
            <FeedItemComponent
              key={item.id}
              ref={isLastOfSecond ? setObservationTarget : undefined}
              item={item}
              mute={mute.value}
              observationRef={isLastOfSecond ? setObservationTarget : undefined}
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
