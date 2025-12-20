import { useCallback, useEffect, useRef, useState } from "react"

import { useRouter } from "@/routes/hooks"
import { isExternalLink } from "@/routes/utils"
import { useBoolean } from "@/shared/hooks/use-boolean"
import { useEventListener } from "@/shared/hooks/use-event-listener"
import { cn } from "@/shared/utils/cn"

import { Iconify } from "@/shared/components/iconify"
import { Label } from "@/shared/components/ui/label"
import { ScrollArea } from "@/shared/components/ui/scroll-area"

import { Button } from "@/shared/components/ui/button"
import { Dialog, DialogContent } from "@/shared/components/ui/dialog"
import { Input } from "@/shared/components/ui/input"

import { navigation } from "../config-nav-data"
import { match, parse } from "./highlight"
import { ResultItem } from "./result-item"
import { SearchNotFound } from "./search-not-found"
import { applyFilter, getAllItems, groupItems } from "./utils"

// ----------------------------------------------------------------------

type NavItem = {
  title: string
  path: string
  icon?: string
}

type NavSection = {
  title: string
  items: NavItem[]
}

export type SearchbarProps = {
  data?: NavSection[]
  className?: string
}

export function Searchbar({ data: navItems = navigation, className }: SearchbarProps) {
  const router = useRouter()
  const search = useBoolean()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([])

  const handleClose = useCallback(() => {
    search.onFalse()
    setSearchQuery("")
    setSelectedIndex(-1)
  }, [search])

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      search.onToggle()
      setSearchQuery("")
    }
  }

  useEventListener("keydown", handleKeyDown)

  const handleClick = useCallback(
    (path: string) => {
      if (isExternalLink(path)) {
        window.open(path)
      } else {
        router.push(path)
      }
      handleClose()
    },
    [handleClose, router]
  )

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }, [])

  const dataFiltered = applyFilter({
    inputData: getAllItems({ data: navItems }),
    query: searchQuery,
  })

  const notFound = searchQuery && !dataFiltered.length

  // biome-ignore lint/correctness/useExhaustiveDependencies: Reset selected index when search query changes
  useEffect(() => {
    setSelectedIndex(-1)
    itemsRef.current = []
  }, [searchQuery])

  // Keyboard navigation
  useEffect(() => {
    if (!search.value) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with typing in input
      if (
        document.activeElement === inputRef.current &&
        (e.key === "ArrowDown" || e.key === "ArrowUp")
      ) {
        e.preventDefault()
        if (e.key === "ArrowDown" && dataFiltered.length > 0) {
          setSelectedIndex(0)
          setTimeout(() => {
            itemsRef.current[0]?.scrollIntoView({ block: "nearest" })
          }, 0)
        }
        return
      }

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => {
          const next = prev < dataFiltered.length - 1 ? prev + 1 : prev
          setTimeout(() => {
            itemsRef.current[next]?.scrollIntoView({ block: "nearest" })
          }, 0)
          return next
        })
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => {
          const next = prev > 0 ? prev - 1 : -1
          if (next >= 0) {
            setTimeout(() => {
              itemsRef.current[next]?.scrollIntoView({ block: "nearest" })
            }, 0)
          } else {
            inputRef.current?.focus()
          }
          return next
        })
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault()
        const item = dataFiltered[selectedIndex]
        if (item) {
          handleClick(item.path)
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [search.value, dataFiltered, selectedIndex, handleClick])

  const renderItems = () => {
    const dataGroups = groupItems(dataFiltered)
    let itemIndex = 0

    return Object.keys(dataGroups)
      .sort((a, b) => -b.localeCompare(a))
      .map((group, groupIndex) => (
        <div
          key={`${group}-${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            groupIndex
          }`}
          className="mb-4 last:mb-0"
        >
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {group}
          </div>
          <ul className="flex flex-col">
            {dataGroups[group].map((item) => {
              const { title, path } = item
              const currentIndex = itemIndex++
              const isSelected = currentIndex === selectedIndex

              const partsTitle = parse(title, match(title, searchQuery))
              const partsPath = parse(path, match(path, searchQuery))

              return (
                <li key={`${title}${path}`} className="flex">
                  <ResultItem
                    ref={(el) => {
                      itemsRef.current[currentIndex] = el
                    }}
                    path={partsPath}
                    title={partsTitle}
                    isSelected={isSelected}
                    onClickItem={() => handleClick(path)}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      ))
  }

  const renderButton = (
    <div
      className={cn(
        "flex items-center cursor-pointer rounded-lg transition-colors",
        "hover:bg-muted/50",
        "sm:pr-2 sm:bg-muted/50",
        className
      )}
      onClick={search.onTrue}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          search.onTrue()
        }
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          search.onTrue()
        }
      }}
    >
      <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Search">
        <Iconify icon="solar:magnifer-bold" width={20} />
      </Button>

      <Label className="hidden sm:inline-flex text-xs">⌘K</Label>
    </div>
  )

  return (
    <>
      {renderButton}

      <Dialog open={search.value} onOpenChange={search.setValue}>
        <DialogContent showCloseButton className="overflow-hidden p-0">
          <div className="flex items-center border-b border-border px-4 py-3">
            <div className="relative flex-1">
              <Iconify
                icon="solar:magnifer-bold"
                width={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <Input
                ref={inputRef}
                type="search"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={handleSearch}
                autoFocus
                className="h-10 pl-10 pr-16 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    e.preventDefault()
                    if (e.key === "ArrowDown") {
                      setSelectedIndex(0)
                      itemsRef.current[0]?.scrollIntoView({ block: "nearest" })
                    }
                  }
                }}
              />
              <Label className="absolute right-3 top-1/2 -translate-y-1/2 text-xs tracking-wider text-muted-foreground pointer-events-none bg-background px-1">
                esc
              </Label>
            </div>
          </div>

          {notFound ? (
            <SearchNotFound query={searchQuery} className="py-12" />
          ) : (
            <ScrollArea className="max-h-[60vh] min-h-[200px]">
              <div className="px-3 py-2">{renderItems()}</div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
