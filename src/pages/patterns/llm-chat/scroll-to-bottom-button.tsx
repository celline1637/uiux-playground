import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

interface ScrollToBottomButtonProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
  bottomRef: React.RefObject<HTMLDivElement | null>
  threshold?: number // 스크롤이 이 값 이상 떨어져 있으면 버튼 표시
}

export function ScrollToBottomButton({
  scrollContainerRef,
  bottomRef,
  threshold = 100,
}: ScrollToBottomButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  const checkScrollPosition = useCallback(() => {
    if (!scrollContainerRef.current || !bottomRef.current) return

    const container = scrollContainerRef.current
    const bottom = bottomRef.current

    const containerBottom = container.scrollTop + container.clientHeight
    const bottomElementTop = bottom.offsetTop
    const distanceFromBottom = bottomElementTop - containerBottom

    setIsVisible(distanceFromBottom > threshold)
  }, [scrollContainerRef, bottomRef, threshold])

  const scrollToBottom = useCallback(() => {
    if (bottomRef.current && scrollContainerRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    }
  }, [bottomRef, scrollContainerRef])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    container.addEventListener("scroll", checkScrollPosition)
    checkScrollPosition() // 초기 체크

    return () => {
      container.removeEventListener("scroll", checkScrollPosition)
    }
  }, [checkScrollPosition, scrollContainerRef])

  // 메시지가 추가될 때마다 체크
  useEffect(() => {
    checkScrollPosition()
  }, [checkScrollPosition])

  if (!isVisible) return null

  return (
    <div className="sticky bottom-0 right-[50%] translate-x-[50%] z-10">
      <Button
        size="icon"
        onClick={scrollToBottom}
        className={cn(
          "w-10 h-10 rounded-full shadow-lg",
          "bg-background border border-border",
          "hover:bg-muted"
        )}
        aria-label="맨 아래로 스크롤"
      >
        <ChevronDown className="w-5 h-5" />
      </Button>
    </div>
  )
}
