"use client";
import * as React from "react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { cn } from "@/lib/utils";

type ProductImageCarouselProps = {
  images: string[];
};

export const ProductImageCarousel = ({ images }: ProductImageCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [emblaMainApi, setEmblaMainApi] = React.useState<CarouselApi>();

  const onThumbClick = React.useCallback(
    (index: number) => {
      if (!emblaMainApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi]
  );

  const onSelect = React.useCallback(() => {
    if (!emblaMainApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, setSelectedIndex]);

  React.useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);
  return (
    <div className="flex flex-col gap-2">
      <Carousel setApi={setEmblaMainApi} className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <AspectRatio ratio={4 / 3} className="rounded-md overflow-hidden">
                <Image
                  alt=""
                  className="object-cover"
                  priority
                  sizes="100vw"
                  width={800}
                  height={600}
                  src={image}
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-0 w-full h-10 flex items-center justify-center gap-1">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full",
                selectedIndex == index ? "bg-primary" : "bg-accent"
              )}
              onClick={() => onThumbClick(index)}
            />
          ))}
        </div>
        <CarouselPrevious className="left-1" />
        <CarouselNext className="right-1" />
      </Carousel>
    </div>
  );
};
