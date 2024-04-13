"use client";
import Image from "next/image";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { Blog } from "@/schemas/blog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/components/data-table-header";
const columnHelper = createColumnHelper<Blog>();

export const columns = [
  // columnHelper.accessor("thumnail", {
  //   header: "Thumnail",
  //   minSize: 150,
  //   enableSorting: false,
  //   enableColumnFilter: false,
  //   cell: ({ row }) => {
  //     return (
  //       <div className=" flex items-center justify-center w-[120px]">
  //         <AspectRatio ratio={16 / 9} className="relative">
  //           <Image
  //             fill
  //             sizes="120"
  //             src={row.getValue("thumnail") ?? null}
  //             alt="Thumnail"
  //             className="rounded-md object-cover"
  //           />
  //         </AspectRatio>
  //       </div>
  //     );
  //   },
  // }),
  columnHelper.accessor("title", {
    size: 300,
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  }),
  columnHelper.accessor("tagId", {
    id: "tag",
    size: 150,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tag" />
    ),
    cell: ({ row }) => {
      const tag = row.original.tag as Blog["tag"];
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{tag.name}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.accessor("authorId", {
    id: "author",
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
    cell: ({ row }) => {
      const author = row.original.author as Blog["author"];
      return (
        <div className="flex items-center gap-2 capitalize">
          <Avatar>
            <AvatarImage src={author.avatarUrl ?? AvatarDefault.src} />
            <AvatarFallback className="bg-transparent">
              <Skeleton className="h-10 w-10 rounded-full" />
            </AvatarFallback>
          </Avatar>
          <p className="line-clamp-2 font-medium">{author.name}</p>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.accessor("isActive", {
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("isActive") ? "True" : "False"}
          </span>
        </div>
      );
    },
  }),
  columnHelper.accessor("publishAt", {
    size: 250,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PublishAt" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {format(
              new Date(row.getValue("publishAt")),
              "dd/MM/yyyy HH:mm (z)"
            )}
          </span>
        </div>
      );
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
