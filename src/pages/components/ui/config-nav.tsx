export type NavItem = {
  name: string
  href: string
}

export const foundationNav: NavItem[] = []

export const uiNav: NavItem[] = [
  { name: "Dialog", href: "/components/mui/dialog" },
  { name: "Skeleton", href: "/components/mui/skeleton" },
]

export const extraNav: NavItem[] = [{ name: "Utilities", href: "/components/utilities" }]
