import { Container } from "@/shared/components/ui/container"
import { Stack } from "@/shared/components/ui/stack"
import { Typography } from "@/shared/components/ui/typography"
import ChatView from "@/widgets/llm-chat/view"
import {} from "react"

function LLMChatPage() {
  return (
    <div className="relative min-h-screen">
      {/* 배경 콘텐츠 영역 */}
      <Container maxWidth="lg" className="py-4">
        <Stack spacing={4}>
          <div>
            <Typography variant="h3">LLM Chat</Typography>
            <Typography variant="caption" className="text-muted-foreground">
              가짜 LLM 응답을 목킹한 채팅 UI입니다
            </Typography>
          </div>
        </Stack>
      </Container>

      {/* 우측 플로팅 채팅 레이어 */}
      <ChatView />
    </div>
  )
}

export default LLMChatPage
