import { Heart, MessageCircle, Share2, VolumeX } from "lucide-react"
import React, { useCallback, useEffect, useRef } from "react"

import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/utils/cn"

import type { FeedItem } from "@/entities/feed/interface/feed"

// ----------------------------------------------------------------------

type FeedItemProps = {
  item: FeedItem
  mute: boolean
  isVisible?: boolean
  observationRef?: (element: HTMLElement | null) => void
  onRef?: (element: HTMLElement | null) => void
}

export const FeedItemComponent = React.forwardRef<HTMLDivElement, FeedItemProps>(
  ({ item, mute, isVisible = false, observationRef, onRef }, ref) => {
    const itemRef = useRef<HTMLDivElement>(null)
    const mediaRef = useRef<HTMLVideoElement | null>(null)

    const combinedRef = useCallback(
      (node: HTMLDivElement | null) => {
        itemRef.current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
        observationRef?.(node)
        onRef?.(node)
      },
      [ref, observationRef, onRef]
    )

    // 자동 재생 처리
    useEffect(() => {
      if (!mediaRef.current || !item.videoUrl) return

      if (isVisible) {
        // 뷰포트에 보일 때 재생
        mediaRef.current.play().catch((error) => {
          console.warn("자동 재생 실패:", error)
        })
      } else {
        // 뷰포트에서 벗어나면 일시정지
        mediaRef.current.pause()
      }
    }, [isVisible, item.videoUrl])

    // 음소거 상태 업데이트
    useEffect(() => {
      if (mediaRef.current) {
        mediaRef.current.muted = mute
      }
    }, [mute])

    return (
      <div
        ref={combinedRef}
        className={cn(
          "relative flex h-[80vh] w-full max-w-3xl mx-auto shrink-0 snap-start items-center justify-center overflow-hidden",
          !item.videoUrl && item.color
        )}
      >
        {/* 비디오 배경 */}
        {item.videoUrl ? (
          <video
            ref={mediaRef}
            src={item.videoUrl}
            className="absolute inset-0 h-full w-full object-cover"
            playsInline
            muted={mute}
            loop
            autoPlay={false}
          />
        ) : null}

        {/* 그라데이션 오버레이 (비디오 위에 텍스트 가독성 향상) */}
        {item.videoUrl && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        )}

        {/* 콘텐츠 영역 */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-8 text-white">
          <h2 className="mb-4 text-4xl font-bold drop-shadow-lg">{item.title}</h2>
          <p className="mb-8 text-center text-lg opacity-90 drop-shadow-md">{item.description}</p>

          {/* 가시성 상태 표시 (디버깅용, 필요시 제거) */}
          {isVisible && (
            <div className="absolute top-4 left-4 rounded-full bg-green-500/50 px-2 py-1 text-xs text-white">
              재생 중
            </div>
          )}

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
