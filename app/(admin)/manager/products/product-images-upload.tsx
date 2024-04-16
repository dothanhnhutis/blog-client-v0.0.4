import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { UploadPicture } from "@/components/upload-picture";
import Box1 from "@/images/icons/box1.png";
import Box2 from "@/images/icons/box2.png";
import Box3 from "@/images/icons/box3.png";
import Box4 from "@/images/icons/box4.png";
import Box5 from "@/images/icons/box5.png";
import Box6 from "@/images/icons/box6.png";
import Box7 from "@/images/icons/box7.png";
import Box8 from "@/images/icons/box8.png";
import { cn } from "@/lib/utils";
import { Edit, EyeIcon, ImageIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { UploadImageSingle } from "@/components/upload-image";

export const imageUploads: {
  alt: string;
  name: string;
  id: number;
  icon?: string;
}[] = [
  { alt: "Main image", name: "Upload image", id: 0 },
  { icon: Box1.src, alt: "Primary image", name: "Primary", id: 1 },
  { icon: Box2.src, alt: "Secondary image", name: "Secondary", id: 2 },
  {
    icon: Box3.src,
    alt: "Different angles",
    name: "Different angles",
    id: 3,
  },
  { icon: Box4.src, alt: "In use", name: "In use", id: 4 },
  { icon: Box5.src, alt: "Variations", name: "Variations", id: 5 },
  {
    icon: Box6.src,
    alt: "Styled scenes",
    name: "Styled scenes",
    id: 6,
  },
  { icon: Box7.src, alt: "Close-up", name: "Close-up", id: 7 },
  { icon: Box8.src, alt: "Size & Scale", name: "Size & Scale", id: 8 },
];

interface IProductImageProps {
  id: number;
  image?: string;
  isUpload?: boolean;
  name: string;
  alt: string;
  icon?: string;
  onSave?: (image: string) => void;
  onDelete?: () => void;
}

const ProductImage = ({
  id,
  alt,
  name,
  image,
  isUpload = false,
  onSave,
  onDelete,
  icon,
}: IProductImageProps) => {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  useEffect(() => {
    setLoading(false);
  }, [isLoading, setLoading]);

  if (image) {
    return isLoading ? (
      <Skeleton className="size-full" />
    ) : (
      <div className="relative group overflow-hidden">
        {/* <AspectRatio ratio={1 / 1}> */}
        <Image
          src={image}
          alt={alt}
          priority
          // fill
          width={600}
          height={600}
          // sizes="(min-width: 560px) 224px, calc(33.33vw - 40px)"
          className="object-contain rounded-md aspect-square"
        />
        {/* </AspectRatio> */}

        <div className="bg-black/50 absolute top-0 left-0 right-0 bottom-0 z-10 rounded-md invisible group-hover:visible">
          <div className="flex items-center justify-center h-full gap-1">
            <EyeIcon className="w-4 h-4" />
            <Edit className="w-4 h-4" />
            <TrashIcon
              onClick={onDelete}
              className="w-4 h-4 cursor-pointer flex-shrink-0 text-gray-300 dark:text-white"
            />
          </div>
        </div>
      </div>
    );
  }

  const element = (
    <div
      className={cn(
        "flex flex-col justify-center items-center text-center h-full",
        isUpload ? "gap-2" : ""
      )}
    >
      {isUpload ? (
        <ImageIcon className="size-6 flex-shrink-0 text-gray-400 dark:text-white" />
      ) : (
        <Image src={icon ?? Box1.src} alt={"alt"} width="64" height="64" />
      )}
      <p
        className={cn(
          id == 0
            ? "text-sm font-semibold"
            : "text-[#00000059] text-xs dark:text-white max-w-[80px] truncate"
        )}
      >
        {isUpload ? "Upload image" : name}
      </p>
      {id == 0 && (
        <ul className="list-disc text-start text-xs text-[#00000059] dark:text-white px-4 ml-4 hidden xs:block ">
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
      )}
    </div>
  );

  return isUpload ? (
    <UploadImageSingle title="Upload image" onchange={onSave}>
      <div
        className={cn(
          "size-full border-dashed border rounded-md",
          isUpload ? "cursor-pointer hover:border-primary" : ""
        )}
      >
        {element}
      </div>
    </UploadImageSingle>
  ) : (
    <div
      className={cn(
        "size-full border-dashed border rounded-md",
        isUpload ? "cursor-pointer hover:border-primary" : ""
      )}
    >
      {element}
    </div>
  );
};

interface IProductImagesUpload {
  images: string[];
  onSave?: (image: string) => void;
  onDelete?: (at: number) => void;
}
export const ProductImagesUpload = ({
  images,
  onSave,
  onDelete,
}: IProductImagesUpload) => {
  return (
    <div className="grid w-full min-h-[280px] min-w-[280px] max-w-[460px] grid-cols-3 xs:grid-cols-4 gap-3 my-4">
      {imageUploads.map((data, index) => (
        <div
          key={index}
          className="aspect-square size-full xs:first:col-span-2 xs:first:row-span-2 xs:first:size-56 overflow-hidden"
        >
          <ProductImage
            {...data}
            image={images[index]}
            onSave={onSave}
            onDelete={() => {
              onDelete && onDelete(index);
            }}
            isUpload={
              (!images[index] && images[index - 1] != undefined) || index == 0
            }
          />
        </div>
      ))}
    </div>
  );
};
