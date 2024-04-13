import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Product } from "@/schemas/product";
import { Category } from "@/schemas/category";
import { activeOptions } from "../users/data-table-toolbar";
import InputFilter from "./input-filter";

interface DataTableToolbarProps {
  table: Table<Product>;
  categories: Category[];
}

export function DataTableToolbar({ table, categories }: DataTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <ScrollArea>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center space-x-2">
          <InputFilter table={table} />

          {table.getColumn("category") && (
            <DataTableFacetedFilter
              column={table.getColumn("category")}
              title="Category"
              options={
                categories?.map((category) => ({
                  value: category.id,
                  label: category.name,
                })) ?? []
              }
            />
          )}
          {table.getColumn("isActive") && (
            <DataTableFacetedFilter
              column={table.getColumn("isActive")}
              title="Active"
              options={activeOptions}
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
      <ScrollBar orientation="horizontal" asChild />
    </ScrollArea>
  );
}
