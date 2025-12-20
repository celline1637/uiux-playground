import { Iconify } from "@/shared/components/iconify"
import { cn } from "@/shared/utils/cn"
import { Link } from "react-router-dom"
import { Searchbar } from "./searchbar"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 items-center px-4">
        {/* Logo */}
        <div className="mr-4 flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Iconify icon="solar:code-bold" width={20} className="text-primary" />
            <span className="font-bold text-foreground">UI/UX Playground</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            to="/"
            className={cn(
              "transition-colors hover:text-foreground/80",
              location.pathname === "/" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Home
          </Link>
          <Link
            to="/components"
            className={cn(
              "transition-colors hover:text-foreground/80",
              location.pathname.startsWith("/components") ? "text-foreground" : "text-foreground/60"
            )}
          >
            Components
          </Link>
          <Link
            to="/patterns"
            className={cn(
              "transition-colors hover:text-foreground/80",
              location.pathname.startsWith("/patterns") ? "text-foreground" : "text-foreground/60"
            )}
          >
            Patterns
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Search */}
          <Searchbar />

          {/* GitHub Link */}
          <a
            href="https://github.com/celline1637"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            <Iconify icon="solar:github-bold" width={20} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
