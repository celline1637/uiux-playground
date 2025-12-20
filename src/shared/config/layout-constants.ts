// ----------------------------------------------------------------------

/**
 * 레이아웃 관련 상수
 */
const HEADER_HEIGHT = 64
const MAIN_LAYOUT_VERTICAL_PADDING = 24 // py-6 = 24px (상하 각각)

export const LAYOUT_CONSTANTS = {
  /**
   * 헤더 높이 (px)
   * 실제 헤더 높이에 맞게 조정 필요
   */
  HEADER_HEIGHT,

  /**
   * 메인 레이아웃 수직 패딩 (px)
   * MainLayout의 py-6 (상하 각 24px)을 고려한 값
   */
  MAIN_LAYOUT_VERTICAL_PADDING,

  /**
   * 피드 뷰 높이 계산
   * 100vh에서 헤더 높이와 메인 레이아웃 수직 패딩(상하 각 24px)을 뺀 값
   */
  FEED_VIEW_HEIGHT: `calc(100vh - ${HEADER_HEIGHT}px - ${MAIN_LAYOUT_VERTICAL_PADDING * 2}px)`,
} as const
