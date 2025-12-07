import Footer from "./footer"
import GridView from "./grid-view"
import Hero from "./hero"

// ----------------------------------------------------------------------

const HomeView = () => {
  return (
    <div className="w-full">
      <div className="w-full">
        <Hero />
        <GridView />
        <Footer />
      </div>
    </div>
  )
}

export default HomeView
