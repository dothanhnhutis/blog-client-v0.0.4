import React from "react";
import { Editor } from "@tiptap/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  EllipsisVerticalIcon,
} from "lucide-react";
import { ButtonType } from "./group-button-action";

type ButtonActionType = {
  value: ButtonType;
  label: string;
  icon: React.JSX.Element;
  Run: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
};

const moreAction: ButtonActionType[] = [
  {
    value: "left",
    label: "Left",
    icon: <AlignLeftIcon className="h-5 w-5" />,
    isActive: (editor: Editor) => editor.isActive({ textAlign: "left" }),
    Run: (editor: Editor) => {
      editor.chain().focus().setTextAlign("left").run();
    },
  },
  {
    value: "center",
    label: "Center",
    icon: <AlignCenterIcon className="h-5 w-5" />,
    isActive: (editor: Editor) => editor.isActive({ textAlign: "center" }),
    Run: (editor: Editor) => {
      editor.chain().focus().setTextAlign("center").run();
    },
  },
  {
    value: "right",
    label: "Right",
    icon: <AlignRightIcon className="h-5 w-5" />,
    isActive: (editor: Editor) => editor.isActive({ textAlign: "right" }),
    Run: (editor: Editor) => {
      editor.chain().focus().setTextAlign("right").run();
    },
  },
  {
    value: "justify",
    label: "Justify",
    icon: <AlignJustifyIcon className="h-5 w-5" />,
    isActive: (editor: Editor) => editor.isActive({ textAlign: "justify" }),
    Run: (editor: Editor) => {
      editor.chain().focus().setTextAlign("justify").run();
    },
  },
];

export const MoreAction = ({ editor }: { editor: Editor }) => {
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
          <EllipsisVerticalIcon className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-auto">
        <div className="flex gap-2">
          {moreAction.map((more, index) => (
            <Button
              key={index}
              type="button"
              size="icon"
              onClick={() => more.Run(editor)}
              variant={more.isActive(editor) ? "secondary" : "ghost"}
              className="rounded-md"
            >
              {more.icon}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
