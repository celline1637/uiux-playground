import { Box } from "@/components/ui/box"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container, type ContainerProps } from "@/components/ui/container"
import { Stack, type StackProps } from "@/components/ui/stack"
import { cn } from "@/lib/utils"
import { useEventListener } from "@/shared/hooks/use-event-listener"
import { useCallback, useState } from "react"

// ----------------------------------------------------------------------

type Props = StackProps & {
  offsetValue?: number
  queryClassName?: string
  slotProps?: {
    nav?: React.HTMLAttributes<HTMLElement>["className"]
    section?: React.HTMLAttributes<HTMLElement>["className"]
    container?: ContainerProps
  }
  data: {
    name: string
    component: React.ReactNode
  }[]
}

export function ScrollToViewTemplate({
  data,
  slotProps,
  offsetValue = 0.3, // 0 ~ 1 => 0% => 100%
  queryClassName = "scroll__to__view",
  ...other
}: Props) {
  const [activeSection, setActiveSection] = useState<number | null>(0)

  const handleScroll = useCallback(() => {
    const innerHeight = window.innerHeight * offsetValue
    const scrollPosition = window.scrollY + innerHeight
    const sections = document.querySelectorAll(`.${queryClassName}`)

    let newActiveSection: number | null = null

    sections.forEach((section, index) => {
      const sectionTop = (section as HTMLDivElement).offsetTop
      const sectionBottom = sectionTop + section.clientHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        newActiveSection = index
      }
    })

    setActiveSection(newActiveSection)
  }, [offsetValue, queryClassName])

  useEventListener("scroll", handleScroll)

  const scrollToView = useCallback(
    (index: number) => {
      const sections = document.querySelectorAll(`.${queryClassName}`)

      if (sections && sections.length > index) {
        const element = sections[index] as HTMLElement
        const offsetTop = element.offsetTop - 160

        window.scrollTo({ top: offsetTop, behavior: "smooth" })
      }
    },
    [queryClassName]
  )

  const renderNav = (
    <Stack
      component="nav"
      className={cn("top-20 w-60 shrink-0 sticky hidden md:flex", slotProps?.nav)}
    >
      <Box component="ul" className="flex flex-col gap-1.5">
        {data.map((section, index) => (
          <Box key={section.name} component="li" className="flex">
            <button
              type="button"
              onClick={() => scrollToView(index)}
              className={cn(
                "cursor-pointer text-sm transition-colors",
                activeSection === index
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {index + 1} - {section.name}
            </button>
          </Box>
        ))}
      </Box>
    </Stack>
  )

  const renderSection = (
    <Stack
      component="section"
      spacing={5}
      className={cn("flex-1 min-w-0 rounded-lg p-3 md:p-5 bg-muted", slotProps?.section)}
    >
      {data.map((section) => (
        <Card key={section.name} className={queryClassName}>
          <CardHeader>
            <CardTitle>{section.name}</CardTitle>
          </CardHeader>
          <CardContent>{section.component}</CardContent>
        </Card>
      ))}
    </Stack>
  )

  return (
    <Container {...slotProps?.container}>
      <Stack
        spacing={5}
        direction="row"
        alignItems="flex-start"
        className={cn("pt-10 pb-[60px]", other.className)}
        {...other}
      >
        {renderNav}
        {renderSection}
      </Stack>
    </Container>
  )
}
