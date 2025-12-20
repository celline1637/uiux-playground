import { CopyToClipboard } from "./copy-to-clipboard"

import { Typography } from "@/shared/components/ui/typography"
import { ComponentHero } from "@/shared/components/ui/component-hero"
import { ScrollToViewTemplate } from "@/shared/components/ui/component-template"

// ----------------------------------------------------------------------

export function UtilitiesView() {
  const DEMO = [{ name: "Copy to clipboard", component: <CopyToClipboard /> }]

  return (
    <>
      <ComponentHero>
        <Typography variant="h3" component="h1">
          Utilities
        </Typography>
      </ComponentHero>

      <ScrollToViewTemplate data={DEMO} />
    </>
  )
}
