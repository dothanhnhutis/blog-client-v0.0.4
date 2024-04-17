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
        <div className="grid gap-4 lg:gap-8 md:grid-cols-2 lg:grid-cols-[1fr_1fr_460px]">
          <div className="lg:col-span-2 flex flex-wrap w-full gap-4 mt-4 ">
            <div className="flex flex-col space-y-1.5 col-span-2 lg:col-auto w-full lg:flex-[1_1_calc(50%-16px)]">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                className="focus-visible:ring-transparent "
                placeholder="Name of your product"
              />
            </div>
            <div className="flex flex-col space-y-1.5 col-span-2 lg:col-auto w-full lg:flex-[1_1_calc(50%-16px)]">
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                name="code"
                className="focus-visible:ring-transparent "
                placeholder="Code"
              />
            </div>
            <div className="flex flex-col space-y-1.5 col-span-2 lg:col-auto w-full lg:flex-[1_1_calc(50%-16px)]">
              <Label htmlFor="slug">Slug</Label>
              <div className="flex gap-2">
                <Input
                  id="slug"
                  name="slug"
                  className="focus-visible:ring-transparent "
                  placeholder="Name of your project"
                />
                <Button type="button" variant="secondary">
                  <LockIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5 col-span-2 lg:col-auto w-full lg:flex-[1_1_calc(50%-16px)]">
              <Label htmlFor="status">Active</Label>
              <div className="flex items-center justify-between h-full">
                <p className="text-xs font-light text-muted-foreground mt-1">
                  Do you want product to be public?
                </p>
                <Switch
                  id="status"
                  //   checked={form.isActive}
                  //   onCheckedChange={(checked) =>
                  //     setForm((prev) => ({ ...prev, isActive: checked }))
                  //   }
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5 col-span-2 lg:col-auto w-full lg:flex-[1_1_calc(50%-16px)]">
              <Label htmlFor="benefits">Benefits</Label>
              <TagInput id="benefits" placeholder="Add benefits" />
            </div>
            <div className="flex flex-col space-y-1.5 col-span-2 lg:col-auto w-full lg:flex-[1_1_calc(50%-16px)]">
              <Label htmlFor="benefits">Ingredients</Label>
              <TagInput id="ingredients" placeholder="Add ingredients" />
            </div>
            <div className="flex flex-col space-y-1.5 col-span-2 lg:col-auto w-full lg:flex-[1_1_calc(50%-16px)]">
              <Label>Created by</Label>
              <div className="flex items-center gap-2 border p-2 px-3 rounded-lg">
                <Avatar className="size-9">
                  <AvatarImage src={AvatarDefault.src} alt="avatar" />
                  <AvatarFallback>
                    <Skeleton className="size-9 rounded-full" />
                  </AvatarFallback>
                </Avatar>
                <div className="w-full overflow-hidden h-9">
                  <p className="truncate text-sm">123123</p>
                  <p className="text-xs text-muted-foreground truncate">
                    1231231
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5 col-span-2 lg:col-auto w-full lg:flex-[1_1_calc(50%-16px)]">
              <Label htmlFor="category">Category</Label>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="focus-visible:ring-transparent focus:ring-transparent text-start h-auto">
                    <SelectValue className="h-10" placeholder="Select tag" />
                  </SelectTrigger>
                  <SelectContent id="categories">
                    <SelectItem value="123">
                      <div className="flex flex-col ">
                        <p>123</p>
                        <p className="text-xs">123</p>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <CategoryDialog
                  categories={[
                    {
                      id: "1",
                      _count: {
                        product: 1,
                      },
                      name: "11",
                      createAt: new Date(),
                      slug: "",
                      updateAt: new Date(),
                    },
                  ]}
                >
                  <Button
                    // disabled={isPending}
                    variant="secondary"
                    type="button"
                    className="h-full"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </Button>
                </CategoryDialog>
              </div>
            </div>
          </div>
          <div className="order-first md:order-none">
            <div className="grid w-full grid-cols-3 min-[400px]:grid-cols-4 gap-3 my-4 ">
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
      </div>
    </>
  );
};
