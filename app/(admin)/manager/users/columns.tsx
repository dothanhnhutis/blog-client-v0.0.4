"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";
import { User } from "@/schemas/user";
import { DataTableColumnHeader } from "@/components/data-table-header";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("email", {
    enableHiding: false,
    size: 300,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-full truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      );
    },
  }),

  columnHelper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    size: 200,
    cell: ({ row }) => {
      return (
        <p className="max-w-full truncate font-medium">
          {row.getValue("name")}
        </p>
      );
    },
  }),
  columnHelper.accessor("role", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    size: 150,
    cell: ({ row }) => {
      return (
        <p className="max-w-full truncate font-medium">
          {row.getValue("role")}
        </p>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.accessor("isActive", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    size: 100,
    cell: ({ row }) => {
      return (
        <p className="max-w-full truncate font-medium">
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
    size: 100,
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
