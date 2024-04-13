import {
  mergeAttributes,
  ReactNodeViewRenderer,
  Node as NodeTiptap,
} from "@tiptap/react";
import { ImageComponent } from "./image-component";
import { cn } from "@/lib/utils";

export const ImageCustom = NodeTiptap.create({
  name: "imageUpload",
  group: "block",
  content: "block*",
  draggable: true,
  addAttributes: () => ({
    src: {},
    alt: { default: null },
    title: { default: null },
    width: { default: 75 },
    alignment: { default: "center" },
  }),
  parseHTML() {
    return [{ tag: "image-upload" }];
  },
  renderHTML({ HTMLAttributes, node }) {
    return [
      "div",
      {
        class: cn(
          node.attrs.alignment == "center"
            ? "mx-auto"
            : node.attrs.alignment == "left"
            ? "mr-auto"
            : "ml-auto",
          node.attrs.width == 100
            ? "w-full"
            : node.attrs.width == 75
            ? "w-full sm:w-3/4"
            : node.attrs.width == 50
            ? "w-full sm:w-1/2"
            : "w-full sm:w-1/4"
        ),
      },
      [
        "div",
        {},
        [
          "image",
          mergeAttributes(HTMLAttributes, {
            class: "aspect-[3/2] object-cover block h-auto w-full max-w-full",
          }),
        ],
      ],
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },
  addCommands() {
    return {
      insertImage:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: "imageUpload",
            attrs: {
              title: "",
              alt: "",
              src: "",
            },
          });
        },
    };
  },
});
