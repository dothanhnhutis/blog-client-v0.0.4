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
import { Button } from "@/components/ui/button";
import { LockIcon, PlusIcon } from "lucide-react";
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
        <div className="grid gap-4 lg:gap-8 md:grid-cols-2 lg:grid-cols-[1fr_1fr_400px]">
          <div className="w-full lg:col-span-2 grid ">
            <div className="lg:col-span-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                className="focus-visible:ring-transparent "
                placeholder="Name of your product"
              />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                className="focus-visible:ring-transparent "
                placeholder="Name of your product"
              />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                className="focus-visible:ring-transparent "
                placeholder="Name of your product"
              />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                className="focus-visible:ring-transparent "
                placeholder="Name of your product"
              />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                className="focus-visible:ring-transparent "
                placeholder="Name of your product"
              />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                className="focus-visible:ring-transparent "
                placeholder="Name of your product"
              />
            </div>
          </div>
          <div className="grid w-full grid-cols-3 min-[400px]:grid-cols-4 gap-3 my-4 order-first md:order-none">
            <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden bg-red-500">
              1
            </div>
            <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden bg-red-500">
              2
            </div>
            <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden bg-red-500">
              3
            </div>
            <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden bg-red-500">
              4
            </div>
            <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden bg-red-500">
              5
            </div>
            <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden bg-red-500">
              6
            </div>
            <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden bg-red-500">
              7
            </div>
            <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden bg-red-500">
              8
            </div>
            <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden bg-red-500">
              9
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
