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

export const ImageComponent = (props: any) => {
  const uploadId = useId();
  const [open, setOpen] = useState<boolean>(false);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [imageUpload, setimageUpload] = useState<string | undefined>();

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      toast.info("Please upload an image!");
      return;
    }
    e.target.value = "";
    const imgUrl = URL.createObjectURL(file);
    setimageUpload(imgUrl);
    const aspectRatio = await getAspectRatio(imgUrl);
    if (aspectRatio == 3 / 2) {
      const data = await getData(file);
      URL.revokeObjectURL(imgUrl);
      props.updateAttributes({
        src: data,
      });
    } else {
      setOpen(true);
    }
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

  const handleSave = () => {
    const cropper = cropperRef.current?.cropper;
    if (typeof cropper !== "undefined") {
      props.updateAttributes({
        src: cropper.getCroppedCanvas().toDataURL(),
      });
    }
    URL.revokeObjectURL(imageUpload ?? "");
    setOpen(false);
  };

  const handleZoomIn = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.zoom(0.1);
    }
  };

  const handleZoomOut = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.zoom(-0.1);
    }
  };

  const handleRotate = (value: number) => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.rotate(90);
    }
  };

  const handleReset = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.reset();
    }
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
            <div className="flex flex-col items-center justify-center gap-2 h-[400px] w-full border-2 border-dashed rounded-lg">
              <ImageIcon className="size-20 text-muted" />
              <Label
                htmlFor={uploadId}
                className="bg-foreground inline-flex gap-2 items-center justify-center w-auto text-background px-2 py-1 rounded-md"
              >
                <UploadIcon className="size-5" />
                <p>Upload an image</p>
                <input
                  onChange={handleUploadFile}
                  type="file"
                  name="upload"
                  id={uploadId}
                  className="hidden"
                />
              </Label>
              <AlertDialog
                open={open}
                onOpenChange={(open) => {
                  if (!open) {
                    URL.revokeObjectURL(imageUpload ?? "");
                    setOpen(false);
                  }
                }}
              >
                <AlertDialogContent className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Insert Image</AlertDialogTitle>
                  </AlertDialogHeader>

                  <div className="flex flex-col items-center rounded-lg bg-muted sm:items-start sm:rounded-none sm:bg-transparent sm:flex-row sm:gap-4 overflow-hidden ">
                    <Cropper
                      className="w-full cropperjs max-h-[400px] sm:max-w-[400px] sm:rounded-lg sm:overflow-hidden"
                      aspectRatio={3 / 2}
                      ref={cropperRef}
                      dragMode="move"
                      cropBoxMovable={false}
                      viewMode={1}
                      src={imageUpload}
                      minCropBoxHeight={100}
                      minCropBoxWidth={100}
                      center={false}
                      zoomOnWheel={false}
                      background={false}
                      responsive={true}
                      autoCropArea={0.9}
                      checkOrientation={true}
                      guides={true}
                      toggleDragModeOnDblclick={false}
                    />
                    <div>
                      <Label className="text-right hidden sm:inline-block mb-2">
                        Basic
                      </Label>
                      <div className="flex flex-wrap items-center justify-center sm:items-start sm:justify-start gap-2 sm:gap-4">
                        <div className="rounded-md h-10 flex items-center dark:border">
                          <button
                            type="button"
                            className="px-3 py-2.5 disabled:opacity-50 h-full inline-flex items-center justify-center"
                            onClick={handleZoomOut}
                          >
                            <ZoomOutIcon className="w-4 h-4" />
                          </button>
                          <Separator orientation="vertical" className="h-4" />
                          <button
                            type="button"
                            className="px-3 py-2.5 disabled:opacity-50 h-full inline-flex items-center justify-center"
                            onClick={handleZoomIn}
                          >
                            <ZoomInIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          className="bg-transparent border-0 dark:border"
                          onClick={() => {
                            handleRotate(90);
                          }}
                        >
                          <RotateCwIcon className="w-4 h-4" />
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            handleReset();
                          }}
                        >
                          <p className="text-primary">Reset</p>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSave}>
                      Upload
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>
    </NodeViewWrapper>
  );
};
