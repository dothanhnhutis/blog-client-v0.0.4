"use client";
import React, { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Loader2Icon, LockIcon, PlusIcon, UnlockIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { ProductFormType, Product } from "@/schemas/product";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import { Textarea } from "@/components/ui/textarea";
import { cn, generateSlug } from "@/lib/utils";
import { toast } from "sonner";
import TagInput from "./tag-input";
import { Category } from "@/schemas/category";
import { ProductImagesUpload } from "./product-images-upload";
import { CategoryDialog } from "./category-modal";
import TiptapEditor from "@/components/tiptap-editor";
import { User } from "@/schemas/user";
import { createProduct, editProduct } from "@/service/api/product";
import { UploadMutiple } from "./create/upload-custom";

type ProductFormProps = {
  currentUser: User;
  type: "create" | "edit";
  categories: Category[];
  product?: Product;
};

export const ProductForm = ({
  currentUser,
  type,
  categories,
  product,
}: ProductFormProps) => {
  if (type == "edit" && !product) throw new Error("Product is required");
  const router = useRouter();
  const [isLockSlug, setIsLockSlug] = React.useState<boolean>(true);
  // const ref = React.useRef<TipTapEditorHandle>(null);

  const [form, setForm] = React.useState<ProductFormType>(() => {
    if (type == "edit" && product) {
      const { id, createAt, updateAt, category, createdById, ...other } =
        product;
      return other;
    }
    return {
      images: [],
      video: null,
      productName: "",
      description: "",
      slug: "",
      code: "",
      categoryId:
        categories.length > 1 && type == "create" ? categories[0].id : "",
      benefits: [],
      ingredients: [],
      contentJson: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            attrs: {
              textAlign: "left",
            },
          },
        ],
      }),
      contentText: "",
      contentHTML: "",
      isActive: true,
    };
  });

  React.useEffect(() => {
    setForm((prev) => ({ ...prev, slug: generateSlug(prev.productName) }));
  }, [form.productName]);

  const [isPending, startTransistion] = useTransition();

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(async () => {
      if (type == "create") {
        createProduct(form)
          .then((data) => {
            if (data.statusCode == 201) {
              router.push("/manager/products");
              toast.success(data.message);
            } else {
              toast.success(data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        editProduct(product!.id, form)
          .then((data) => {
            if (data.statusCode == 200) {
              router.push("/manager/products");
              toast.success(data.message);
            } else {
              toast.success(data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <form onSubmit={handlerSubmit}>
      <div className="pb-4">
        <h2 className="font-semibold text-2xl">Media</h2>
        <UploadMutiple
          onchange={(images) => {
            setForm((prev) => ({
              ...prev,
              images: [...prev.images, ...images],
            }));
          }}
        >
          sdasd
        </UploadMutiple>
        <div className="grid xl:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-base mt-5">Product image</h3>
            <p className="text-muted-foreground text-xs">
              {`It's recommended to include at least 1 images to adequately your
          product.`}
            </p>
            <ProductImagesUpload
              images={form.images}
              onSave={(img) => {
                setForm((prev) => ({ ...prev, images: [...prev.images, img] }));
              }}
              onDelete={(at) => {
                setForm((prev) => ({
                  ...prev,
                  images: prev.images.filter((_, i) => i != at),
                }));
              }}
            />
          </div>
        </div>
      </div>

      <h2 className="font-semibold text-xl">Product Detail</h2>
      <div className="flex flex-wrap w-full gap-4 mt-4">
        <div className="flex flex-col space-y-1.5 col-span-2 md:col-auto w-full md:flex-[1_1_calc(50%-16px)]">
          <Label htmlFor="name">Name</Label>
          <Input
            value={form.productName}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                productName: e.target.value,
              }))
            }
            id="name"
            name="name"
            className="focus-visible:ring-transparent "
            placeholder="Name of your product"
          />
        </div>
        <div className="flex flex-col space-y-1.5 col-span-2 md:col-auto w-full md:flex-[1_1_calc(50%-16px)]">
          <Label htmlFor="code">Code</Label>
          <Input
            value={form.code}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                code: e.target.value,
              }))
            }
            id="code"
            name="code"
            className="focus-visible:ring-transparent "
            placeholder="Code"
          />
        </div>
        <div className="flex flex-col space-y-1.5 col-span-2 md:col-auto w-full md:flex-[1_1_calc(50%-16px)]">
          <Label htmlFor="slug">Slug</Label>
          <div className="flex gap-2">
            <Input
              disabled={isLockSlug}
              id="slug"
              name="slug"
              className="focus-visible:ring-transparent "
              placeholder="Name of your project"
              value={form.slug}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  slug: e.target.value,
                }))
              }
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsLockSlug(!isLockSlug)}
            >
              {!isLockSlug ? (
                <UnlockIcon className="w-4 h-4" />
              ) : (
                <LockIcon className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="flex flex-col space-y-1.5 col-span-2 md:col-auto w-full md:flex-[1_1_calc(50%-16px)]">
          <Label htmlFor="status">Active</Label>
          <div className="flex items-center justify-between h-full">
            <p className="text-xs font-light text-muted-foreground mt-1">
              Do you want product to be public?
            </p>
            <Switch
              id="status"
              checked={form.isActive}
              onCheckedChange={(checked) =>
                setForm((prev) => ({ ...prev, isActive: checked }))
              }
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1.5 col-span-2 md:col-auto w-full md:flex-[1_1_calc(50%-16px)]">
          <Label htmlFor="benefits">Benefits</Label>
          <TagInput
            id="benefits"
            placeholder="Add benefits"
            value={form.benefits}
            onChange={(data) => {
              setForm((prev) => ({ ...prev, benefits: data }));
            }}
          />
        </div>
        <div className="flex flex-col space-y-1.5 col-span-2 md:col-auto w-full md:flex-[1_1_calc(50%-16px)]">
          <Label htmlFor="benefits">Ingredients</Label>
          <TagInput
            id="ingredients"
            placeholder="Add ingredients"
            value={form.ingredients}
            onChange={(data) => {
              setForm((prev) => ({ ...prev, ingredients: data }));
            }}
          />
        </div>
        <div className="flex flex-col space-y-1.5 col-span-2 md:col-auto w-full md:flex-[1_1_calc(50%-16px)]">
          <Label>Created by</Label>
          <div className="flex items-center gap-2 border p-2 px-3 rounded-lg">
            <Avatar className="size-9">
              <AvatarImage src={AvatarDefault.src} alt="avatar" />
              <AvatarFallback>
                <Skeleton className="size-9 rounded-full" />
              </AvatarFallback>
            </Avatar>
            <div className="w-full overflow-hidden h-9">
              <p className="truncate text-sm">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {currentUser.email}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1.5 col-span-2 md:col-auto w-full md:flex-[1_1_calc(50%-16px)]">
          <Label htmlFor="category">Category</Label>
          <div className="flex gap-2">
            <Select
              onValueChange={(v) => {
                if (v !== "")
                  setForm((prev) => {
                    return { ...prev, categoryId: v };
                  });
              }}
              value={form.categoryId}
            >
              <SelectTrigger className="focus-visible:ring-transparent focus:ring-transparent text-start h-auto">
                <SelectValue className="h-10" placeholder="Select tag" />
              </SelectTrigger>
              <SelectContent id="categories">
                {categories.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    <div className="flex flex-col ">
                      <p>{t.name}</p>
                      <p className="text-xs">{t.slug}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <CategoryDialog categories={categories}>
              <Button
                disabled={isPending}
                variant="secondary"
                type="button"
                className="h-full"
              >
                <PlusIcon className="w-4 h-4" />
              </Button>
            </CategoryDialog>
          </div>
        </div>
        <div className="w-full">
          <Label>Short description</Label>
          <Textarea
            className="focus-visible:ring-offset-0 focus-visible:ring-transparent"
            value={form.description}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, description: e.target.value }));
            }}
            placeholder="Type your message here."
          />
        </div>
      </div>
      <div className="flex flex-col space-y-1.5 mt-4">
        <h3 className="font-semibold text-base mt-5">Product description</h3>
        <p className="text-muted-foreground text-xs">
          Recommended to provide a description of at least 500 characters long
          and addd image to help make purchasing decisions.
        </p>

        <TiptapEditor
          content={JSON.parse(form.contentJson)}
          onChange={(data) => {
            setForm((prev) => ({
              ...prev,
              contentJson: data.json,
              contentText: data.text,
              contentHTML: data.html,
            }));
          }}
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={() => router.back()} type="button" variant="outline">
          Cancel
        </Button>
        <Button
          disabled={
            form.images.length == 0 ||
            form.productName == "" ||
            form.code == "" ||
            form.slug == "" ||
            form.benefits.length == 0 ||
            form.ingredients.length == 0 ||
            form.description == "" ||
            form.contentText == ""
          }
          type="submit"
        >
          {isPending ? (
            <Loader2Icon
              className={cn(
                "h-4 w-4 animate-spin",
                type == "create" ? "mx-3.5" : "mx-2"
              )}
            />
          ) : type == "create" ? (
            "Create"
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </form>
  );
};
