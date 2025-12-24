import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { Message } from "../../../entities/message/interface/message"

interface UseMessageListProps {
  messages: Message[]
  isLoading: boolean
}

export function useMessageList({ messages, isLoading }: UseMessageListProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const lastUserMessageRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const aiResponseContainerRef = useRef<HTMLDivElement>(null)

  const [containerHeight, setContainerHeight] = useState(0)
  const [userMessageHeight, setUserMessageHeight] = useState(0)
  const [aiResponseHeight, setAiResponseHeight] = useState(0)
  const [currentUserMessageId, setCurrentUserMessageId] = useState<string | null>(null)

  // bottom-anchor 기반 스크롤 함수
  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    if (!wrapperRef.current) return

    const container = wrapperRef.current
    const scrollHeight = container.scrollHeight
    const clientHeight = container.clientHeight

    // scrollTop = scrollHeight - clientHeight (bottom으로 스크롤)
    container.scrollTo({
      top: scrollHeight - clientHeight,
      behavior,
    })
  }, [])

  // 뷰포트(컨테이너) 높이 추적
  useEffect(() => {
    if (!wrapperRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height)
      }
    })

    resizeObserver.observe(wrapperRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: 유저 메시지 높이 측정
  useEffect(() => {
    if (!lastUserMessageRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setUserMessageHeight(entry.contentRect.height)
      }
    })

    resizeObserver.observe(lastUserMessageRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [messages])

  // biome-ignore lint/correctness/useExhaustiveDependencies: AI 응답 높이 추적
  useEffect(() => {
    if (!aiResponseContainerRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setAiResponseHeight(entry.contentRect.height)
      }
    })

    resizeObserver.observe(aiResponseContainerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [messages, isLoading])

  // 새 유저 메시지가 추가되면 AI 응답 높이 리셋 및 조건부 스크롤
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== "user") return

    const messageId = lastMessage.id
    if (messageId === currentUserMessageId) return

    // 새 유저 메시지 감지
    setCurrentUserMessageId(messageId)
    setAiResponseHeight(0) // AI 응답 높이 리셋
  }, [messages, currentUserMessageId])

  // biome-ignore lint/correctness/useExhaustiveDependencies: 유저 메시지 높이 측정 후 스크롤 동작 결정
  useEffect(() => {
    if (!lastUserMessageRef.current || !wrapperRef.current) return

    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== "user") return
    if (lastMessage.id !== currentUserMessageId) return

    // 한 줄 기준 높이 (텍스트 한 줄 + padding)
    // text-sm 기준 line-height 약 20px + py-2 (8px 위아래) = 약 36px
    // 여유를 두고 50px를 기준으로 설정
    const SINGLE_LINE_THRESHOLD = 50

    // 레이아웃과 여백 계산이 완료된 후 스크롤
    requestAnimationFrame(() => {
      if (!lastUserMessageRef.current || !wrapperRef.current) return

      // 유저 메시지가 한 줄 이상인지 확인
      const messageHeight = lastUserMessageRef.current.offsetHeight

      if (messageHeight > SINGLE_LINE_THRESHOLD) {
        // 한 줄 이상: bottom-anchor 기반 스크롤 (하단이 보이도록)
        scrollToBottom("smooth")
      } else {
        // 한 줄 이하: 유저 메시지 상단이 보이도록 스크롤
        lastUserMessageRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  }, [userMessageHeight, currentUserMessageId, messages, scrollToBottom])

  // 여백 계산
  const footerMargin = useMemo(() => {
    // 유저 메시지가 한 줄 초과인지 확인
    const SINGLE_LINE_THRESHOLD = 50
    const isMultiLine = userMessageHeight > SINGLE_LINE_THRESHOLD

    if (isMultiLine && aiResponseHeight === 0) {
      // 유저 메시지가 한 줄 초과이고 AI 응답이 없을 때
      // 하단 한두줄(약 40px)만 보이도록 여백 설정
      // 여백 = 컨테이너 높이 - 유저 메시지 높이 + 40px
      return Math.max(0, containerHeight - userMessageHeight + 40)
    }

    // 기본 계산: 여백 = 뷰포트 높이 - (유저 메시지 높이 + AI 응답 높이)
    const contentHeight = userMessageHeight + aiResponseHeight
    const margin = Math.max(0, containerHeight - contentHeight)
    return margin
  }, [containerHeight, userMessageHeight, aiResponseHeight])

  return {
    wrapperRef,
    listRef,
    lastUserMessageRef,
    bottomRef,
    aiResponseContainerRef,
    footerMargin,
  }
}
