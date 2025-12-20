import { Box } from "@/shared/components/ui/box"
import { Container, type ContainerProps } from "@/shared/components/ui/container"
import { Stack, type StackProps } from "@/shared/components/ui/stack"
import { cn } from "@/shared/utils/cn"

// ----------------------------------------------------------------------

type ComponentBlockProps = StackProps & {
  title?: string
}

export function ComponentBlock({ title, className, children, ...other }: ComponentBlockProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
      className={cn(
        "relative w-full flex-wrap px-3 py-6 rounded-xl",
        "bg-muted/40 border border-border/40",
        className
      )}
      {...other}
    >
      {title && (
        <Box
          component="span"
          className={cn(
            "absolute left-0 top-0 ml-2.5 -translate-y-1/2",
            "px-1 py-0.5 rounded-md",
            "text-xs font-semibold text-foreground",
            "bg-background border border-border/60",
            "dark:bg-muted"
          )}
        >
          {title}
        </Box>
      )}

      {children}
    </Stack>
  )
}

// ----------------------------------------------------------------------

export function ComponentContainer({ children, className, ...other }: ContainerProps) {
  return (
    <Container className={cn("mt-10 mb-16 flex flex-col gap-5", className)} {...other}>
      {children}
    </Container>
  )
}
