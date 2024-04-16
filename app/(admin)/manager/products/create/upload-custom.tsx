"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { getAspectRatio, getData } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Cropper, ReactCropperElement } from "react-cropper";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCwIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export type AspectImageType = {
  label: string;
  value: number;
};

const defaultAspectImage: AspectImageType[] = [
  {
    label: "1:1",
    value: 1,
  },
  {
    label: "4:3",
    value: 4 / 3,
  },
  {
    label: "3:4",
    value: 3 / 4,
  },
  {
    label: "16:9",
    value: 19 / 9,
  },
  {
    label: "9:16",
    value: 9 / 16,
  },
  {
    label: "3:2",
    value: 3 / 2,
  },
  {
    label: "2:3",
    value: 2 / 3,
  },
];

type UploadMutipleType = {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
  onchange?: (image: string) => void;
  aspectRatio?: AspectImageType[] | number;
};

type DataFile = {
  file: File;
  aspectRatio: number;
  url: string;
  base64?: string;
};

export const UploadMutiple = ({
  title,
  subTitle,
  aspectRatio = defaultAspectImage,
  onchange = () => {},
  children,
}: UploadMutipleType) => {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [files, setFiles] = useState<DataFile[]>([]);
  const [indexCroppers, setIndexCroppers] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (indexCroppers.length > 0) setOpen(true);
  }, [indexCroppers]);

  const handleOnchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    for (let index = 0; index < e.target.files.length; index++) {
      if (!e.target.files[index].type.includes("image")) {
        toast.info("Please upload an image!");
        return;
      }
    }
    const files: DataFile[] = [];
    const tempIndex = [];
    for (let index = 0; index < e.target.files.length; index++) {
      const url = URL.createObjectURL(e.target.files[index]);
      const as = await getAspectRatio(url);
      let base64: string | undefined;
      if (typeof aspectRatio == "number" && aspectRatio == as) {
        base64 = await getData(e.target.files[index]);
      } else if (
        typeof aspectRatio == "object" &&
        aspectRatio.map((as) => as.value).includes(as)
      ) {
        base64 = await getData(e.target.files[index]);
      } else {
        tempIndex.push(index);
      }

      files.push({
        file: e.target.files[index],
        aspectRatio: as,
        url,
        base64,
      });
    }
    e.target.value = "";
    setFiles(files);
    setIndexCroppers(tempIndex);
  };
  console.log(files);

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

  const handleAspectRatio = (value: number) => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.setAspectRatio(value);
    }
  };
  return (
    <>
      <label htmlFor={id}>
        {children}
        <input
          onChange={handleOnchange}
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          id={id}
        />
      </label>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg p-2 sm:p-3 lg:p-4">
          <AlertDialogHeader>
            {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
            {subTitle && (
              <AlertDialogDescription>{subTitle}</AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <div className="flex flex-col items-center rounded-lg bg-muted sm:items-start sm:rounded-none sm:bg-transparent sm:flex-row sm:gap-4 overflow-hidden">
            <Cropper
              className="w-full cropperjs h-[200px] sm:h-[300px] md:h-[400px] sm:max-w-[400px] sm:rounded-lg sm:overflow-hidden"
              aspectRatio={
                typeof aspectRatio == "number"
                  ? aspectRatio
                  : aspectRatio.length > 0
                  ? aspectRatio[0].value
                  : undefined
              }
              ref={cropperRef}
              dragMode="move"
              cropBoxMovable={false}
              viewMode={1}
              src={files[currentIndex]?.url}
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
                {typeof aspectRatio == "object" && aspectRatio.length > 0 && (
                  <Select
                    defaultValue={aspectRatio[0].label}
                    onValueChange={(v) => {
                      const aspectRatioSelected = aspectRatio.find(
                        (as) => as.label == v
                      );
                      if (!aspectRatioSelected) return;
                      handleAspectRatio(aspectRatioSelected.value);
                    }}
                  >
                    <SelectTrigger className="w-[75px] focus-visible:ring-transparent focus:ring-transparent focus:ring-offset-0 bg-accent border-0 dark:border dark:bg-transparent ">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {aspectRatio.map((as, index) => (
                          <SelectItem key={index} value={as.label}>
                            {as.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
                <div className="rounded-md h-10 flex items-center bg-accent dark:bg-transparent dark:border">
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
                  className="bg-accent border-0 dark:border dark:bg-transparent"
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
            {currentIndex == indexCroppers[0] ? (
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            ) : (
              <Button onClick={() => setCurrentIndex((prev) => prev - 1)}>
                Prev
              </Button>
            )}

            {indexCroppers.length == 0 ||
            currentIndex == indexCroppers.length - 1 ? (
              <AlertDialogAction>Upload</AlertDialogAction>
            ) : (
              <Button
                onClick={() => {
                  setCurrentIndex((prev) => prev + 1);
                }}
              >
                Next
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
