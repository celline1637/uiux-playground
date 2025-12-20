import { Typography } from "@/shared/components/ui/typography"
import { cn } from "@/shared/utils/cn"
import Chat from "@/features/llm-chat/components/chat"

const ChatView = () => {
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
      <div className="px-4 py-3 border-b bg-background">
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

      <Chat />
    </div>
  )
}

export default ChatView
