import { CopyToClipboard } from "./copy-to-clipboard"

import { Typography } from "@/shared/components/ui/typography"
import { ComponentHero } from "../component-hero"
import { ScrollToViewTemplate } from "../component-template"

// ----------------------------------------------------------------------

export function UtilitiesView() {
  const DEMO = [
    // { name: "Text max line", component: <TextMaxLine /> },
    { name: "Copy to clipboard", component: <CopyToClipboard /> },
    // { name: "Gradient", component: <Gradient /> },
    // { name: "Countdown", component: <Countdown /> },
  ]

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
