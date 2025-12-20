import { Portal } from "@/shared/components/portal"
import { cn } from "@/shared/utils/cn"

// ----------------------------------------------------------------------

export interface LoadingScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  portal?: boolean
}

export function LoadingScreen({ portal, className, ...other }: LoadingScreenProps) {
  const content = (
    <div
      className={cn("flex items-center justify-center w-full grow min-h-full px-10", className)}
      {...other}
    >
      <div className="w-full max-w-[360px] h-1 bg-muted rounded-full overflow-hidden relative">
        <div className="absolute top-0 left-0 h-full w-[30%] bg-current rounded-full animate-[loading-progress_1.5s_ease-in-out_infinite]" />
      </div>
    </div>
  )

  if (portal) {
    return <Portal>{content}</Portal>
  }

  return content
}
