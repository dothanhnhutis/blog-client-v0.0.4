"use client";
import React from "react";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { ImageIcon, PlusIcon, TableIcon } from "lucide-react";
import { Editor } from "@tiptap/react";

export const InsertAction = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="icon"
          className="rounded-md"
          variant="ghost"
        >
          <PlusIcon className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-auto">
        <div className="flex gap-2">
          <Button
            type="button"
            size="icon"
            className="rounded-md"
            variant="ghost"
            onClick={() => {
              editor.commands.insertImage();
            }}
          >
            <ImageIcon className="size-5" />
          </Button>

          <Button
            type="button"
            size="icon"
            className="rounded-md"
            variant="ghost"
          >
            <TableIcon className="size-5" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
