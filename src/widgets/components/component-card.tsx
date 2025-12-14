import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RouterLink } from "@/routes/components"

import type { NavItem } from "./config-nav"

// ----------------------------------------------------------------------

interface ComponentCardProps {
  item: NavItem
}

export function ComponentCard({ item }: ComponentCardProps) {
  return (
    <RouterLink href={item.href}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
        <CardHeader>
          <CardTitle className="text-base">{item.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>View component details</CardDescription>
        </CardContent>
      </Card>
    </RouterLink>
  )
}
