import { cn } from "@/shared/utils/cn"
import * as React from "react"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | false
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth = "xl", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto px-4 sm:px-6 lg:px-8",
          maxWidth === "xs" && "max-w-screen-xs",
          maxWidth === "sm" && "max-w-screen-sm",
          maxWidth === "md" && "max-w-screen-md",
          maxWidth === "lg" && "max-w-screen-lg",
          maxWidth === "xl" && "max-w-screen-xl",
          maxWidth === "2xl" && "max-w-screen-2xl",
          maxWidth === false && "max-w-none",
          className
        )}
        {...props}
      />
    )
  }
)

Container.displayName = "Container"

export { Container }
