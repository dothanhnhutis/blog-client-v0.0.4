"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTableRowActions } from "./data-table-row-actions";
import { Product } from "@/schemas/product";
import { DataTableColumnHeader } from "@/components/data-table-header";

const columnHelper = createColumnHelper<Product>();

const columns = [
  // columnHelper.accessor("id", {
  //   enableHiding: false,
  //   enableSorting: false,
  //   size: 200,
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="ID" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-2">
  //         <span className="max-w-full line-clamp-2 font-medium">
  //           {row.getValue("id")}
  //         </span>
  //       </div>
  //     );
  //   },
  // }),
  columnHelper.accessor("code", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    enableHiding: false,
    size: 150,
    cell: ({ row }) => {
      return (
        <p className="max-w-full truncate font-medium">
          {row.getValue("code")}
        </p>
      );
    },
  }),
  columnHelper.accessor("productName", {
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    size: 300,
    cell: ({ row }) => {
      return <p className="line-clamp-2 font-medium">{row.getValue("name")}</p>;
    },
  }),
  columnHelper.accessor("categoryId", {
    id: "category",
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = row.original.category as Product["category"];
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {category.name}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),

  columnHelper.accessor("createdById", {
    id: "createBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CreatedBy" />
    ),
    size: 300,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={row.original.createdBy.avatarUrl ?? AvatarDefault.src}
            />
            <AvatarFallback className="bg-transparent">
              <Skeleton className="h-10 w-10 rounded-full" />
            </AvatarFallback>
          </Avatar>
          <div className="max-w-full overflow-hidden">
            <p className="truncate font-medium">
              {row.original.createdBy.name}
            </p>
            <p className="truncate font-medium">
              {row.original.createdBy.email}
            </p>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor("isActive", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    size: 100,
    cell: ({ row }) => {
      return (
        <p className="font-medium">
          {row.getValue("isActive") ? "True" : "False"}
        </p>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.display({
    id: "actions",
    size: 60,
    enableResizing: false,
    cell: ({ row, getValue, column, table }) => (
      <DataTableRowActions
        row={row}
        getValue={getValue}
        column={column}
        table={table}
      />
    ),
  }),
];

export default columns;
