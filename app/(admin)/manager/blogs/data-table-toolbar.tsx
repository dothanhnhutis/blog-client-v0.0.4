"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { CurrentUser } from "@/constants/schemas/user";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  tagOptions?: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  authorOptions?: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableToolbar<TData>({
  table,
  tagOptions,
  authorOptions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <ScrollArea>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="w-[150px] lg:w-[250px] focus-visible:ring-offset-0 focus-visible:ring-transparent"
          />
          {table.getColumn("tag") && tagOptions && (
            <DataTableFacetedFilter
              column={table.getColumn("tag")}
              title="Tag"
              options={tagOptions}
            />
          )}
          {table.getColumn("author") && authorOptions && (
            <DataTableFacetedFilter
              column={table.getColumn("author")}
              title="Author"
              options={authorOptions}
            />
          )}
          {isFiltered && (
            <Button
              variant="outline"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <XIcon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
