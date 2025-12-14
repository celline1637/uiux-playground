import { Box, type BoxProps } from "@/components/ui/box"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

import { CONFIG } from "@/shared/config/config-global"

// ----------------------------------------------------------------------

export function ComponentHero({ children, className, ...other }: BoxProps) {
  return (
    <Box className={cn("py-5 min-h-[240px] flex relative items-center", className)} {...other}>
      <Container>{children}</Container>

      <Box
        className="absolute top-0 left-0 w-full h-full -z-10 scale-x-[-1] bg-background/90"
        style={{
          backgroundImage: `url(${CONFIG.site.basePath}/assets/background/background-3-blur.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      />
    </Box>
  )
}
