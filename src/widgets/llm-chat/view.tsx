import { Typography } from "@/shared/components/ui/typography"
import { cn } from "@/shared/utils/cn"
import { MessageInput } from "@/widgets/llm-chat/components/message-input"
import { MessageList } from "@/widgets/llm-chat/components/message-list"
import { useMessages } from "@/widgets/llm-chat/model/use-messages"
import { useEffect, useRef, useState } from "react"

const ChatView = () => {
  const { messages, isLoading, addMessage } = useMessages()
  const headerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [inputHeight, setInputHeight] = useState(0)

  const handleSend = (content: string) => {
    addMessage("user", content)
  }

  // 헤더 높이 측정
  useEffect(() => {
    if (!headerRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeaderHeight(entry.contentRect.height)
      }
    })

    resizeObserver.observe(headerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  // Input 영역 높이 측정
  useEffect(() => {
    if (!inputRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setInputHeight(entry.contentRect.height)
      }
    })

    resizeObserver.observe(inputRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  // 70vh를 픽셀 값으로 계산 (리사이즈 시 업데이트)
  const [chatViewHeight, setChatViewHeight] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return

    const updateHeight = () => {
      setChatViewHeight(window.innerHeight * 0.7) // 70vh
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)

    return () => {
      window.removeEventListener("resize", updateHeight)
    }
  }, [])

  return (
    <div
      className={cn(
        "fixed right-4 bottom-4 z-50",
        "w-full max-w-[420px] h-[70vh]",
        "flex flex-col",
        "bg-background border rounded-lg shadow-2xl",
        "overflow-hidden"
      )}
    >
      {/* 채팅 헤더 */}
      <div ref={headerRef} className="px-4 py-3 border-b bg-background">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm">💬</span>
          </div>
          <div>
            <Typography variant="h6" className="font-semibold">
              LLM Chat
            </Typography>
            <Typography variant="caption" className="text-muted-foreground">
              AI 채팅 어시스턴트
            </Typography>
          </div>
        </div>
      </div>

      {/* 메시지 리스트 영역 */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <MessageList
          messages={messages}
          isLoading={isLoading}
          chatViewHeight={chatViewHeight}
          headerHeight={headerHeight}
          inputHeight={inputHeight}
        />
      </div>

      {/* 입력 영역 */}
      <div ref={inputRef} className="p-4 border-t bg-background">
        <MessageInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  )
}

export default ChatView
