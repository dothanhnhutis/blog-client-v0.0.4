"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const featuredBlogsData = [
  {
    id: "tin-tuc-gia-cong",
    label: "Tin tức gia công",
    items: [
      {
        href: "/",
        alt: "Gia công mỹ phẩm tóc",
        label: "Gia công mỹ phẩm tóc 1",
        imageUrl:
          "https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709951204/ich/z2nq32hjytabp6k129au.jpg",
      },
      {
        href: "/",
        alt: "Gia công mỹ phẩm tóc",
        label: "Gia công mỹ phẩm tóc",
        imageUrl:
          "https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709951204/ich/z2nq32hjytabp6k129au.jpg",
      },
      {
        href: "/",
        alt: "Gia công mỹ phẩm tóc",
        label: "Gia công mỹ phẩm tóc",
        imageUrl:
          "https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709951204/ich/z2nq32hjytabp6k129au.jpg",
      },
      {
        href: "/",
        alt: "Gia công mỹ phẩm tóc",
        label: "Gia công mỹ phẩm tóc",
        imageUrl:
          "https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709951204/ich/z2nq32hjytabp6k129au.jpg",
      },
    ],
  },
  {
    id: "cam-nang-lam-dep",
    label: "Cẩm nang làm đẹp",
    items: [
      {
        href: "/",
        alt: "Gia công mỹ phẩm tóc",
        label: "Gia công mỹ phẩm tóc 2",
        imageUrl:
          "https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709951204/ich/z2nq32hjytabp6k129au.jpg",
      },
      {
        href: "/",
        alt: "Gia công mỹ phẩm tóc",
        label: "Gia công mỹ phẩm tóc",
        imageUrl:
          "https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709951204/ich/z2nq32hjytabp6k129au.jpg",
      },
      {
        href: "/",
        alt: "Gia công mỹ phẩm tóc",
        label: "Gia công mỹ phẩm tóc",
        imageUrl:
          "https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709951204/ich/z2nq32hjytabp6k129au.jpg",
      },
      {
        href: "/",
        alt: "Gia công mỹ phẩm tóc",
        label: "Gia công mỹ phẩm tóc",
        imageUrl:
          "https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709951204/ich/z2nq32hjytabp6k129au.jpg",
      },
    ],
  },
  {
    id: "huong dan lam my pham",
    label: "Hướng dẫn làm mỹ phẩm",
    items: [
      {
        href: "/",
        alt: "Gia công mỹ phẩm tóc",
        label: "Gia công mỹ phẩm tóc 3",
        imageUrl:
          "https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709951204/ich/z2nq32hjytabp6k129au.jpg",
      },
      {
        href: "/",
        alt: "Gia công mỹ phẩm tóc",
        label: "Gia công mỹ phẩm tóc",
        imageUrl:
          "https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709951204/ich/z2nq32hjytabp6k129au.jpg",
      },
      {
        href: "/",
        alt: "Gia công mỹ phẩm tóc",
        label: "Gia công mỹ phẩm tóc",
        imageUrl:
          "https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709951204/ich/z2nq32hjytabp6k129au.jpg",
      },
      {
        href: "/",
        alt: "Gia công mỹ phẩm tóc",
        label: "Gia công mỹ phẩm tóc",
        imageUrl:
          "https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709951204/ich/z2nq32hjytabp6k129au.jpg",
      },
    ],
  },
  {
    id: "kien-thuc-nguyen-lieu",
    label: "Kiến thức nguyên liệu",
    items: [
      {
        href: "/",
        alt: "Gia công mỹ phẩm tóc",
        label: "Gia công mỹ phẩm tóc 4",
        imageUrl:
          "https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709951204/ich/z2nq32hjytabp6k129au.jpg",
      },
      {
        href: "/",
        alt: "Gia công mỹ phẩm tóc",
        label: "Gia công mỹ phẩm tóc",
        imageUrl:
          "https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709951204/ich/z2nq32hjytabp6k129au.jpg",
      },
      {
        href: "/",
        alt: "Gia công mỹ phẩm tóc",
        label: "Gia công mỹ phẩm tóc",
        imageUrl:
          "https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709951204/ich/z2nq32hjytabp6k129au.jpg",
      },
      {
        href: "/",
        alt: "Gia công mỹ phẩm tóc",
        label: "Gia công mỹ phẩm tóc",
        imageUrl:
          "https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709951204/ich/z2nq32hjytabp6k129au.jpg",
      },
    ],
  },
];
export const BlogTabs = () => {
  const [featuredBlogsTap, setFeaturedBlogsTap] = React.useState<string>(
    featuredBlogsData[0].id
  );

  return (
    <Tabs value={featuredBlogsTap} className="w-full mt-5">
      <div className="flex justify-center px-2">
        <div className="flex gap-2 items-center overflow-x-scroll max-w-full">
          {featuredBlogsData.map((featuredArticle) => (
            <div
              key={featuredArticle.id}
              onClick={() => setFeaturedBlogsTap(featuredArticle.id)}
              className={cn(
                "inline-flex items-center px-2.5 py-0.5 font-semibold transition-colors flex-shrink-0 cursor-pointer",
                featuredBlogsTap == featuredArticle.id
                  ? "text-primary hover:opacity-80"
                  : "text-primary/50"
              )}
            >
              <p className="text-sm sm:text-base">Tin tức gia công</p>
            </div>
          ))}
        </div>
      </div>

      {featuredBlogsData.map((featuredArticle) => (
        <TabsContent
          key={featuredArticle.id}
          value={featuredArticle.id}
          className="px-2"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
            {featuredArticle.items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group shadow rounded-lg overflow-hidden"
              >
                <AspectRatio
                  ratio={4 / 3}
                  className="w-full rounded-lg overflow-hidden"
                >
                  <Image
                    priority
                    alt={item.alt}
                    fill
                    src={item.imageUrl}
                    className="object-cover"
                  />
                </AspectRatio>

                <div className="p-3 space-y-2">
                  <h4 className="group-hover:text-primary text-base font-medium line-clamp-2">
                    {item.label} Kinh nghiệm mở xưởng gia công mỹ phẩm từ A-Z
                    cho người mới
                  </h4>
                  <p className="text-sm line-clamp-2">
                    {item.label} Kinh nghiệm mở xưởng gia công mỹ phẩm từ A-Z
                    cho người mới
                  </p>
                  <p className="text-xs w-full text-end">01/01/2024</p>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
