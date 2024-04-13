"use client";
import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import asean from "@/images/documents/asean-2023-english.jpg";
import iso from "@/images/documents/iso-2023-english.png";
import fda from "@/images/documents/chung-nhan-FDA.jpg";
import sx from "@/images/documents/giay-chung-nhan-du-dieu-kien-sx.png";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const CertificateCarousel = () => {
  return (
    <Carousel
      opts={{
        loop: false,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4 bg-red-500">
        <CarouselItem className="basis-1/2 pl-4">
          <AspectRatio ratio={1275 / 1757}>
            <Image
              priority
              alt="asean"
              src={asean}
              fill
              sizes="(min-width: 1360px) 440px, (min-width: 640px) 30.43vw, 100vw"
              className="object-cover"
              placeholder="blur"
            />
          </AspectRatio>
        </CarouselItem>
        <CarouselItem className="basis-1/2 pl-4">
          <AspectRatio ratio={2550 / 3513}>
            <Image
              priority
              alt="iso"
              src={iso}
              fill
              sizes="(min-width: 1360px) 440px, (min-width: 640px) 30.43vw, 100vw"
              className="object-cover"
              placeholder="blur"
            />
          </AspectRatio>
        </CarouselItem>
        <CarouselItem className="basis-1/2 pl-4">
          <AspectRatio ratio={1276 / 1752}>
            <Image
              priority
              alt="fda"
              src={fda}
              fill
              sizes="(min-width: 1360px) 440px, (min-width: 640px) 30.43vw, 100vw"
              className="object-cover"
              placeholder="blur"
            />
          </AspectRatio>
        </CarouselItem>
        <CarouselItem className="basis-1/2 pl-4">
          <AspectRatio ratio={1168 / 850}>
            <Image
              priority
              alt="sx"
              src={sx}
              fill
              sizes="(min-width: 1360px) 1280px, calc(94.23vw + 17px)"
              className="object-cover"
              placeholder="blur"
            />
          </AspectRatio>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious tabIndex={-1} className="left-1" />
      <CarouselNext tabIndex={-1} className="right-1" />
    </Carousel>
  );
};
