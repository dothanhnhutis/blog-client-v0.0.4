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
  children?: React.ReactNode;
  onchange?: (image: string) => void;
  aspectRatio?: AspectImageType[] | number;
};

type DataFile = {
  file: File;
  aspectRatio: number;
  url: string;
};

export const UploadMutiple = ({
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
    if (files.length > 0) {
      const temp: number[] = [];
      files.forEach((file, index) => {
        if (typeof aspectRatio == "number" && aspectRatio == file.aspectRatio) {
          return;
        } else if (
          typeof aspectRatio == "object" &&
          aspectRatio.map((as) => as.value).includes(file.aspectRatio)
        ) {
          return;
        } else {
          temp.push(index);
        }
      });
      setIndexCroppers(temp);
    }
  }, [files, aspectRatio]);

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
    for (let index = 0; index < e.target.files.length; index++) {
      const imgUrl = URL.createObjectURL(e.target.files[index]);
      const as = await getAspectRatio(imgUrl);
      files.push({
        file: e.target.files[index],
        aspectRatio: as,
        url: imgUrl,
      });
    }
    e.target.value = "";
    setFiles(files);
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Cropper
            className="w-full cropperjs max-h-[400px] sm:max-w-[400px] sm:rounded-lg sm:overflow-hidden"
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

          <AlertDialogFooter>
            {currentIndex == indexCroppers[0] ? (
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            ) : (
              <Button>Prev</Button>
            )}

            {indexCroppers.length == 0 ? (
              <AlertDialogAction>Upload</AlertDialogAction>
            ) : (
              <Button>Next</Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
