"use client";
import { Column, Getter, Row, Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";

import Link from "next/link";
import { toast } from "sonner";
import { Product } from "@/schemas/product";
import { activeOptions } from "../users/data-table-toolbar";

interface DataTableRowActionsProps {
  row: Row<Product>;
  getValue: Getter<unknown>;
  column: Column<Product, unknown>;
  table: Table<Product>;
}

export function DataTableRowActions({
  row,
  column,
  table,
}: DataTableRowActionsProps) {
  const { id, createAt, updateAt, ...other } = row.original as Product;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(id);
    toast.success("Copy ID success");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <Link href={`/manager/products/${id}/edit`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link target="_blank" href={`/gia-cong-my-pham/${row.original.slug}`}>
            View
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyToClipboard}>Copy ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Active</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={other.isActive ? "true" : "false"}>
              {activeOptions.map((active) => (
                <DropdownMenuRadioItem
                  onClick={() => {
                    if (other.isActive != active.value)
                      table.options.meta?.updateData(row.index, column.id, {
                        id,
                        data: {
                          isActive: active.value,
                        },
                      });
                  }}
                  key={active.value ? "true" : "false"}
                  value={active.value ? "true" : "false"}
                >
                  {active.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
