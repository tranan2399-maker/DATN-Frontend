import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { Input } from '@/components/ui/input'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

// interface DataTableProps<TData, > {
//   columns: any
//   data: TData[]
// }

export default function DataTableDemo({
  columns,
  data
}: any) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-4 lg:gap-x-3 gap-x-10 gap-y-5 mb-5 grid-cols-2">
        <Input
          placeholder="Lọc vé theo mã..."
          value={
            (table.getColumn('orderNumber')?.getFilterValue() as string) ?? ''
          }
          onChange={(event: any) => {
            return table
              .getColumn('orderNumber')
              ?.setFilterValue(event.target.value)
          }}
          className=" border rounded"
        />
        <Input
          placeholder="Lọc vé theo tên phim..."
          value={
            (table.getColumn('name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event: any) => {
            return table
              .getColumn('name')
              ?.setFilterValue(event.target.value)
          }}
          className=" border rounded"
        />
        <Input
          placeholder="Lọc vé theo email..."
          value={
            (table.getColumn('email')?.getFilterValue() as string) ?? ''
          }
          onChange={(event: any) => {
            return table
              .getColumn('email')
              ?.setFilterValue(event.target.value)
          }}
          className=" border rounded"
        />
        <Input
          placeholder="Lọc vé theo ngày..."
          value={
            (table.getColumn('timeFrom')?.getFilterValue() as string) ?? ''
          }
          onChange={(event: any) => {
            return table
              .getColumn('timeFrom')
              ?.setFilterValue(event.target.value)
          }}
          className=" border rounded"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            className='text-sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className='text-sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
