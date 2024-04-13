import { Editor } from "@tiptap/react";
import { Button } from "../ui/button";
import {
  BoldIcon,
  Code2Icon,
  CodeIcon,
  ItalicIcon,
  StrikethroughIcon,
  TextQuoteIcon,
  UnderlineIcon,
} from "lucide-react";

export type ButtonType =
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | "code"
  | "codeBlock"
  | "blockquote"
  | "left"
  | "center"
  | "right"
  | "justify";

type ButtonActionType = {
  value: ButtonType;
  label: string;
  icon: React.JSX.Element;
  Run: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
};

const buttonActions: ButtonActionType[] = [
  {
    value: "bold",
    label: "Bold",
    icon: <BoldIcon className="h-5 w-5" />,
    isActive: (editor: Editor) => editor.isActive("bold"),
    Run: (editor: Editor) => {
      editor.chain().focus().toggleBold().run();
    },
  },
  {
    value: "italic",
    label: "Italic",
    icon: <ItalicIcon className="h-5 w-5" />,
    isActive: (editor: Editor) => editor.isActive("italic"),
    Run: (editor: Editor) => {
      editor.chain().focus().toggleItalic().run();
    },
  },
  {
    value: "underline",
    label: "Underline",
    icon: <UnderlineIcon className="h-5 w-5" />,
    isActive: (editor: Editor) => editor.isActive("underline"),
    Run: (editor: Editor) => {
      editor.chain().focus().toggleUnderline().run();
    },
  },
  {
    value: "strike",
    label: "Strike",
    icon: <StrikethroughIcon className="h-5 w-5" />,
    isActive: (editor: Editor) => editor.isActive("strike"),
    Run: (editor: Editor) => {
      editor.chain().focus().toggleStrike().run();
    },
  },
  {
    value: "blockquote",
    label: "Blockquote",
    icon: <TextQuoteIcon className="h-5 w-5" />,
    isActive: (editor: Editor) => editor.isActive("blockquote"),
    Run: (editor: Editor) => {
      editor.chain().focus().toggleBlockquote().run();
    },
  },
  {
    value: "code",
    label: "Code",
    icon: <CodeIcon className="h-5 w-5" />,
    isActive: (editor: Editor) => editor.isActive("code"),
    Run: (editor: Editor) => {
      editor.chain().focus().toggleCode().run();
    },
  },
  {
    value: "codeBlock",
    label: "Code Block",
    icon: <Code2Icon className="h-5 w-5" />,
    isActive: (editor: Editor) => editor.isActive("codeBlock"),
    Run: (editor: Editor) => {
      editor.chain().focus().toggleCodeBlock().run();
    },
  },
];

export const GroupButtonAction = ({ editor }: { editor: Editor }) => {
  return buttonActions.map((btn, index) => (
    <Button
      key={index}
      type="button"
      size="icon"
      onClick={() => btn.Run(editor)}
      variant={btn.isActive(editor) ? "secondary" : "ghost"}
      className="rounded-md"
    >
      {btn.icon}
    </Button>
  ));
};
