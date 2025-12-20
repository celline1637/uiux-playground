import { useMemo } from "react"

import { mockUsers, type User } from "@/entities/user"
import { useTable, type Column, DataTable, TablePagination } from "@/features/data-table"

// ----------------------------------------------------------------------

function CustomCellTableExample() {
  const table = useTable({
    defaultOrderBy: "name",
    defaultOrder: "asc",
    defaultRowsPerPage: 5,
    defaultCurrentPage: 0,
  })

  const columns: Column<User>[] = useMemo(
    () => [
      {
        id: "name",
        label: "이름",
        accessorKey: "name",
        sortable: true,
      },
      {
        id: "email",
        label: "이메일",
        accessorKey: "email",
        sortable: true,
      },
      {
        id: "status",
        label: "상태",
        accessorKey: "status",
        cell: (row) => (
          <div className="flex items-center gap-2">
            <span
              className={`size-2 rounded-full ${
                row.status === "active" ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            <span
              className={
                row.status === "active" ? "text-green-600 dark:text-green-400" : "text-gray-500"
              }
            >
              {row.status === "active" ? "활성" : "비활성"}
            </span>
          </div>
        ),
        sortable: true,
        align: "center",
      },
      {
        id: "role",
        label: "역할",
        accessorKey: "role",
        cell: (row) => (
          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
            {row.role}
          </span>
        ),
        sortable: true,
        align: "center",
      },
      {
        id: "createdAt",
        label: "생성일",
        accessorKey: "createdAt",
        sortable: true,
      },
    ],
    []
  )

  return (
    <div className="space-y-4">
      <DataTable
        data={mockUsers}
        columns={columns}
        table={table}
        getRowId={(row) => row.id}
        emptyMessage="사용자가 없습니다."
      />

      <TablePagination
        table={table}
        totalRows={mockUsers.length}
        rowsPerPageOptions={[5, 10, 25]}
        showInfo
        showRowsPerPage
      />
    </div>
  )
}

export default CustomCellTableExample
