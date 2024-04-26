import { BellIcon } from "lucide-react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const Notification = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <BellIcon className="size-4" />
      </PopoverTrigger>
      <PopoverContent className="w-80">dsadsad</PopoverContent>
    </Popover>
  );
};
