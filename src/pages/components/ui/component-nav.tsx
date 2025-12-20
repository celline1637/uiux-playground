import { Typography } from "@/shared/components/ui/typography"
import { cn } from "@/shared/utils/cn"

import { RouterLink } from "@/routes/components"

import { orderBy } from "@/shared/utils/helper"

import { type NavItem, extraNav, uiNav } from "./config-nav"

// ----------------------------------------------------------------------

export function ComponentNav() {
  return (
    <nav
      className={cn(
        "overflow-y-auto overflow-x-hidden",
        "w-[280px] shrink-0 sticky",
        "hidden md:flex",
        "top-[calc(var(--layout-header-desktop-height)+24px)]",
        "max-h-[calc(100vh-var(--layout-header-desktop-height)*2)]"
      )}
    >
      <ul className="flex flex-col gap-3">
        <li className="flex flex-col">
          <Typography variant="overline" component="h6" className="mt-0 mx-0 mb-1 p-0">
            UI
          </Typography>
          <ul className="flex flex-col gap-0.5">
            {orderBy(uiNav, ["name"], ["asc"]).map((item: NavItem) => (
              <li key={item.name} className="flex">
                <RouterLink
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </RouterLink>
              </li>
            ))}
          </ul>
        </li>

        <li className="flex flex-col">
          <Typography variant="overline" component="h6" className="mt-0 mx-0 mb-1 p-0">
            Extra
          </Typography>
          <ul className="flex flex-col gap-0.5">
            {orderBy(extraNav, ["name"], ["asc"]).map((item: NavItem) => (
              <li key={item.name} className="flex">
                <RouterLink
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </RouterLink>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  )
}
