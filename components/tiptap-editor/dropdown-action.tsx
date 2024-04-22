import React from "react";
import { Editor } from "@tiptap/react";
import {
  Check,
  ChevronDownIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  ListIcon,
  ListOrderedIcon,
  Pilcrow,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";

type DropdownNodeType =
  | "paragraph"
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "heading-4"
  | "bulletList"
  | "orderedList";

type DropdownNodeActionType = {
  value: DropdownNodeType;
  label: string;
  icon: React.JSX.Element;
  Run: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
};

type NodeGroupType = "hierarchy" | "lists";

const nodeIcons: Record<DropdownNodeType, JSX.Element> = {
  paragraph: <Pilcrow className="h-5 w-5" />,
  "heading-1": <Heading1Icon className="h-5 w-5" />,
  "heading-2": <Heading2Icon className="h-5 w-5" />,
  "heading-3": <Heading3Icon className="h-5 w-5" />,
  "heading-4": <Heading4Icon className="h-5 w-5" />,
  bulletList: <ListIcon className="h-5 w-5" />,
  orderedList: <ListOrderedIcon className="h-5 w-5" />,
};

const nodeList: Record<NodeGroupType, DropdownNodeActionType[]> = {
  hierarchy: [
    {
      value: "paragraph",
      label: "Paragraph",
      icon: <Pilcrow className="h-4 w-4" />,
      Run: (editor: Editor) => {
        if (editor.isActive("bulletList")) {
          editor.commands.toggleBulletList();
        } else if (editor.isActive("orderedList")) {
          editor.commands.toggleOrderedList();
        } else {
          editor.chain().focus().setParagraph().run();
        }
      },
      isActive: (editor: Editor): boolean => {
        return (
          !(editor.isActive("bulletList") || editor.isActive("orderedList")) &&
          (editor.isActive("codeBlock") || editor.isActive("paragraph"))
        );
      },
    },
    {
      value: "heading-1",
      label: "Heading 1",
      icon: <Heading1Icon className="h-4 w-4" />,
      Run: (editor: Editor) => {
        editor.chain().focus().toggleHeading({ level: 1 }).run();
      },
      isActive: (editor: Editor): boolean => {
        return editor.isActive("heading", { level: 1 });
      },
    },
    {
      value: "heading-2",
      label: "Heading 2",
      icon: <Heading2Icon className="h-4 w-4" />,
      Run: (editor: Editor) => {
        editor.chain().focus().toggleHeading({ level: 2 }).run();
      },
      isActive: (editor: Editor): boolean => {
        return editor.isActive("heading", { level: 2 });
      },
    },
    {
      value: "heading-3",
      label: "Heading 3",
      icon: <Heading3Icon className="h-4 w-4" />,
      Run: (editor: Editor) => {
        editor.chain().focus().toggleHeading({ level: 3 }).run();
      },
      isActive: (editor: Editor): boolean => {
        return editor.isActive("heading", { level: 3 });
      },
    },
    {
      value: "heading-4",
      label: "Heading 4",
      icon: <Heading4Icon className="h-4 w-4" />,
      Run: (editor: Editor) => {
        editor.chain().focus().toggleHeading({ level: 4 }).run();
      },
      isActive: (editor: Editor): boolean => {
        return editor.isActive("heading", { level: 4 });
      },
    },
  ],
  lists: [
    {
      value: "bulletList",
      label: "Bullet list",
      icon: <ListIcon className="h-4 w-4" />,
      Run: (editor: Editor) => {
        editor.chain().focus().toggleBulletList().run();
      },
      isActive: (editor: Editor): boolean => {
        return editor.isActive("bulletList");
      },
    },
    {
      value: "orderedList",
      label: "Numbered list",
      icon: <ListOrderedIcon className="h-4 w-4" />,
      Run: (editor: Editor) => {
        editor.commands.toggleOrderedList();
      },
      isActive: (editor: Editor): boolean => {
        return editor.isActive("orderedList");
      },
    },
  ],
};

export const DropdownNodeActions = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<DropdownNodeType>("paragraph");

  editor.on("selectionUpdate", ({ editor, transaction }) => {
    const temp = [...nodeList.hierarchy, ...nodeList.lists]
      .filter((a) => a.isActive(editor as Editor))
      .map((a) => a.value)[0];
    setValue(temp);
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between p-1 border-none bg-transparent"
        >
          {nodeIcons[value]}
          <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[170px] p-0">
        <Command className="rounded-lg shadow-md">
          <CommandList>
            <CommandGroup heading="Hierarchy">
              {nodeList.hierarchy.map((nodeData, index) => (
                <CommandItem
                  key={index}
                  value={nodeData.value}
                  onSelect={(value) => {
                    nodeData.Run(editor);
                    setValue(value as DropdownNodeType);
                    setOpen(false);
                  }}
                >
                  {nodeData.icon}
                  <span className="ml-2">{nodeData.label}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      nodeData.isActive(editor) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Lists">
              {nodeList.lists.map((nodeData, index) => (
                <CommandItem
                  key={index}
                  value={nodeData.value}
                  onSelect={(value) => {
                    nodeData.Run(editor);
                    setValue(value as DropdownNodeType);
                    setOpen(false);
                  }}
                >
                  {nodeIcons[nodeData.value]}
                  <span className="ml-2">{nodeData.label}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      nodeData.isActive(editor) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
