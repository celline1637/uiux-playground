import { lazy } from "react"

// ----------------------------------------------------------------------

const ContentEditableInputPage = lazy(() => import("@/pages/patterns/contenteditable-input"))
const LLMChatPage = lazy(() => import("@/pages/patterns/llm-chat"))
const DataTablePage = lazy(() => import("@/pages/patterns/data-table"))
const XYDragFeedPage = lazy(() => import("@/pages/patterns/xy-drag-feed"))

// ----------------------------------------------------------------------

export const patternsRoutes = [
  {
    path: "patterns",
    children: [
      {
        path: "llm-chat",
        element: <LLMChatPage />,
        index: true,
      },
      {
        path: "contenteditable-input",
        element: <ContentEditableInputPage />,
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
