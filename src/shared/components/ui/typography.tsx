import { cn } from "@/shared/utils/cn"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      body1: "leading-7 [&:not(:first-child)]:mt-6",
      body2: "text-sm leading-6 [&:not(:first-child)]:mt-4",
      caption: "text-sm text-muted-foreground",
      overline: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "body1",
  },
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  component?: keyof React.JSX.IntrinsicElements
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, component, ...props }, ref) => {
    const Comp = (component || "p") as React.ElementType

    return <Comp ref={ref} className={cn(typographyVariants({ variant }), className)} {...props} />
  }
)

Typography.displayName = "Typography"

export { Typography, typographyVariants }
