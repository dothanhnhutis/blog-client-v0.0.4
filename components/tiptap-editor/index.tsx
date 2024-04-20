"use client";
import React from "react";
import {
  Content,
  Editor,
  EditorContent,
  Extensions,
  useEditor,
} from "@tiptap/react";
import { DropdownNodeActions } from "./dropdown-action";
import { GroupButtonAction } from "./group-button-action";
import { LinkAction } from "./link-action";
import { MoreAction } from "./more-action";
import { ColorAction } from "./color-action";
import { InsertAction } from "./insert-action";
import { extensions as defaultExtensions } from "./extensions";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customExtension: {
      insertImage: () => ReturnType;
    };
  }
}

const TiptapEditor = ({
  content,
  extensions,
  onChange,
}: {
  content?: Content;
  extensions?: Extensions;
  onChange?: (data: { json: string; text: string; html: string }) => void;
}) => {
  const editor = useEditor({
    extensions: extensions ?? defaultExtensions,
    onUpdate: ({ editor }) => {
      if (onChange)
        onChange({
          json: JSON.stringify(editor.getJSON()),
          text: editor.getText(),
          html: editor.getHTML(),
        });
    },
    content: content ?? "<p></p>",
    editorProps: {
      handleDrop: function (view, event, slice, moved) {
        if (
          !moved &&
          event.dataTransfer &&
          event.dataTransfer.files &&
          event.dataTransfer.files[0]
        ) {
          // if dropping external files
          // handle the image upload
          return true; // handled
        }
        return false; // not handled use default behaviour
      },
    },
  });
  if (!editor) return;

  return (
    <div className="relative border rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 border-b p-2">
        <InsertAction editor={editor} />
        <DropdownNodeActions editor={editor} />
        <GroupButtonAction editor={editor} />
        <LinkAction editor={editor} />
        <ColorAction editor={editor} type="highlight" />
        <ColorAction editor={editor} type="textColor" />
        <MoreAction editor={editor} />
      </div>
      <EditorContent
        editor={editor}
        spellCheck={false}
        className={
          "flex leading-normal bg-background p-4 w-full min-h-[300px] max-h-[650px] overflow-y-scroll focus-visible:outline-0 focus-visible:ring-transparent"
        }
      />
    </div>
  );
};

export default TiptapEditor;
