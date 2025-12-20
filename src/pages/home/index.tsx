import { HomeView } from "../../widgets/home/view"
import { Helmet } from "react-helmet-async"

// ----------------------------------------------------------------------

const metadata = {
  title: "UI/UX Playground",
  description: "UI/UX Playground",
}

function HomePage() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Helmet>
      <HomeView />
    </>
  )
}
export default HomePage
