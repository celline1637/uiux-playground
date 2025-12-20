import { paths } from "@/routes/paths"
import { Iconify } from "@/shared/components/iconify"
import { cn } from "@/shared/utils/cn"
import { Link } from "react-router-dom"

// ----------------------------------------------------------------------

const links = [
  {
    name: "LLM Chat",
    description: "LLM 채팅 UI (가짜 응답 목킹)",
    path: paths.patterns.llmChat,
    icon: "solar:chat-round-dots-bold",
  },
  {
    name: "Active Feed Autoplay",
    description: "스크롤 기반 자동 재생 피드",
    path: paths.patterns.activeFeedAutoplay,
    icon: "solar:play-bold",
  },
  {
    name: "XY Drag Feed",
    description: "X/Y 축 드래그 피드",
    path: paths.patterns.xyDragFeed,
    icon: "solar:hand-stars-bold",
  },
  {
    name: "Socket Global Modal",
    description: "소켓 기반 전역 모달",
    path: paths.patterns.socketGlobalModal,
    icon: "solar:chat-round-bold",
  },
  {
    name: "Message Embedded Form",
    description: "메시지 내장 폼",
    path: paths.patterns.messageEmbeddedForm,
    icon: "solar:document-text-bold",
  },
  {
    name: "ContentEditable Input",
    description: "컨텐츠 편집 가능한 입력",
    path: paths.patterns.contenteditableInput,
    icon: "solar:pen-bold",
  },
] as const

// ----------------------------------------------------------------------

const GridView = () => {
  return (
    <section>
      <h3 className="text-2xl font-semibold text-foreground mb-6">패턴 목록</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
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
              <Iconify icon="solar:arrow-right-bold" width={20} className="text-muted-foreground" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default GridView
