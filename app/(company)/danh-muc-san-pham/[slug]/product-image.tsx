"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { ProductImageCarousel } from "./product-image-carousel";
type ProductImageWrapperProps = {
  images: string[];
};
export const ProductImage = ({ images }: ProductImageWrapperProps) => {
  let children = (
    <div className="flex items-center justify-center h-full">
      <p>Error Loading Thumnail</p>
    </div>
  );
  if (images.length == 1) {
    children = (
      <AspectRatio ratio={4 / 3} className="rounded-md overflow-hidden">
        <Image
          alt=""
          width={800}
          height={600}
          className="object-cover"
          sizes="100vw"
          src={images[0]}
        />
      </AspectRatio>
    );
  }
  if (images.length > 1) {
    children = <ProductImageCarousel images={images} />;
  }
  return (
    <div className="w-full relative sm:max-w-screen-sm overflow-hidden">
      {children}
    </div>
  );
};
