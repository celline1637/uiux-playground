import { Container } from "@/shared/components/ui/container"
import { Stack } from "@/shared/components/ui/stack"
import { Typography } from "@/shared/components/ui/typography"
import { paths } from "@/routes/paths"
import { Iconify } from "@/shared/components/iconify"
import { cn } from "@/shared/utils/cn"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"

// ----------------------------------------------------------------------

const metadata = { title: "Patterns" }

const patternLinks = [
  {
    name: "LLM Chat",
    description: "LLM 채팅 UI (가짜 응답 목킹)",
    path: paths.patterns.llmChat,
    icon: "solar:chat-round-dots-bold",
  },
  {
    name: "Data Table",
    description: "정렬, 페이지네이션 기능을 가진 데이터 테이블",
    path: paths.patterns.dataTable,
    icon: "solar:table-bold",
  },
  {
    name: "XY Drag Feed",
    description: "수직 스크롤 피드",
    path: paths.patterns.xyDragFeed,
    icon: "solar:hand-stars-bold",
  },
] as const

// ----------------------------------------------------------------------

function PatternsPage() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <Container maxWidth="xl" className="py-8">
        <Stack spacing={6}>
          <div>
            <Typography variant="h3">Patterns</Typography>
            <Typography variant="caption" className="text-muted-foreground">
              재사용 가능한 UI 패턴 모음
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patternLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "group relative p-6 rounded-lg border border-border",
                  "bg-card hover:bg-accent transition-colors",
                  "hover:shadow-md hover:border-primary/50"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Iconify icon={link.icon} width={24} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {link.name}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{link.description}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Iconify
                    icon="solar:arrow-right-bold"
                    width={20}
                    className="text-muted-foreground"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Stack>
      </Container>
    </>
  )
}

export default PatternsPage
