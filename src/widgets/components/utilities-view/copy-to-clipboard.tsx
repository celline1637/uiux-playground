import { useCallback, useState } from "react"

import { Iconify } from "@/components/iconify"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/shared/hooks"
import { useDoubleClick } from "@/shared/hooks/use-double-click"
import { ComponentBlock, ComponentContainer } from "@/widgets/components/component-block"
import { toast } from "sonner"

// ----------------------------------------------------------------------

export function CopyToClipboard() {
  const { copy } = useCopyToClipboard()

  const [value, setValue] = useState("안녕하세요")

  const textOnClick = `Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
  Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat
  dolor lectus quis orci. Cras non dolor.
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
