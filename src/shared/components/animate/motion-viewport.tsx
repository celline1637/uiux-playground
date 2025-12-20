import type { MotionProps } from "framer-motion"
import type { HTMLAttributes } from "react"

import { m } from "framer-motion"
import { forwardRef } from "react"

import { cn } from "@/shared/utils/cn"
import { varContainer } from "./variants"

// ----------------------------------------------------------------------

export type MotionViewportProps = HTMLAttributes<HTMLDivElement> &
  MotionProps & {
    disableAnimate?: boolean
  }

export const MotionViewport = forwardRef<HTMLDivElement, MotionViewportProps>(
  ({ children, disableAnimate = true, className, ...other }, ref) => {
    if (disableAnimate) {
      return (
        <div ref={ref} className={cn(className)} {...other}>
          {children}
        </div>
      )
    }

    return (
      <m.div
        ref={ref}
        initial="initial"
        whileInView="animate"
        variants={varContainer()}
        viewport={{ once: true, amount: 0.3 }}
        className={cn(className)}
        {...other}
      >
        {children}
      </m.div>
    )
  }
)
