import { CONFIG } from "@/shared/config/config-global"
import { UtilitiesView } from "@/widgets/components/utilities-view"
import { Helmet } from "react-helmet-async"

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
