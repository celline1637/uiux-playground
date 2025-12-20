import { useCallback, useState } from "react"
import type { Message, MessageRole } from "src/widgets/llm-chat/interface/message"

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addMessage = useCallback((role: MessageRole, content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random()}`,
      role,
      content,
      status: role === "user" ? "READY" : "STREAMING",
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, newMessage])

    if (role === "user") {
      // 가짜 LLM 응답 목킹
      setIsLoading(true)
      setTimeout(
        () => {
          const botMessage: Message = {
            id: `msg-${Date.now()}-${Math.random()}`,
            role: "assistant",
            content: `안녕하세요! "${content}"에 대한 답변입니다. 이것은 가짜 응답입니다. 실제 LLM API를 연결하면 여기에 실제 응답이 표시됩니다.`,
            status: "COMPLETED",
            timestamp: Date.now(),
          }
          setMessages((prev) => [...prev, botMessage])
          setIsLoading(false)
        },
        1000 + Math.random() * 2000
      ) // 1-3초 랜덤 지연
    }

    return newMessage.id
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return {
    messages,
    isLoading,
    addMessage,
    clearMessages,
  }
}
