"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { DataTableToolbar } from "./data-table-toolbar";
import columns from "./columns";
import { Product } from "@/schemas/product";
import { Category } from "@/schemas/category";
import { toast } from "sonner";
import { DataTablePagination } from "@/components/data-table-pagination";
import { editProduct } from "@/service/api/product";

function DataTable({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data: products,
    columns,
    state: {
      columnFilters,
    },
    meta: {
      updateData: (
        rowIndex: number,
        columnId: string,
        value: { id: string; data: any }
      ) => {
        editProduct(value.id, value.data)
          .then((data) => {
            if (data.statusCode == 200) {
              toast.success(data.message);
            } else {
              toast.error(data.message);
            }
          })
          .catch((error) => console.log(error));
      },
    },
    enableRowSelection: true,
    columnResizeMode: "onChange",
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="flex flex-col gap-4">
      <DataTableToolbar table={table} categories={categories} />
      <ScrollArea className="border rounded-lg bg-background">
        <Table className="w-full table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="relative group/item"
                      style={{ width: `${header.getSize()}px` }}
                      key={header.id}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {/* {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className="group-hover/item:w-1 h-full group-hover/item:bg-green-400 absolute top-0 right-0 cursor-ew-resize hidden group-hover/item:block"
                        />
                      )} */}
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
        <ScrollBar orientation="horizontal" asChild />
      </ScrollArea>
      <DataTablePagination table={table} />
    </div>
  );
}

export default DataTable;
