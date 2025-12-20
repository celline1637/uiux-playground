// ----------------------------------------------------------------------

export type TableProps = {
  dense: boolean
  page: number
  rowsPerPage: number
  order: "asc" | "desc"
  orderBy: string
  //
  selected: string[]
  onSelectRow: (id: string) => void
  onSelectAllRows: (checked: boolean, newSelecteds: string[]) => void
  //
  onResetPage: () => void
  onSort: (id: string) => void
  onChangePage: (event: unknown, newPage: number) => void
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => void
  onUpdatePageDeleteRow: (totalRowsInPage: number) => void
  onUpdatePageDeleteRows: ({
    totalRowsInPage,
    totalRowsFiltered,
  }: {
    totalRowsInPage: number
    totalRowsFiltered: number
  }) => void
  //
  setPage: React.Dispatch<React.SetStateAction<number>>
  setDense: React.Dispatch<React.SetStateAction<boolean>>
  setOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>
  setOrderBy: React.Dispatch<React.SetStateAction<string>>
  setSelected: React.Dispatch<React.SetStateAction<string[]>>
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
}

export type Column<T> = {
  id: string
  label: string
  accessorKey?: keyof T
  cell?: (row: T) => React.ReactNode
  sortValue?: (row: T) => string | number | null | undefined
  sortable?: boolean
  align?: "left" | "center" | "right"
  headerClassName?: string
  cellClassName?: string
}

export type DataTableProps<T> = {
  data: T[]
  columns: Column<T>[]
  table: TableProps
  getRowId?: (row: T) => string
  onRowClick?: (row: T) => void
  emptyMessage?: string
  dense?: boolean
  className?: string
}
