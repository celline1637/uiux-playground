import { Heart, MessageCircle, Share2, VolumeX } from "lucide-react"
import React, { useCallback, useRef } from "react"

import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/utils/cn"

import type { FeedItem } from "@/entities/feed/interface/feed"

// ----------------------------------------------------------------------

type FeedItemProps = {
  item: FeedItem
  mute: boolean
  observationRef?: (element: HTMLElement | null) => void
}

export const FeedItemComponent = React.forwardRef<HTMLDivElement, FeedItemProps>(
  ({ item, mute, observationRef }, ref) => {
    const itemRef = useRef<HTMLDivElement>(null)
    const combinedRef = useCallback(
      (node: HTMLDivElement | null) => {
        itemRef.current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
        observationRef?.(node)
      },
      [ref, observationRef]
    )

    return (
      <div
        ref={combinedRef}
        className={cn(
          "relative flex h-[80vh] w-full max-w-3xl mx-auto shrink-0 snap-start items-center justify-center",
          item.color
        )}
      >
        {/* 비디오/콘텐츠 영역 */}
        <div className="flex h-full w-full flex-col items-center justify-center p-8 text-white">
          <h2 className="mb-4 text-4xl font-bold">{item.title}</h2>
          <p className="mb-8 text-center text-lg opacity-90">{item.description}</p>

          {/* 오디오 컨트롤 */}
          {mute && (
            <div className="absolute top-4 right-4 rounded-full bg-black/50 p-2">
              <VolumeX className="size-5" aria-label="음소거" />
            </div>
          )}
        </div>

        {/* 사이드 컨트롤 */}
        <div className="absolute bottom-20 right-4 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/50 text-white hover:bg-black/70"
              aria-label="좋아요"
            >
              <Heart className="size-6" fill="currentColor" />
            </Button>
            <span className="text-xs text-white">{item.likes.toLocaleString()}</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/50 text-white hover:bg-black/70"
              aria-label="댓글"
            >
              <MessageCircle className="size-6" />
            </Button>
            <span className="text-xs text-white">{item.comments.toLocaleString()}</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/50 text-white hover:bg-black/70"
              aria-label="공유"
            >
              <Share2 className="size-6" />
            </Button>
          </div>
        </div>
      </div>
    )
  }
)

FeedItemComponent.displayName = "FeedItem"
