import { useMessages } from "../model/use-messages"
import { MessageInput } from "./message-input"
import { MessageList } from "./message-list"

function Chat() {
  const { messages, isLoading, addMessage } = useMessages()

  const handleSend = (content: string) => {
    addMessage("user", content)
  }

  return (
    <>
      {/* 메시지 리스트 영역 */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>
      {/* 입력 영역 */}
      <div className="p-4 border-t bg-background">
        <MessageInput onSend={handleSend} disabled={isLoading} />
      </div>
    </>
  )
}

export default Chat
