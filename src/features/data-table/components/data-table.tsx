import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { useMemo } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { cn } from "@/shared/utils/cn"

import type { Column, DataTableProps } from "../type/types"

// ----------------------------------------------------------------------

function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  table,
  getRowId = (row) => String(row.id ?? Math.random()),
  onRowClick,
  emptyMessage = "데이터가 없습니다.",
  dense = false,
  className,
}: DataTableProps<T>) {
  const { order, orderBy, onSort, selected } = table

  const sortedData = useMemo(() => {
    if (!orderBy || orderBy === "") {
      return data
    }

    const column = columns.find((col) => col.id === orderBy)
    if (!column || !column.sortable) {
      return data
    }

    return [...data].sort((a, b) => {
      // 1. sortValue 함수가 있으면 우선 사용
      // 2. accessorKey가 있으면 사용
      // 3. 둘 다 없으면 column.id를 키로 사용하여 원본 데이터에서 값 가져오기
      let aValue: string | number | null | undefined
      let bValue: string | number | null | undefined

      if (column.sortValue) {
        aValue = column.sortValue(a)
        bValue = column.sortValue(b)
      } else if (column.accessorKey) {
        aValue = a[column.accessorKey] as string | number | null | undefined
        bValue = b[column.accessorKey] as string | number | null | undefined
      } else {
        // column.id를 키로 사용하여 원본 데이터에서 값 가져오기
        aValue = a[column.id as keyof T] as string | number | null | undefined
        bValue = b[column.id as keyof T] as string | number | null | undefined
      }

      if (aValue == null && bValue == null) return 0
      if (aValue == null) return 1
      if (bValue == null) return -1

      if (typeof aValue === "string" && typeof bValue === "string") {
        return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return order === "asc" ? aValue - bValue : bValue - aValue
      }

      const aStr = String(aValue)
      const bStr = String(bValue)
      return order === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr)
    })
  }, [data, columns, order, orderBy])

  const paginatedData = useMemo(() => {
    const start = table.page * table.rowsPerPage
    const end = start + table.rowsPerPage
    return sortedData.slice(start, end)
  }, [sortedData, table.page, table.rowsPerPage])

  const getSortIcon = (columnId: string) => {
    if (orderBy !== columnId) {
      return <ArrowUpDown className="ml-1 size-4 opacity-50" />
    }
    return order === "asc" ? (
      <ArrowUp className="ml-1 size-4" />
    ) : (
      <ArrowDown className="ml-1 size-4" />
    )
  }

  const handleHeaderClick = (column: Column<T>) => {
    if (column.sortable) {
      onSort(column.id)
    }
  }

  if (data.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center">
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.id}
                className={cn(
                  column.sortable && "cursor-pointer select-none hover:bg-muted/50",
                  column.headerClassName
                )}
                style={{
                  textAlign: column.align || "left",
                }}
                onClick={() => handleHeaderClick(column)}
              >
                <div className="flex items-center">
                  {column.label}
                  {column.sortable && getSortIcon(column.id)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row) => {
            const rowId = getRowId(row)
            const isSelected = selected.includes(rowId)

            return (
              <TableRow
                key={rowId}
                data-state={isSelected ? "selected" : undefined}
                className={cn(onRowClick && "cursor-pointer", dense && "h-10")}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => {
                  const cellContent = column.cell
                    ? column.cell(row)
                    : column.accessorKey
                      ? String(row[column.accessorKey] ?? "")
                      : ""

                  return (
                    <TableCell
                      key={column.id}
                      className={column.cellClassName}
                      style={{
                        textAlign: column.align || "left",
                      }}
                    >
                      {cellContent}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

// ----------------------------------------------------------------------

export type { Column, DataTableProps }
export { DataTable }
