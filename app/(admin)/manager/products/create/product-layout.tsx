"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const ProductLayout = () => {
  return (
    <>
      <div className="sticky top-[73px] w-full backdrop-saturate-[1.8] backdrop-blur bg-background/50">
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
            <h2 className="lg:text-2xl font-bold text-lg">Manager Product</h2>
          </div>
        </div>
      </div>
      <div className="w-full xl:max-w-screen-xl xl:mx-auto p-4 overflow-hidden">
        <div className="grid w-full grid-cols-3 min-[400px]:grid-cols-4 gap-3 my-4 order-first md:order-none max-w-[460px]">
          <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden">
            1
          </div>
          <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden">
            2
          </div>
          <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden">
            3
          </div>
          <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden">
            4
          </div>
          <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden">
            5
          </div>
          <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden">
            6
          </div>
          <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden">
            7
          </div>
          <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden">
            8
          </div>
          <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden">
            9
          </div>
        </div>
      </div>
    </>
  );
};
