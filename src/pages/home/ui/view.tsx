import { HomeFooter } from "@/shared/components/ui/home-footer"
import { HomeHero } from "@/shared/components/ui/home-hero"
import { HomePatternGridView } from "@/widgets/home-pattern-grid"

// ----------------------------------------------------------------------

export function HomeView() {
  return (
    <div className="w-full">
      <div className="w-full">
        <HomeHero />
        <HomePatternGridView />
        <HomeFooter />
      </div>
    </div>
  )
}
