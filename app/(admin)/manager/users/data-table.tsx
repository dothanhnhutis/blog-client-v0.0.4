"use client";
import React from "react";
import { User } from "@/schemas/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnFiltersState,
  RowData,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { EditUserType } from "@/schemas/user";
import columns from "./columns";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "@/components/data-table-pagination";
import { editUserById } from "@/service/api/user";
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    updateData: (
      rowIndex: number,
      columnId: string,
      value: { id: string; data: any }
    ) => void;
  }
}
type TableViewType = {
  userData: User[];
  currentUser: User;
};
const DataTable = ({ userData, currentUser }: TableViewType) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data: userData,
    columns,
    state: {
      columnFilters,
    },
    meta: {
      updateData: async (
        rowIndex: number,
        columnId: string,
        value: { id: string; data: EditUserType }
      ) => {
        try {
          const res = await editUserById(value.id, value.data);
          if (res.statusCode == 200) {
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        } catch (error: any) {
          console.log(error);
        }
      },
    },
    enableRowSelection: true,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-2 relative">
      <DataTableToolbar table={table} role={currentUser.role} />
      <ScrollArea className="border rounded-lg bg-background">
        <Table className="w-full table-fixed bg-background">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      style={{ width: `${header.getSize()}px` }}
                      key={header.id}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
                  className="h-14 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <DataTablePagination table={table} />
    </div>
  );
};

export default DataTable;
