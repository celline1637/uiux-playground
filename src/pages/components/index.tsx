import { ComponentsView } from "@/widgets/components/view"
import { Helmet } from "react-helmet-async"

// ----------------------------------------------------------------------

const metadata = { title: "All components" }

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ComponentsView />
    </>
  )
}
