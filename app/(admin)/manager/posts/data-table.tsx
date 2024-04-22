"use client";
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
import { Post } from "@/schemas/post";
import { columns } from "./columns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tag } from "@/schemas/tag";
import { User } from "@/schemas/user";
import { toast } from "sonner";
import { DataTablePagination } from "@/components/data-table-pagination";
import { editPost } from "@/service/api/post";

interface DataTableProps {
  currentUser: User;
  posts: Post[];
  authors: User[];
  tags: Tag[];
}

function DataTable({ posts, authors, tags, currentUser }: DataTableProps) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data: posts,
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
        editPost(value.id, value.data)
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
      <DataTableToolbar
        table={table}
        tagOptions={tags?.map((tag) => ({
          value: tag.id,
          label: tag.name,
        }))}
        authorOptions={authors?.map((author) => ({
          value: author.id,
          label: author.name,
        }))}
      />
      <ScrollArea className="border rounded-lg bg-background">
        <Table className="w-full table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="relative group/item "
                      style={{ width: `${header.getSize()}px` }}
                      key={header.id}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {/* 
                      {header.column.getCanResize() && (
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <DataTablePagination table={table} />
    </div>
  );
}

export default DataTable;
