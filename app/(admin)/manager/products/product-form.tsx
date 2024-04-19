"use client";
import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  EditIcon,
  EyeIcon,
  ImageIcon,
  Loader2Icon,
  LockIcon,
  PlusIcon,
  TrashIcon,
  UnlockIcon,
} from "lucide-react";
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
import { ProductFormPayload, Product } from "@/schemas/product";
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

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Box1 from "@/images/icons/box1.png";
import Box2 from "@/images/icons/box2.png";
import Box3 from "@/images/icons/box3.png";
import Box4 from "@/images/icons/box4.png";
import Box5 from "@/images/icons/box5.png";
import Box6 from "@/images/icons/box6.png";
import Box7 from "@/images/icons/box7.png";
import Box8 from "@/images/icons/box8.png";
import Link from "next/link";

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

type ProductFormProps = {
  currentUser: User;
  categories: Category[];
  id?: string;
  product?: ProductFormPayload;
};

export const ProductForm = ({
  currentUser,
  categories,
  product,
  id,
}: ProductFormProps) => {
  const router = useRouter();
  const [isLockSlug, setIsLockSlug] = React.useState<boolean>(true);
  // const ref = React.useRef<TipTapEditorHandle>(null);

  const [form, setForm] = React.useState<ProductFormPayload>(() => {
    return (
      product || {
        images: [],
        video: null,
        productName: "",
        description: "",
        slug: "",
        code: "",
        categoryId: categories.length > 0 ? categories[0].id : "",
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
      }
    );
  });

  React.useEffect(() => {
    setForm((prev) => ({ ...prev, slug: generateSlug(prev.productName) }));
  }, [form.productName]);

  const [isPending, startTransistion] = useTransition();

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(async () => {
      if (!product) {
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
        editProduct(id, form)
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
        <h2 className="font-semibold text-2xl">Media</h2>
        <div className="bg-card max-w-[460px] p-4 rounded-lg">
          <h3 className="font-semibold text-base">Product image</h3>
          <p className="text-muted-foreground text-xs">
            {`It's recommended to include at least 1 images to adequately your
          product.`}
          </p>

          <div className="grid w-full grid-cols-3 min-[400px]:grid-cols-4 gap-3 mt-4">
            <div className="aspect-square size-full min-[400px]:first:col-span-2 min-[400px]:first:row-span-2 overflow-hidden">
              {form.images[0] ? (
                <div className="relative group overflow-hidden border rounded-md">
                  <Image
                    src={form.images[0]}
                    alt="Main image"
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
                        onClick={() => {
                          setForm((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, ix) => ix != 0),
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <UploadMutiple
                  multiple
                  onchange={(images) => {
                    if (images.length + form.images.length <= 9) {
                      setForm((prev) => ({
                        ...prev,
                        images: [...prev.images, ...images],
                      }));
                    } else {
                      toast("asdasdsa");
                    }
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
              )}
            </div>
            {imageUploads.map((img, i) => (
              <ProductImage
                key={i}
                {...img}
                src={form.images[i + 1]}
                isUpload={form.images[i] != undefined && !form.images[i + 1]}
                onSave={(images) => {
                  if (images.length + form.images.length <= 9) {
                    setForm((prev) => ({
                      ...prev,
                      images: [...prev.images, ...images],
                    }));
                  } else {
                    toast("asdasdsa");
                  }
                }}
                onDelete={() => {
                  setForm((prev) => ({
                    ...prev,
                    images: prev.images.filter((_, ix) => ix != i + 1),
                  }));
                }}
              />
            ))}
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
                className={cn("h-4 w-4 animate-spin", !id ? "mx-3.5" : "mx-2")}
              />
            ) : !id ? (
              "Create"
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};
