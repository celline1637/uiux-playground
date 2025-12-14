import { m } from "framer-motion"

import { Box, type BoxProps } from "@/components/ui/box"
import { Container } from "@/components/ui/container"
import { Separator } from "@/components/ui/separator"
import { Stack } from "@/components/ui/stack"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

import { orderBy } from "@/shared/utils/helper"

import { MotionContainer } from "@/components/animate/motion-container"
import { varFade } from "@/components/animate/variants/fade"

import { ComponentCard } from "./component-card"
import { ComponentHero } from "./component-hero"
import { ComponentNav } from "./component-nav"
import { type NavItem, extraNav, uiNav } from "./config-nav"

// ----------------------------------------------------------------------

export function ComponentsView() {
  return (
    <>
      <ComponentHero className="py-[60px]">
        <MotionContainer className="text-center">
          <m.div variants={varFade().inUp}>
            <Typography variant="h3" component="h1">
              Components
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Typography variant="body2" className="text-muted-foreground mt-3">
              All components
            </Typography>
          </m.div>
        </MotionContainer>
      </ComponentHero>

      <Container className="mt-10 mb-[60px]">
        <div className="flex flex-col md:flex-row md:items-start">
          <ComponentNav />

          <Stack className="[&>*:not(:last-child)]:mb-8">
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Typography variant="h5">UI</Typography>
              </Stack>

              <Grid>
                {orderBy(uiNav, ["name"], ["asc"]).map((item: NavItem) => (
                  <ComponentCard key={item.name} item={item} />
                ))}
              </Grid>
            </Stack>

            <Separator className="border-dashed my-8" />

            <Stack spacing={3}>
              <Stack spacing={1}>
                <Typography variant="h5">Extra Components</Typography>

                <Typography variant="body2" className="text-muted-foreground">
                  Some custom components / use 3rd party dependencies (chart, map, editor…).
                </Typography>
              </Stack>

              <Grid>
                {orderBy(extraNav, ["name"], ["asc"]).map((item: NavItem) => (
                  <ComponentCard key={item.name} item={item} />
                ))}
              </Grid>
            </Stack>
          </Stack>
        </div>
      </Container>
    </>
  )
}

// ----------------------------------------------------------------------

function Grid({ children }: BoxProps) {
  return (
    <Box
      className={cn(
        "grid gap-y-3 gap-x-2.5",
        "grid-cols-2",
        "sm:grid-cols-3",
        "md:grid-cols-4",
        "lg:grid-cols-5"
      )}
    >
      {children}
    </Box>
  )
}
