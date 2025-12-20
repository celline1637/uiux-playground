import {
  Pagination,
  PaginationInfo,
  RowsPerPageSelect,
} from "@/shared/components/ui/pagination"
import { cn } from "@/shared/utils/cn"

import type { TableProps } from "./types"

// ----------------------------------------------------------------------

type TablePaginationProps = {
  table: TableProps
  totalRows: number
  rowsPerPageOptions?: number[]
  showInfo?: boolean
  showRowsPerPage?: boolean
  className?: string
}

// ----------------------------------------------------------------------

function TablePagination({
  table,
  totalRows,
  rowsPerPageOptions = [5, 10, 25, 50, 100],
  showInfo = true,
  showRowsPerPage = true,
  className,
}: TablePaginationProps) {
  const totalPages = Math.ceil(totalRows / table.rowsPerPage)

  const handlePageChange = (newPage: number) => {
    table.onChangePage(null, newPage)
  }

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    table.onChangeRowsPerPage({
      target: { value: String(newRowsPerPage) },
    } as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      {showInfo && (
        <PaginationInfo
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          totalRows={totalRows}
        />
      )}

      <div className="flex flex-1 items-center justify-between gap-4 sm:justify-end">
        {showRowsPerPage && (
          <RowsPerPageSelect
            value={table.rowsPerPage}
            onChange={handleRowsPerPageChange}
            options={rowsPerPageOptions}
          />
        )}

        <Pagination
          page={table.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------

export { TablePagination }

