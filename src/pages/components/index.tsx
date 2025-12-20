import { Helmet } from "react-helmet-async"
import { ComponentsView } from "./ui/view"

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
