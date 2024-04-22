"use client";
import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Loader2Icon,
  LockIcon,
  PencilIcon,
  PlusIcon,
  SaveIcon,
  ShuffleIcon,
  TrashIcon,
  UnlockIcon,
  XIcon,
  XSquareIcon,
} from "lucide-react";
import { toast } from "sonner";
import { cn, generateSlug } from "@/lib/utils";
import { isEqual, pick } from "lodash";
import { Category } from "@/schemas/category";
import {
  createCategory,
  deleteCategory,
  editCategory,
} from "@/service/api/category";

interface ICategoryDialog {
  children?: React.ReactNode;
  categories: Category[];
}
type StatusType = "view" | "edit" | "create";
export const CategoryDialog = ({ children, categories }: ICategoryDialog) => {
  const [status, setStatus] = useState<StatusType>("view");
  const [categorySelected, setCategorySelected] = useState<Category>(
    () => categories[0]
  );
  const [searchInput, setSearchInput] = useState<string>("");
  const [form, setForm] = useState<Pick<Category, "name" | "slug">>(
    pick(categories[0], ["name", "slug"])
  );
  const handleOnchang = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [isPending, startTransistion] = useTransition();

  const handleSubmit = () => {
    startTransistion(() => {
      if (status == "edit") {
        if (!isEqual(form, pick(categorySelected, ["name", "slug"]))) {
          editCategory(categorySelected.id, form)
            .then((data) => {
              if (data.statusCode == 200) {
                toast.success(data.message);
              } else {
                toast.error(data.message);
              }
            })
            .catch((error) => console.log(error));
        }
      } else if (status == "create") {
        createCategory(form)
          .then((data) => {
            if (data.statusCode == 201) {
              toast.success(data.message);
            } else {
              toast.error(data.message);
            }
          })
          .catch((error) => console.log(error));
      } else {
        deleteCategory(categorySelected.id)
          .then((data) => {
            if (data.statusCode == 200) {
              toast.success(data.message);
            } else {
              toast.error(data.message);
            }
          })
          .catch((error) => console.log(error));
      }
      setStatus("view");
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="md:max-w-screen-md lg:max-w-screen-md px-1 sm:p-6">
        <DialogHeader>
          <DialogTitle>Category Manager</DialogTitle>
        </DialogHeader>
        <div className="flex max-h-[500px] min-h-[400px] border">
          <div className="flex flex-col flex-[0_0_150px] sm:flex-[0_0_200px] h-full border-r overflow-hidden">
            <div className="flex items-center justify-center border m-2 rounded-lg p-1">
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search category"
                className="p-0 rounded-lg focus-visible:ring-transparent border-none w-full h-7"
              />
              {searchInput && (
                <XIcon
                  className="size-4 text-muted-foreground"
                  onClick={() => setSearchInput("")}
                />
              )}
            </div>
            <div className="size-full space-y-2 px-2 overflow-y-scroll pb-2">
              {categories.filter(
                (category) =>
                  category.name.includes(searchInput) ||
                  category.slug.includes(searchInput)
              ).length == 0 ? (
                <p className="text-center text-sm">Empty item</p>
              ) : (
                categories
                  .filter(
                    (category) =>
                      category.name.includes(searchInput) ||
                      category.slug.includes(searchInput)
                  )
                  .map((category) => (
                    <div
                      onClick={() => {
                        setCategorySelected(category);
                        status == "edit" &&
                          setForm({ name: category.name, slug: category.slug });
                      }}
                      key={category.id}
                      className={cn(
                        "p-2 rounded-lg",
                        category.id == categorySelected?.id
                          ? "bg-muted"
                          : "border"
                      )}
                    >
                      <p className="line-clamp-2">{category.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {category.slug}
                      </p>
                    </div>
                  ))
              )}
            </div>
          </div>

          <div className="w-full">
            <div className="flex justify-between items-center border-b p-3">
              <p className=" font-medium text-sm">Category Detail</p>
              <div className="flex gap-2 items-center justify-center">
                {status == "view" && (
                  <PlusIcon
                    className="size-4"
                    onClick={() => {
                      setForm({
                        name: "",
                        slug: "",
                      });
                      setStatus("create");
                    }}
                  />
                )}
                {status != "view" ? (
                  isPending ? (
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                  ) : (
                    <SaveIcon
                      className={cn(
                        "size-4",
                        categories
                          .filter(
                            (category) =>
                              status == "create" ||
                              (status == "edit" &&
                                category.id != categorySelected.id)
                          )
                          .find((category) => category.slug == form.slug)
                          ? "opacity-50"
                          : "cursor-pointer"
                      )}
                      onClick={() => {
                        if (
                          categories
                            .filter(
                              (category) =>
                                status == "create" ||
                                (status == "edit" &&
                                  category.id != categorySelected.id)
                            )
                            .find((category) => category.slug == form.slug)
                        ) {
                          return;
                        }
                        handleSubmit();
                      }}
                    />
                  )
                ) : (
                  <PencilIcon
                    className="size-4"
                    onClick={() => {
                      setForm({
                        name: categorySelected.name,
                        slug: categorySelected.slug,
                      });
                      setStatus("edit");
                    }}
                  />
                )}

                {categorySelected?._count.product == 0 &&
                  status == "view" &&
                  (isPending ? (
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                  ) : (
                    <TrashIcon className="size-4" onClick={handleSubmit} />
                  ))}
                {status != "view" && (
                  <XSquareIcon
                    className="size-4"
                    onClick={() => {
                      setStatus("view");
                    }}
                  />
                )}
              </div>
            </div>

            <div
              className={cn(
                "grid gap-4 mx-auto w-full sm:max-w-screen-sm p-4",
                status != "view" ? "" : "md:grid-cols-2"
              )}
            >
              {status == "view" && (
                <div>
                  <Label className="text-sx font-normal">ID</Label>
                  <p className="font-medium truncate">
                    {categorySelected?.id ?? "N/A"}
                  </p>
                </div>
              )}
              <div>
                <Label className="text-sx font-normal">Name</Label>
                {status != "view" ? (
                  <Input
                    disabled={isPending}
                    onChange={handleOnchang}
                    value={form.name}
                    name="name"
                    type="text"
                    placeholder="title"
                    className="focus-visible:ring-transparent"
                  />
                ) : (
                  <p className="font-medium truncate">
                    {categorySelected?.name ?? "N/A"}
                  </p>
                )}
              </div>
              <div>
                <Label className="text-sx font-normal">Slug</Label>
                {status != "view" ? (
                  <div className="flex gap-2">
                    <Input
                      disabled={isPending}
                      id="slug"
                      name="slug"
                      className={cn(
                        "focus-visible:ring-transparent",

                        categories
                          .filter(
                            (category) =>
                              status == "create" ||
                              (status == "edit" &&
                                category.id != categorySelected.id)
                          )
                          .find((category) => category.slug == form.slug)
                          ? "border-red-500"
                          : ""
                      )}
                      placeholder="Slug"
                      value={form.slug}
                      onChange={handleOnchang}
                    />
                    <Button
                      disabled={isPending}
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          slug: generateSlug(prev.name),
                        }))
                      }
                    >
                      <ShuffleIcon className="size-4" />
                    </Button>
                  </div>
                ) : (
                  <p className="font-medium truncate">
                    {categorySelected?.slug ?? "N/A"}
                  </p>
                )}
              </div>
              {status == "view" && (
                <div>
                  <Label className="text-sx font-normal">Amount</Label>
                  <p className="font-medium truncate">
                    {categorySelected?._count.product ?? "N/A"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
