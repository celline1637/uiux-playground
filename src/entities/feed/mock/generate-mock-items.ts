import type { FeedItem } from "../interface/feed"

export const generateMockItems = (count: number): FeedItem[] => {
  const colors = [
    "bg-gradient-to-br from-pink-500 to-rose-500",
    "bg-gradient-to-br from-blue-500 to-cyan-500",
    "bg-gradient-to-br from-purple-500 to-pink-500",
    "bg-gradient-to-br from-orange-500 to-red-500",
    "bg-gradient-to-br from-green-500 to-emerald-500",
    "bg-gradient-to-br from-indigo-500 to-purple-500",
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i + 1}`,
    title: `피드 아이템 ${i + 1}`,
    description: `이것은 ${i + 1}번째 피드 아이템입니다. 수직 스크롤 피드를 구현했습니다.`,
    color: colors[i % colors.length],
    likes: Math.floor(Math.random() * 10000) + 100,
    comments: Math.floor(Math.random() * 1000) + 10,
  }))
}
