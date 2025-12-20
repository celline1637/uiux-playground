import { LAYOUT_CONSTANTS } from "@/shared/config/layout-constants"
import { XYDragFeedView } from "@/widgets/xy-drag-feed/view"
import { Helmet } from "react-helmet-async"

// ----------------------------------------------------------------------

const metadata = { title: "XY Drag Feed" }

function XYDragFeedPage() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <div className="relative w-full" style={{ height: LAYOUT_CONSTANTS.FEED_VIEW_HEIGHT }}>
        <XYDragFeedView />
      </div>
    </>
  )
}

export default XYDragFeedPage
