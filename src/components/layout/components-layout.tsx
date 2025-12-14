import { ComponentHero } from "@/widgets/components/component-hero"
import { m } from "framer-motion"

import {} from "@/components/ui/box"
import { Container } from "@/components/ui/container"
import { Stack } from "@/components/ui/stack"
import { Typography } from "@/components/ui/typography"

import { MotionContainer } from "@/components/animate/motion-container"
import { varFade } from "@/components/animate/variants/fade"
import { ComponentNav } from "@/widgets/components/component-nav"
import { useMemo } from "react"
import { useLocation } from "react-router-dom"
// ----------------------------------------------------------------------

export function ComponentsLayout({
  children,

  description,
}: { children: React.ReactNode; description: string }) {
  const location = useLocation()
  const title = useMemo(() => {
    return location.pathname.split("/").pop()
  }, [location])
  return (
    <>
      <ComponentHero className="py-[60px]">
        <MotionContainer className="text-center">
          <m.div variants={varFade().inUp}>
            <Typography variant="h3" component="h1">
              {title}
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Typography variant="body2" className="text-muted-foreground mt-3">
              {description}
            </Typography>
          </m.div>
        </MotionContainer>
      </ComponentHero>

      <Container className="mt-10 mb-[60px]">
        <div className="flex flex-col md:flex-row md:items-start">
          <ComponentNav />

          <Stack>{children}</Stack>
        </div>
      </Container>
    </>
  )
}
