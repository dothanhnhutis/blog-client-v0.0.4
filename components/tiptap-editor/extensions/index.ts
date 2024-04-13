import { Extensions, mergeAttributes } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import Paragraph from "@tiptap/extension-paragraph";
import Blockquote from "@tiptap/extension-blockquote";
import OrderedList from "@tiptap/extension-ordered-list";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import TipTapLink from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import { ImageCustom as CustomImage } from "./image1";

type Levels = 1 | 2 | 3 | 4;

const classes: Record<Levels, string> = {
  1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ",
  2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
  3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  4: "scroll-m-20 text-xl font-semibold tracking-tight",
};

export const extensions: Extensions = [
  StarterKit.configure({
    paragraph: false,
    heading: false,
    bulletList: false,
    orderedList: false,
    blockquote: false,
    strike: false,
    code: false,
    codeBlock: false,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Heading.extend({
    renderHTML({ node, HTMLAttributes }) {
      const hasLevel = this.options.levels.includes(node.attrs.level);
      const level: Levels = hasLevel
        ? node.attrs.level
        : this.options.levels[0];

      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: `${classes[level]}`,
        }),
        0,
      ];
    },
  }),
  Paragraph.configure({
    HTMLAttributes: {
      class: "leading-7 [&:not(:first-child)]:mt-6",
    },
  }),
  BulletList.configure({
    keepMarks: true,
    keepAttributes: false,
    HTMLAttributes: {
      class: "my-6 ml-6 list-disc [&>li]:mt-2",
    },
  }),
  OrderedList.configure({
    keepMarks: true,
    keepAttributes: false,
    HTMLAttributes: {
      class: "my-6 ml-6 list-decimal [&>li]:mt-2",
    },
  }),
  Blockquote.configure({
    HTMLAttributes: {
      class: "mt-6 border-l-2 pl-6 italic",
    },
  }),
  Underline,
  Strike,
  Code.configure({
    HTMLAttributes: {
      class:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    },
  }),
  CodeBlock.configure({
    HTMLAttributes: {
      class: "bg-muted rounded-md p-4",
    },
  }),
  TipTapLink.configure({
    HTMLAttributes: {
      rel: "noopener noreferrer",
      target: null,
      class: "font-bold text-primary ",
    },
    openOnClick: false,
  }),
  Highlight.configure({
    multicolor: true,
  }),
  TextStyle,
  Color.configure({
    types: ["textStyle"],
  }),
  CustomImage,
];
