import { lazy } from "react"

// ----------------------------------------------------------------------

const PatternsPage = lazy(() => import("@/pages/patterns"))
const LLMChatPage = lazy(() => import("@/pages/patterns/llm-chat"))
const DataTablePage = lazy(() => import("@/pages/patterns/data-table"))
const XYDragFeedPage = lazy(() => import("@/pages/patterns/xy-drag-feed"))

// ----------------------------------------------------------------------

export const patternsRoutes = [
  {
    path: "patterns",
    children: [
      {
        index: true,
        element: <PatternsPage />,
      },
      {
        path: "llm-chat",
        element: <LLMChatPage />,
      },
      {
        path: "data-table",
        element: <DataTablePage />,
      },
      {
        path: "xy-drag-feed",
        element: <XYDragFeedPage />,
      },
    ],
  },
]
