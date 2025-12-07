// ----------------------------------------------------------------------

const ROOTS = {
  DEFAULT: "/",
  NOT_FOUND: "/404",
  PATTERNS: "/patterns",
}

// ----------------------------------------------------------------------

export const paths = {
  root: ROOTS.DEFAULT,
  notFound: ROOTS.NOT_FOUND,
  patterns: {
    activeFeedAutoplay: `${ROOTS.PATTERNS}/active-feed-autoplay`,
    xyDragFeed: `${ROOTS.PATTERNS}/xy-drag-feed`,
    socketGlobalModal: `${ROOTS.PATTERNS}/socket-global-modal`,
    messageEmbeddedForm: `${ROOTS.PATTERNS}/message-embedded-form`,
    contenteditableInput: `${ROOTS.PATTERNS}/contenteditable-input`,
  },
}
