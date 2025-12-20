import { useMemo } from "react"

import { DataTable, TablePagination, useTable } from "@/feature/table"
import type { Column } from "@/feature/table"
import { mockUsers } from "../lib/mock-users"
import type { User } from "../lib/type"

function BasicTableExample() {
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
        id: "role",
        label: "역할",
        accessorKey: "role",
        sortable: true,
      },
      {
        id: "status",
        label: "상태",
        accessorKey: "status",
        cell: (row) => (
          <span
            className={
              row.status === "active" ? "text-green-600 dark:text-green-400" : "text-gray-500"
            }
          >
            {row.status === "active" ? "활성" : "비활성"}
          </span>
        ),
        sortable: true,
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
        onRowClick={(row) => {
          console.log("Row clicked:", row)
        }}
        emptyMessage="사용자가 없습니다."
      />

      <TablePagination
        table={table}
        totalRows={mockUsers.length}
        rowsPerPageOptions={[5, 10, 25, 50]}
        showInfo
        showRowsPerPage
      />
    </div>
  )
}

export default BasicTableExample
