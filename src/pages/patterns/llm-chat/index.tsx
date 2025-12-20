import { Container } from "@/shared/components/ui/container"
import { Stack } from "@/shared/components/ui/stack"
import { Typography } from "@/shared/components/ui/typography"
import { Button } from "@/shared/components/ui/button"
import { Iconify } from "@/shared/components/iconify"
import ChatView from "@/widgets/llm-chat/view"
import {} from "react"

const ACTUAL_IMPLEMENTATION_URL = "https://www.spooncast.net/kr/help?category=GR04"

function LLMChatPage() {
  return (
    <div className="relative min-h-screen">
      {/* 배경 콘텐츠 영역 */}
      <Container maxWidth="lg" className="py-4">
        <Stack spacing={4}>
          <div className="flex items-start justify-between">
            <div>
              <Typography variant="h3">LLM Chat</Typography>
              <Typography variant="caption" className="text-muted-foreground">
                가짜 LLM 응답을 목킹한 채팅 UI입니다
              </Typography>
            </div>
            <Button asChild variant="outline" size="sm" className="gap-2">
              <a href={ACTUAL_IMPLEMENTATION_URL} target="_blank" rel="noopener noreferrer">
                <Iconify icon="solar:external-link-bold" width={16} />
                적용 예시
              </a>
            </Button>
          </div>
        </Stack>
      </Container>

      {/* 우측 플로팅 채팅 레이어 */}
      <ChatView />
    </div>
  )
}

export default LLMChatPage
