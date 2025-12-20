import { useCallback, useState } from "react"

import { Iconify } from "@/shared/components/iconify"

import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip"
import { Typography } from "@/shared/components/ui/typography"
import { useCopyToClipboard } from "@/shared/hooks"
import { useDoubleClick } from "@/shared/hooks/use-double-click"
import { cn } from "@/shared/utils/cn"
import { ComponentBlock, ComponentContainer } from "../ui/component-block"
import { toast } from "sonner"

// ----------------------------------------------------------------------

export function CopyToClipboard() {
  const { copy } = useCopyToClipboard()

  const [value, setValue] = useState("안녕하세요")

  const textOnClick = `lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  `

  const onCopy = useCallback(
    (text: string) => {
      if (text) {
        toast.success("Copied!")
        copy(text)
      }
    },
    [copy]
  )

  const handleClick = useDoubleClick({ doubleClick: () => onCopy(textOnClick) })

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }, [])

  return (
    <ComponentContainer className={cn("grid grid-cols-1 md:grid-cols-2 gap-3 gap-y-5")}>
      <ComponentBlock title="onChange">
        <div className="relative w-full">
          <Input type="text" value={value} onChange={handleChange} className="pr-10" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Tooltip>
              <TooltipContent>{"Copy"}</TooltipContent>
              <TooltipTrigger asChild>
                <Button size="icon" onClick={() => onCopy(value)}>
                  <Iconify icon="eva:copy-fill" width={24} />
                </Button>
              </TooltipTrigger>
            </Tooltip>
          </div>
        </div>
      </ComponentBlock>

      <ComponentBlock title="onDoubleClick">
        <Typography onClick={handleClick} className="cursor-pointer">
          {textOnClick}
        </Typography>
      </ComponentBlock>
    </ComponentContainer>
  )
}
