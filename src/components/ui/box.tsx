import * as React from "react"
import { cn } from "@/lib/utils"

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  component?: keyof React.JSX.IntrinsicElements
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, asChild, component, ...props }, ref) => {
    const Comp = (component || "div") as React.ElementType

    return <Comp ref={ref} className={cn(className)} {...props} />
  }
)

Box.displayName = "Box"

export { Box }

