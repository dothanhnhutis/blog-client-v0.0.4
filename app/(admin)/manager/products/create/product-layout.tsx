"use client";
import React, { useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  EditIcon,
  EyeIcon,
  ImageIcon,
  LockIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import TagInput from "../tag-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryDialog } from "../category-modal";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import Box1 from "@/images/icons/box1.png";
import Box2 from "@/images/icons/box2.png";
import Box3 from "@/images/icons/box3.png";
import Box4 from "@/images/icons/box4.png";
import Box5 from "@/images/icons/box5.png";
import Box6 from "@/images/icons/box6.png";
import Box7 from "@/images/icons/box7.png";
import Box8 from "@/images/icons/box8.png";

import { cn } from "@/lib/utils";
import { UploadMutiple } from "./upload-custom";

const imageUploads: IProductImageBox[] = [
  { icon: Box1.src, alt: "Primary image", name: "Primary" },
  { icon: Box2.src, alt: "Secondary image", name: "Secondary" },
  {
    icon: Box3.src,
    alt: "Different angles",
    name: "Different angles",
  },
  { icon: Box4.src, alt: "In use", name: "In use" },
  { icon: Box5.src, alt: "Variations", name: "Variations" },
  {
    icon: Box6.src,
    alt: "Styled scenes",
    name: "Styled scenes",
  },
  { icon: Box7.src, alt: "Close-up", name: "Close-up" },
  { icon: Box8.src, alt: "Size & Scale", name: "Size & Scale" },
];

interface IProductImageBox {
  alt: string;
  name: string;
  icon: string;
}

interface IProductImages extends IProductImageBox {
  src?: string;
  isUpload?: boolean;
  onSave?: (images: string[]) => void;
  onDelete?: () => void;
}

const ProductImage = ({
  src,
  icon,
  name,
  alt,
  isUpload,
  onDelete,
  onSave,
}: IProductImages) => {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  useEffect(() => {
    setLoading(false);
  }, [isLoading, setLoading]);

  if (src) {
    return isLoading ? (
      <Skeleton className="size-full" />
    ) : (
      <div className="relative group overflow-hidden border rounded-md">
        <Image
          src={src}
          alt={name}
          priority
          width={600}
          height={600}
          className="object-contain rounded-md aspect-square"
        />

        <div className="bg-black/50 absolute top-0 left-0 right-0 bottom-0 z-10 rounded-md invisible group-hover:visible">
          <div className="flex items-center justify-center h-full gap-1 text-white">
            <EyeIcon className="w-4 h-4" />
            <EditIcon className="w-4 h-4" />
            <TrashIcon
              className="w-4 h-4 cursor-pointer flex-shrink-0 "
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    );
  }
  const element = (
    <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden">
      <div
        className={cn(
          "flex flex-col justify-center items-center text-center h-full min-[400px]:gap-2 size-full border-dashed border rounded-md",
          isUpload ? "cursor-pointer hover:border-primary" : ""
        )}
      >
        {isUpload ? (
          <ImageIcon className="size-6 flex-shrink-0 text-gray-400 dark:text-white" />
        ) : (
          <Image
            src={icon}
            alt={alt}
            width="64"
            height="64"
            className="size-10 min-[400px]:size-16"
          />
        )}

        <p className="text-xs font-medium">
          {isUpload ? "Upload image" : name}
        </p>
      </div>
    </div>
  );
  return isUpload ? (
    <UploadMutiple multiple onchange={onSave}>
      {element}
    </UploadMutiple>
  ) : (
    element
  );
};

export const ProductLayout = () => {
  const status: string = "image";
  return (
    <>
      <div className="sticky top-[73px] w-full backdrop-saturate-[1.8] backdrop-blur bg-background/50 z-50">
        <div className="w-full xl:max-w-screen-xl xl:mx-auto p-4 overflow-hidden">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/manager">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbLink asChild>
                <Link href="/manager/products">Products</Link>
              </BreadcrumbLink>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center justify-between gap-2 my-2">
            <h2 className="lg:text-2xl font-bold text-lg">New Product</h2>
          </div>
        </div>
      </div>
      <div className="w-full xl:max-w-screen-xl xl:mx-auto p-4 overflow-hidden">
        <div className="bg-card max-w-[460px] p-4 rounded-lg">
          <h3 className="font-semibold text-base">Product image</h3>
          <p className="text-muted-foreground text-xs">
            {`It's recommended to include at least 1 images to adequately your
          product.`}
          </p>

          <div className="grid w-full grid-cols-3 min-[400px]:grid-cols-4 gap-3 mt-4">
            <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden">
              {true ? (
                <UploadMutiple
                  multiple
                  onchange={(images) => {
                    console.log(images);
                  }}
                >
                  <div className="flex flex-col justify-center items-center text-center h-full gap-2 size-full border-dashed border rounded-md cursor-pointer hover:border-primary">
                    <ImageIcon className="size-6 flex-shrink-0 text-muted-foreground" />
                    <p className="min-[400px]:hidden text-xs font-medium">
                      Upload image
                    </p>
                    <ul className="list-disc text-start text-xs text-muted-foreground px-4 ml-4 hidden min-[400px]:block ">
                      <li>
                        <p>Dimensions: 800 x 600px</p>
                      </li>
                      <li>
                        <p>Maximum file size: 5MB (Up to 9 files)</p>
                      </li>
                      <li>
                        <p>Format: JPG, JPEG, PNG</p>
                      </li>
                    </ul>
                  </div>
                </UploadMutiple>
              ) : (
                <div className="relative group overflow-hidden border rounded-md">
                  <Image
                    src={
                      "https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709949616/ich/fq8ermb2z4utdl9brroh.png"
                    }
                    alt={"dsds"}
                    priority
                    width={600}
                    height={600}
                    className="object-contain rounded-md aspect-square"
                  />

                  <div className="bg-black/50 absolute top-0 left-0 right-0 bottom-0 z-10 rounded-md invisible group-hover:visible">
                    <div className="flex items-center justify-center h-full gap-1">
                      <EyeIcon className="w-4 h-4" />
                      <EditIcon className="w-4 h-4" />
                      <TrashIcon className="w-4 h-4 cursor-pointer flex-shrink-0 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {imageUploads.map((img, i) => (
              <ProductImage
                key={i}
                {...img}
                isUpload
                onSave={(images) => {
                  console.log(images);
                }}
                onDelete={() => {
                  console.log(i + 1);
                }}
                src="https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709949616/ich/fq8ermb2z4utdl9brroh.png"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
