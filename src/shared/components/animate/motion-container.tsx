import type { MotionProps } from "framer-motion"
import type { HTMLAttributes } from "react"

import { m } from "framer-motion"
import { forwardRef } from "react"

import { cn } from "@/shared/utils/cn"
import { varContainer } from "./variants/container"

// ----------------------------------------------------------------------

export type MotionContainerProps = HTMLAttributes<HTMLDivElement> &
  MotionProps & {
    animate?: boolean
    action?: boolean
  }

export const MotionContainer = forwardRef<HTMLDivElement, MotionContainerProps>(
  ({ animate, action = false, children, className, ...other }, ref) => {
    return (
      <m.div
        ref={ref}
        variants={varContainer()}
        initial={action ? false : "initial"}
        animate={action ? (animate ? "animate" : "exit") : "animate"}
        exit={action ? undefined : "exit"}
        className={cn(className)}
        {...other}
      >
        {children}
      </m.div>
    )
  }
)
