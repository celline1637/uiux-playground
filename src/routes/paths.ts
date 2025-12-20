// ----------------------------------------------------------------------

const ROOTS = {
  DEFAULT: "/",
  NOT_FOUND: "/404",
  COMPONENTS: "/components",
  PATTERNS: "/patterns",
}

// ----------------------------------------------------------------------

export const paths = {
  root: ROOTS.DEFAULT,
  notFound: ROOTS.NOT_FOUND,
  components: {
    index: ROOTS.COMPONENTS,
    utilities: `${ROOTS.COMPONENTS}/utilities`,
  },
  patterns: {
    activeFeedAutoplay: `${ROOTS.PATTERNS}/active-feed-autoplay`,
    xyDragFeed: `${ROOTS.PATTERNS}/xy-drag-feed`,
    socketGlobalModal: `${ROOTS.PATTERNS}/socket-global-modal`,
    messageEmbeddedForm: `${ROOTS.PATTERNS}/message-embedded-form`,
    contenteditableInput: `${ROOTS.PATTERNS}/contenteditable-input`,
    llmChat: `${ROOTS.PATTERNS}/llm-chat`,
    dataTable: `${ROOTS.PATTERNS}/data-table`,
  },
}
