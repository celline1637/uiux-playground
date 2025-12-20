import { CONFIG } from "@/shared/config/config-global"
import { Helmet } from "react-helmet-async"
import { UtilitiesView } from "./ui/utilities-view/view"

// ----------------------------------------------------------------------

const metadata = { title: `Utilities | Components - ${CONFIG.site.name}` }

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UtilitiesView />
    </>
  )
}
