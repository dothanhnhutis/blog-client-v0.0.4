"use client";
import { PlusCircleIcon, XIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TagProps = {
  id?: string;
  value?: string[];
  placeholder?: string;
  onChange?: (data: string[]) => void;
};

const TagInput = ({ id, placeholder, onChange, value = [] }: TagProps) => {
  const [input, setInput] = React.useState<string>("");

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter") {
      if (typeof onChange == "function")
        onChange(input.length > 0 ? [...value, input] : value);
      setInput("");
      return;
    }
  }

  return (
    <Label
      htmlFor={id}
      className="flex items-center border-dashed border-2 rounded-md text-sm font-medium p-1"
    >
      <div className="flex items-center flex-wrap gap-1">
        {value.map((t, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="rounded-sm p-1 text-sm font-medium"
          >
            {t}
            <XIcon
              className="w-4 h-4 ml-2 cursor-pointer flex flex-shrink-0"
              onClick={() => {
                if (typeof onChange == "function")
                  onChange(value.filter((_, i) => i != index));
              }}
            />
          </Badge>
        ))}

        <Input
          id={id}
          placeholder={placeholder}
          autoFocus
          onKeyDown={handleKeyDown}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="text"
          className="w-auto h-10 focus-visible:ring-transparent inline border-none"
        />
      </div>
    </Label>
  );
};

export default TagInput;
