import { lazy } from "react";

// ----------------------------------------------------------------------

const ActiveFeedAutoplayPage = lazy(
  () => import("@/pages/patterns/active-feed-autoplay")
);
const XYDragFeedPage = lazy(() => import("@/pages/patterns/xy-drag-feed"));
const SocketGlobalModalPage = lazy(
  () => import("@/pages/patterns/socket-global-modal")
);
const MessageEmbeddedFormPage = lazy(
  () => import("@/pages/patterns/message-embedded-form")
);
const ContentEditableInputPage = lazy(
  () => import("@/pages/patterns/contenteditable-input")
);
const LLMChatPage = lazy(() => import("@/pages/patterns/llm-chat"));

// ----------------------------------------------------------------------

export const patternsRoutes = [
  {
    path: "patterns",
    children: [
      { element: <ActiveFeedAutoplayPage />, index: true },
      {
        path: "active-feed-autoplay",
        element: <ActiveFeedAutoplayPage />,
      },
      {
        path: "xy-drag-feed",
        element: <XYDragFeedPage />,
      },
      {
        path: "socket-global-modal",
        element: <SocketGlobalModalPage />,
      },
      {
        path: "message-embedded-form",
        element: <MessageEmbeddedFormPage />,
      },
      {
        path: "contenteditable-input",
        element: <ContentEditableInputPage />,
      },
      {
        path: "llm-chat",
        element: <LLMChatPage />,
      },
    ],
  },
];
