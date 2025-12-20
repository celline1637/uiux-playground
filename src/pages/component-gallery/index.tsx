import { Helmet } from "react-helmet-async"
import { ComponentGalleryView } from "@/widgets/component-gallery"

// ----------------------------------------------------------------------

const metadata = { title: "All components" }

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ComponentGalleryView />
    </>
  )
}
