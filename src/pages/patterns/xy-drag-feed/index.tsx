import { XYDragFeedView } from "@/widgets/vertical-scroll-feed/view"
import { Helmet } from "react-helmet-async"
import { Button } from "@/shared/components/ui/button"
import { Iconify } from "@/shared/components/iconify"
import { Typography } from "@/shared/components/ui/typography"

// ----------------------------------------------------------------------

const metadata = { title: "XY Drag Feed" }
const ACTUAL_IMPLEMENTATION_URL =
  "https://www.spooncast.net/kr/discovery/FEMALE_WARM/preview?id=40955897"

function XYDragFeedPage() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <div className="relative w-full">
        {/* 헤더 */}
        <div className="px-4 py-3 border-b bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm">📱</span>
              </div>
              <div>
                <Typography variant="h6" className="font-semibold">
                  XY Drag Feed
                </Typography>
                <Typography variant="caption" className="text-muted-foreground">
                  수직 스크롤 피드
                </Typography>
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="gap-2">
              <a href={ACTUAL_IMPLEMENTATION_URL} target="_blank" rel="noopener noreferrer">
                <Iconify icon="solar:external-link-bold" width={16} />
                적용 예시
              </a>
            </Button>
          </div>
        </div>

        {/* 피드 뷰 */}
        <XYDragFeedView />
      </div>
    </>
  )
}

export default XYDragFeedPage
