"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/schemas/product";
import { Table } from "@tanstack/react-table";
import React from "react";

const InputFilter = ({ table }: { table: Table<Product> }) => {
  const [filterBy, setFilterBy] = React.useState<string>("name");

  React.useEffect(() => {
    const temp = table
      .getColumn(filterBy == "name" ? "code" : "name")
      ?.getFilterValue();
    table
      .getColumn(filterBy == "name" ? "code" : "name")
      ?.setFilterValue(undefined);
    table.getColumn(filterBy)?.setFilterValue(temp);
  }, [filterBy, table]);

  return (
    <div className="flex border rounded-lg bg-background">
      <Select
        defaultValue={filterBy}
        onValueChange={(v) => {
          setFilterBy(v);
        }}
      >
        <SelectTrigger className="border-none focus:ring-offset-0 focus:ring-transparent focus:bg-transparent h-9">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Filter By</SelectLabel>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="code">Code</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="h-9" />
      <input
        type="text"
        className="bg-transparent placeholder:text-sm [outline:none] p-1"
        placeholder={`Filter by ${filterBy}...`}
        value={(table.getColumn(filterBy)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(filterBy)?.setFilterValue(event.target.value)
        }
      />
    </div>
  );
};

export default InputFilter;
