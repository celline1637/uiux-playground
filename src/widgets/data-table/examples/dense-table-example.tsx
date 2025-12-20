import { useMemo } from "react"

import { mockUsers, type User } from "@/entities/user"
import { useTable, type Column, DataTable, TablePagination } from "@/features/data-table"

// ----------------------------------------------------------------------

function DenseTableExample() {
  const table = useTable({
    defaultOrderBy: "email",
    defaultOrder: "asc",
    defaultRowsPerPage: 10,
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
        dense
        emptyMessage="데이터가 없습니다."
      />

      <TablePagination
        table={table}
        totalRows={mockUsers.length}
        rowsPerPageOptions={[10, 25, 50]}
        showInfo
        showRowsPerPage
      />
    </div>
  )
}

export default DenseTableExample
