"use client";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
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
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { RotateCwIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
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
import { pick } from "lodash";
import { url } from "inspector";

export type AspectImageType = {
  label: string;
  value: number;
};

interface IUploadImageTipTap {
  id?: string;
  name?: string;
  image?: string;
  title: string;
  subTitle?: string;
  accept?: string;
  aspectRatios?: AspectImageType[] | number;
  onchange?: (image: string) => void;
  children?: React.ReactNode;
  className?: string;
}

const getAspectRatio = (url: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const img: HTMLImageElement = document.createElement("img");
    img.src = url;
    img.onload = function (event) {
      resolve(img.width / img.height);
    };
    img.onerror = reject;
  });
};

const getData = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = reject;
  });
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

export const UploadImageTipTap = ({
  id,
  image,
  title,
  subTitle,
  onchange,
  aspectRatios = defaultAspectImage,
  accept,
  children,
  className,
  ...other
}: IUploadImageTipTap) => {
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
    const aspectRatio = await getAspectRatio(imgUrl);
    setimageUpload(imgUrl);
    if (aspectRatio == 1) {
      if (!onchange) return;
      const data = await getData(file);
      onchange(data);
    } else {
      setOpen(true);
    }
  };

  const handleSave = () => {
    const cropper = cropperRef.current?.cropper;
    if (typeof cropper !== "undefined" && onchange) {
      onchange(cropper.getCroppedCanvas().toDataURL());

      // cropper.getCroppedCanvas().toBlob((blob) => {});
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

  const handleAspectRatio = (value: number) => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.setAspectRatio(value);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          URL.revokeObjectURL(imageUpload ?? "");
          setOpen(false);
        }
      }}
    >
      <AlertDialogTrigger asChild>
        <label htmlFor={id ?? "upload-avatar"} className={className}>
          {children}
          <input
            multiple
            onChange={handleUploadFile}
            className="hidden"
            type="file"
            id={id ?? "upload-avatar"}
            {...other}
          />
        </label>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {subTitle && (
            <AlertDialogDescription className="text-xs text-muted-foreground">
              {subTitle}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <div className="flex flex-col items-center rounded-lg bg-muted sm:items-start sm:rounded-none sm:bg-transparent sm:flex-row sm:gap-4 overflow-hidden ">
          <Cropper
            className="w-full cropperjs max-h-[400px] sm:max-w-[400px] sm:rounded-lg sm:overflow-hidden"
            aspectRatio={
              typeof aspectRatios == "number"
                ? aspectRatios
                : aspectRatios.length > 0
                ? aspectRatios[0].value
                : undefined
            }
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
              {typeof aspectRatios == "object" && aspectRatios.length > 0 && (
                <Select
                  defaultValue={aspectRatios[0].label}
                  onValueChange={(v) => {
                    handleAspectRatio(parseFloat(v));
                  }}
                >
                  <SelectTrigger className="w-[75px] focus-visible:ring-transparent focus:ring-transparent focus:ring-offset-0 bg-accent border-0 dark:border dark:bg-transparent ">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {aspectRatios.map((aspectRatio, index) => (
                        <SelectItem key={index} value={aspectRatio.label}>
                          {aspectRatio.label}
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
          <AlertDialogCancel onClick={() => {}}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave}>Upload</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

interface IUploadImageMutiple {
  id?: string;
  name?: string;
  image?: string;
  multiple?: boolean;
  title: string;
  subTitle?: string;
  accept?: string;
  aspectRatios?: AspectImageType[] | number;
  onchange?: (image: string) => void;
  children?: React.ReactNode;
  className?: string;
}

interface IDataUpload {
  name: string;
  size: number;
  type: string;
  url: string;
  aspectRatio: number;
}

export const UploadImageMutiple = ({
  id,
  image,
  title,
  subTitle,
  onchange,
  aspectRatios = defaultAspectImage,
  accept,
  children,
  className,
  ...other
}: IUploadImageMutiple) => {
  const [open, setOpen] = useState<boolean>(false);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [data, setData] = useState<IDataUpload[]>([]);
  const [indexEdit, setIndexEdit] = useState<number[]>([]);

  const [indexSelected, setIndexSelected] = useState<number>(0);

  const [dataEdited, setDataEdited] = useState<string[]>([]);

  const imageUpload = undefined;

  console.log(data);
  console.log(indexEdit);

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = [];
    for (let index = 0; index < e.target.files.length; index++) {
      files.push(e.target.files[index]);
    }
    e.target.value = "";
    if (!files.every((file) => file.type.includes("image"))) {
      toast.info("Please upload an image!");
      return;
    }
    const data: IDataUpload[] = [];
    const indexEdit: number[] = [];

    for (let index = 0; index < files.length; index++) {
      const url = URL.createObjectURL(files[index]);
      const aspectRatio = await getAspectRatio(url);

      if (typeof aspectRatios == "number") {
        if (aspectRatio != aspectRatios) {
          indexEdit.push(index);
        }
      } else {
        if (
          !aspectRatios
            .map((aspectRatio) => aspectRatio.value)
            .includes(aspectRatio)
        ) {
          indexEdit.push(index);
        }
      }

      data.push({
        ...pick(files[index], ["name", "size", "type"]),
        url,
        aspectRatio,
      });
    }

    setData(data);
    setIndexEdit(indexEdit);

    if (indexEdit.length > 0) {
      setOpen(true);
    } else {
      if (!onchange) return;
    }

    // const imgUrl = URL.createObjectURL(file);
    // const aspectRatio = await getAspectRatio(imgUrl);
    // setimageUpload(imgUrl);
    // if (aspectRatio == 1) {
    //   if (!onchange) return;
    //   const data = await getData(file);
    //   onchange(data);
    // } else {
    //   setOpen(true);
    // }
  };

  const handleSave = () => {
    const cropper = cropperRef.current?.cropper;
    if (typeof cropper !== "undefined" && onchange) {
      onchange(cropper.getCroppedCanvas().toDataURL());

      // cropper.getCroppedCanvas().toBlob((blob) => {});
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

  const handleAspectRatio = (value: number) => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.setAspectRatio(value);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          URL.revokeObjectURL(imageUpload ?? "");
          setOpen(false);
        }
      }}
    >
      <AlertDialogTrigger asChild>
        <label htmlFor={id ?? "upload-avatar"} className={className}>
          {children}
          <input
            multiple
            onChange={handleUploadFile}
            className="hidden"
            type="file"
            id={id ?? "upload-avatar"}
            {...other}
          />
        </label>
      </AlertDialogTrigger>
      <AlertDialogContent className=" sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg overflow-scroll">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {subTitle && (
            <AlertDialogDescription className="text-xs text-muted-foreground">
              {subTitle}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <div className="flex flex-col items-center rounded-lg bg-muted sm:items-start sm:rounded-none sm:bg-transparent sm:flex-row sm:gap-4 overflow-hidden ">
          <Cropper
            className="w-full cropperjs max-h-[400px] sm:max-w-[400px] sm:rounded-lg sm:overflow-hidden"
            aspectRatio={
              typeof aspectRatios == "number"
                ? aspectRatios
                : aspectRatios.length > 0
                ? aspectRatios[0].value
                : undefined
            }
            ref={cropperRef}
            dragMode="move"
            cropBoxMovable={false}
            viewMode={1}
            src={data[indexSelected]?.url}
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
              {typeof aspectRatios == "object" && aspectRatios.length > 0 && (
                <Select
                  defaultValue={aspectRatios[0].label}
                  onValueChange={(v) => {
                    handleAspectRatio(parseFloat(v));
                  }}
                >
                  <SelectTrigger className="w-[75px] focus-visible:ring-transparent focus:ring-transparent focus:ring-offset-0 bg-accent border-0 dark:border dark:bg-transparent ">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {aspectRatios.map((aspectRatio, index) => (
                        <SelectItem key={index} value={aspectRatio.label}>
                          {aspectRatio.label}
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
          {indexEdit.length == 1 ? (
            <>
              <AlertDialogCancel onClick={() => {}}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSave}>Upload</AlertDialogAction>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setIndexSelected(indexSelected - 1);
                }}
              >
                prev
              </Button>

              <Button
                onClick={() => {
                  setIndexSelected(indexSelected + 1);
                }}
              >
                next
              </Button>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
