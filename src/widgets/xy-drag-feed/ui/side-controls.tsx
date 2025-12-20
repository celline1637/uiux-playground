import { ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/shared/components/ui/button"

// ----------------------------------------------------------------------

type SideControlsProps = {
  status: {
    hasPrev: boolean
    hasNext: boolean
    currentIndex: number
  }
  actions: {
    scrollNext: () => void
    scrollPrev: () => void
  }
}

export function SideControls({ status, actions }: SideControlsProps) {
  return (
    <div className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={actions.scrollPrev}
        disabled={!status.hasPrev}
        className="rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-30"
        aria-label="이전"
      >
        <ChevronUp className="size-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={actions.scrollNext}
        disabled={!status.hasNext}
        className="rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-30"
        aria-label="다음"
      >
        <ChevronDown className="size-5" />
      </Button>
    </div>
  )
}

