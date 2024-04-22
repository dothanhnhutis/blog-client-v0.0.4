"use client";
import React, { useId, useRef, useState } from "react";
import Image from "next/image";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { cn, getAspectRatio, getData } from "@/lib/utils";
import {
  AlignHorizontalDistributeCenterIcon,
  AlignHorizontalDistributeEndIcon,
  AlignHorizontalDistributeStartIcon,
  ImageIcon,
  RotateCwIcon,
  UploadIcon,
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import Cropper, { ReactCropperElement } from "react-cropper";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UploadImage } from "@/components/upload-image";

export const ImageComponent = (props: any) => {
  const handleUploadFile = (images: string[]) => {
    props.updateAttributes({
      src: images[0],
    });
  };

  const handleAlignment = (alignment: "center" | "left" | "right") => {
    props.updateAttributes({
      alignment,
    });
  };

  const handleWidth = (percent: number) => {
    props.updateAttributes({
      width: percent,
    });
  };

  return (
    <NodeViewWrapper>
      <div
        className={cn(
          props.node.attrs.alignment == "center"
            ? "mx-auto"
            : props.node.attrs.alignment == "left"
            ? "mr-auto"
            : "ml-auto",
          props.node.attrs.width == 100
            ? "w-full"
            : props.node.attrs.width == 75
            ? "w-3/4"
            : props.node.attrs.width == 50
            ? "w-1/2"
            : "w-1/4"
        )}
      >
        <div>
          {props.node.attrs.src ? (
            <Popover>
              <PopoverTrigger asChild>
                <Image
                  draggable="true"
                  data-drag-handle
                  contentEditable="false"
                  className="aspect-[3/2] object-cover block h-auto w-full max-w-full"
                  src={props.node.attrs.src}
                  alt={props.node.attrs.title}
                  width={600}
                  height={400}
                />
              </PopoverTrigger>
              <PopoverContent className="w-auto flex items-center justify-center gap-2 p-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleAlignment("left")}
                >
                  <AlignHorizontalDistributeStartIcon className="size-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleAlignment("center")}
                >
                  <AlignHorizontalDistributeCenterIcon className="size-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleAlignment("right")}
                >
                  <AlignHorizontalDistributeEndIcon className="size-5" />
                </Button>
                <Separator orientation="vertical" className="h-5" />
                <input
                  onChange={(e) => {
                    handleWidth(parseInt(e.target.value));
                  }}
                  value={props.node.attrs.width}
                  type="range"
                  step={25}
                  min={25}
                  max={100}
                />
                <span>{props.node.attrs.width}%</span>
                <Separator orientation="vertical" className="h-5" />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    props.deleteNode("imageUpload1");
                  }}
                >
                  <XIcon className="size-5" />
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <UploadImage onchange={handleUploadFile}>
              <div className="flex flex-col items-center justify-center gap-2 h-[400px] w-full border-2 border-dashed rounded-lg">
                <ImageIcon className="size-20 text-muted" />
                <div className="bg-foreground inline-flex gap-2 items-center justify-center w-auto text-background px-2 py-1 rounded-md">
                  <UploadIcon className="size-5" />
                  <p>Upload an image</p>
                </div>
              </div>
            </UploadImage>
          )}
        </div>
      </div>
    </NodeViewWrapper>
  );
};
