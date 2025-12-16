import { cn } from "@/lib/utils"
import { memo } from "react"
import type { Message } from "../interface/message"
import { useMessageList } from "../model/use-message-list"
import MessageItem from "./message-item"
import { ScrollToBottomButton } from "./scroll-to-bottom-button"

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
  chatViewHeight: number
  headerHeight: number
  inputHeight: number
}

export const MessageList = memo(function MessageList({
  messages,
  isLoading,
  chatViewHeight,
  headerHeight,
  inputHeight,
}: MessageListProps) {
  const {
    wrapperRef,
    listRef,
    lastUserMessageRef,
    bottomRef,
    aiResponseContainerRef,
    footerMargin,
  } = useMessageList({
    messages,
    isLoading,
    chatViewHeight,
    headerHeight,
    inputHeight,
  })

  // 마지막 유저 메시지의 인덱스 찾기
  const lastUserMessageIndex =
    messages
      .map((msg, idx) => (msg.role === "user" ? idx : -1))
      .filter((idx) => idx !== -1)
      .pop() ?? -1

  // 마지막 유저 메시지까지의 메시지들
  const messagesBeforeLastUser = messages.slice(0, lastUserMessageIndex + 1)
  // 마지막 유저 메시지 이후의 메시지들
  const messagesAfterLastUser = messages.slice(lastUserMessageIndex + 1)

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "h-full flex-1 w-full text-gray-700 mx-auto p-4 overflow-y-auto overflow-x-hidden",
        "flex flex-col relative"
      )}
    >
      <div className="w-full flex-1 flex flex-col" ref={listRef}>
        {/* 마지막 유저 메시지까지의 메시지들 */}
        {messagesBeforeLastUser.map((message, index) => {
          const isLastUserMessage =
            message.role === "user" && index === messagesBeforeLastUser.length - 1

          return (
            <MessageItem
              key={message.id}
              ref={isLastUserMessage ? lastUserMessageRef : null}
              message={message}
            />
          )
        })}

        {/* 마지막 유저 메시지 이후의 모든 AI 응답을 감싸는 컨테이너 */}
        {messagesAfterLastUser.length > 0 || isLoading ? (
          <div ref={aiResponseContainerRef}>
            {messagesAfterLastUser.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}

            {isLoading && (
              <div className="mb-4 py-2 px-4 rounded-lg flex justify-start">
                <div className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                  <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75" />
                  <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150" />
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* 여백 */}
      <div
        ref={bottomRef}
        style={{
          minHeight: `${footerMargin}px`,
        }}
        className="scroll-mb-[80px]"
      />

      <ScrollToBottomButton scrollContainerRef={wrapperRef} bottomRef={bottomRef} />
    </div>
  )
})
