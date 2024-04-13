import { Editor } from "@tiptap/react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { HighlighterIcon, PaletteIcon, XIcon } from "lucide-react";
import { RgbaColor, RgbaColorPicker } from "react-colorful";

const getRGBA = (textColor: string) => {
  const colorMatch = textColor.match(
    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
  );
  return colorMatch && colorMatch.length >= 4
    ? {
        r: Number(colorMatch[1]),
        g: Number(colorMatch[2]),
        b: Number(colorMatch[3]),
        a: Number(colorMatch[4] ?? 1),
      }
    : undefined;
};

export const ColorAction = ({
  editor,
  type,
}: {
  editor: Editor;
  type: "highlight" | "textColor";
}) => {
  const [color, setColor] = React.useState({ r: 255, g: 255, b: 255, a: 1 });
  const [open, setOpen] = React.useState<boolean>(false);

  editor.on("selectionUpdate", ({ editor }) => {
    if (
      editor.getAttributes("highlight").color ||
      editor.getAttributes("textStyle").color
    ) {
      const color =
        editor.getAttributes("highlight").color ||
        editor.getAttributes("textStyle").color;
      const convertColor = getRGBA(color) || {
        r: 255,
        g: 255,
        b: 255,
        a: 1,
      };
      setColor(convertColor);
    }
    setOpen(false);
  });

  const handleSetColor = (newColor: RgbaColor) => {
    setColor(newColor);
    if (type == "highlight") {
      editor.commands.setHighlight({
        color: `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`,
      });
    } else {
      editor.commands.setColor(
        `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`
      );
    }
  };
  const handleReset = () => {
    if (type == "highlight") {
      editor.commands.unsetHighlight();
    } else {
      editor.commands.unsetColor();
    }
    setColor({ r: 255, g: 255, b: 255, a: 1 });
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant={editor.isActive("highlight") ? "secondary" : "ghost"}
          className="rounded-md"
        >
          {type == "highlight" ? (
            <HighlighterIcon className="h-5 w-5" />
          ) : (
            <PaletteIcon className="h-5 w-5" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-auto space-y-2">
        <RgbaColorPicker color={color} onChange={handleSetColor} />
        <div className="flex gap-2 justify-between">
          <button
            className="rounded-md overflow-hidden"
            onClick={() => {
              handleSetColor({ r: 36, g: 86, b: 184, a: 1 });
            }}
          >
            <div className="size-5 bg-[#2456b8]"></div>
          </button>
          <button
            className="rounded-md overflow-hidden"
            onClick={() => {
              handleSetColor({ r: 255, g: 0, b: 0, a: 1 });
            }}
          >
            <div className="size-5 bg-[#ff0000]"></div>
          </button>
          <button
            className="rounded-md overflow-hidden"
            onClick={() => {
              handleSetColor({ r: 217, g: 249, b: 157, a: 1 });
            }}
          >
            <div className="size-5 bg-[#d9f99d]"></div>
          </button>
          <button
            className="rounded-md overflow-hidden"
            onClick={() => {
              handleSetColor({ r: 165, g: 243, b: 252, a: 1 });
            }}
          >
            <div className="size-5 bg-[#a5f3fc]"></div>
          </button>
          <button
            className="rounded-md overflow-hidden"
            onClick={() => {
              handleSetColor({ r: 165, g: 180, b: 252, a: 1 });
            }}
          >
            <div className="size-5 bg-[#a5b4fc]"></div>
          </button>
          <button
            className="rounded-md overflow-hidden "
            onClick={() => {
              handleSetColor({ r: 126, g: 211, b: 33, a: 1 });
            }}
          >
            <div className="size-5 bg-[#7ED321]"></div>
          </button>
          <button
            className="rounded-md overflow-hidden hover:bg-muted"
            onClick={handleReset}
          >
            <XIcon className="size-5" />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
