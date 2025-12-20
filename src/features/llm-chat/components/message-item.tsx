import { cn } from "@/shared/utils/cn"
import { forwardRef, memo } from "react"
import type { Message } from "../../../entities/message/interface/message"

interface MessageItemProps {
  message: Message
}

const MessageItem = forwardRef<HTMLDivElement, MessageItemProps>(({ message }, ref) => {
  const isBot = message.role === "assistant"
  const isUser = message.role === "user"
  const isCompleted = message.status === "COMPLETED"

  return (
    <div
      ref={ref}
      className={cn(
        "mb-4 py-2 px-4 rounded-lg flex min-w-0",
        isBot && "justify-start w-full max-w-full",
        isUser &&
          "bg-secondary text-secondary-foreground scroll-mt-4 justify-end ml-auto max-w-[75%]"
      )}
    >
      <div
        className={cn("text-sm min-w-0 wrap-break-word whitespace-pre-wrap", isUser && "break-all")}
      >
        {isBot ? (
          <div className="space-y-2 min-w-0 w-full">
            <div className="text-gray-900 dark:text-foreground whitespace-pre-wrap wrap-break-word">
              {message.content}
            </div>
            {!isCompleted && (
              <div className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75" />
                <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150" />
              </div>
            )}
          </div>
        ) : (
          <div className="text-gray-900 dark:text-foreground wrap-break-word">
            {message.content}
          </div>
        )}
      </div>
    </div>
  )
})

MessageItem.displayName = "MessageItem"

export default memo(MessageItem)
