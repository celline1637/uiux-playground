import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/utils/cn"

// ----------------------------------------------------------------------

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const handlePrevious = () => {
    if (page > 0) {
      onPageChange(page - 1)
    }
  }

  const handleNext = () => {
    if (page < totalPages - 1) {
      onPageChange(page + 1)
    }
  }

  const handleFirst = () => {
    onPageChange(0)
  }

  const handleLast = () => {
    onPageChange(totalPages - 1)
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i)
      }
    } else {
      const start = Math.max(0, page - 2)
      const end = Math.min(totalPages - 1, page + 2)

      if (start > 0) {
        pages.push(0)
        if (start > 1) {
          pages.push("...")
        }
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (end < totalPages - 1) {
        if (end < totalPages - 2) {
          pages.push("...")
        }
        pages.push(totalPages - 1)
      }
    }

    return pages
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 px-2",
        className
      )}
    >
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={handleFirst}
          disabled={page === 0}
          aria-label="첫 페이지"
        >
          <ChevronsLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={page === 0}
          aria-label="이전 페이지"
        >
          <ChevronLeft className="size-4" />
        </Button>
      </div>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((pageNum, index) => {
          if (pageNum === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-1 text-sm text-muted-foreground"
              >
                ...
              </span>
            )
          }

          const pageIndex = pageNum as number
          const isActive = pageIndex === page

          return (
            <Button
              key={pageIndex}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(pageIndex)}
              className={cn(
                "min-w-[2.5rem]",
                isActive && "pointer-events-none"
              )}
              aria-label={`페이지 ${pageIndex + 1}`}
              aria-current={isActive ? "page" : undefined}
            >
              {pageIndex + 1}
            </Button>
          )
        })}
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={page >= totalPages - 1}
          aria-label="다음 페이지"
        >
          <ChevronRight className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLast}
          disabled={page >= totalPages - 1}
          aria-label="마지막 페이지"
        >
          <ChevronsRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------

type PaginationInfoProps = {
  page: number
  rowsPerPage: number
  totalRows: number
  className?: string
}

function PaginationInfo({
  page,
  rowsPerPage,
  totalRows,
  className,
}: PaginationInfoProps) {
  const start = page * rowsPerPage + 1
  const end = Math.min((page + 1) * rowsPerPage, totalRows)

  if (totalRows === 0) {
    return (
      <div className={cn("text-sm text-muted-foreground", className)}>
        총 0개
      </div>
    )
  }

  return (
    <div className={cn("text-sm text-muted-foreground", className)}>
      {start}-{end} / 총 {totalRows}개
    </div>
  )
}

// ----------------------------------------------------------------------

type RowsPerPageSelectProps = {
  value: number
  onChange: (value: number) => void
  options?: number[]
  className?: string
}

function RowsPerPageSelect({
  value,
  onChange,
  options = [5, 10, 25, 50, 100],
  className,
}: RowsPerPageSelectProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <label htmlFor="rows-per-page" className="text-sm text-muted-foreground">
        페이지당:
      </label>
      <select
        id="rows-per-page"
        value={value}
        onChange={(e) => onChange(Number.parseInt(e.target.value, 10))}
        className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

// ----------------------------------------------------------------------

export { Pagination, PaginationInfo, RowsPerPageSelect }

