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
import { cn, generateSlug } from "@/lib/utils";
import { isEqual, pick } from "lodash";
import { MutationTagPayload, Tag } from "@/schemas/tag";
import { createTag, deleteTag, editTag } from "@/service/api/tag";
import { toast } from "sonner";

interface ITagDialog {
  children?: React.ReactNode;
  tags: Tag[];
}
type StatusType = "view" | "edit" | "create";
export const TagDialog = ({ children, tags }: ITagDialog) => {
  const [status, setStatus] = useState<StatusType>("view");
  // const [tagSelected, setTagSelected] = useState<Tag>(() => tags[0]);
  const [tagSelectedIndex, setTagSelectedIndex] = useState<number>(0);

  const [searchInput, setSearchInput] = useState<string>("");
  const [form, setForm] = useState<MutationTagPayload>(
    pick(tags[0], ["name", "slug"])
  );
  const handleOnchang = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [isPending, startTransistion] = useTransition();

  const handleSubmit = () => {
    startTransistion(() => {
      if (status == "edit") {
        if (!isEqual(form, pick(tags[tagSelectedIndex], ["name", "slug"])))
          editTag(tags[tagSelectedIndex].id, form)
            .then((data) => {
              if (data.statusCode == 200) {
                toast.success(data.message);
              } else {
                toast.error(data.message);
              }
            })
            .catch((error) => console.log(error));
      } else if (status == "create") {
        createTag(form)
          .then((data) => {
            if (data.statusCode == 201) {
              toast.success(data.message);
            } else {
              toast.error(data.message);
            }
          })
          .catch((error) => console.log(error));
      } else {
        deleteTag(tags[tagSelectedIndex].id)
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
          <DialogTitle>Tag Manager</DialogTitle>
        </DialogHeader>
        <div className="flex max-h-[500px] min-h-[400px] border">
          <div className="flex flex-col flex-[0_0_150px] sm:flex-[0_0_200px] h-full border-r overflow-hidden">
            <div className="flex items-center justify-center border m-2 rounded-lg p-1">
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search tag"
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
              {tags.filter(
                (tag) =>
                  tag.name.includes(searchInput) ||
                  tag.slug.includes(searchInput)
              ).length == 0 ? (
                <p className="text-center text-sm">Empty item</p>
              ) : (
                tags
                  .filter(
                    (tag) =>
                      tag.name.includes(searchInput) ||
                      tag.slug.includes(searchInput)
                  )
                  .map((tag, index) => (
                    <div
                      onClick={() => {
                        setTagSelectedIndex(index);
                        status == "edit" &&
                          setForm({ name: tag.name, slug: tag.slug });
                      }}
                      key={tag.id}
                      className={cn(
                        "p-2 rounded-lg",
                        index == tagSelectedIndex ? "bg-muted" : "border"
                      )}
                    >
                      <p className="line-clamp-2">{tag.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {tag.slug}
                      </p>
                    </div>
                  ))
              )}
            </div>
          </div>

          <div className="w-full">
            <div className="flex justify-between items-center border-b p-3">
              <p className=" font-medium text-sm">Tag Detail</p>
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
                        tags
                          .filter(
                            (tag) =>
                              status == "create" ||
                              (status == "edit" &&
                                tag.id != tags[tagSelectedIndex].id)
                          )
                          .find((tag) => tag.slug == form.slug)
                          ? "opacity-50"
                          : ""
                      )}
                      onClick={() => {
                        if (
                          tags
                            .filter(
                              (tag) =>
                                status == "create" ||
                                (status == "edit" &&
                                  tag.id != tags[tagSelectedIndex].id)
                            )
                            .find((tag) => tag.slug == form.slug)
                        ) {
                          return;
                        }
                        handleSubmit();
                      }}
                    />
                  )
                ) : (
                  tags[tagSelectedIndex] && (
                    <PencilIcon
                      className="size-4"
                      onClick={() => {
                        setForm({
                          name: tags[tagSelectedIndex].name,
                          slug: tags[tagSelectedIndex].slug,
                        });
                        setStatus("edit");
                      }}
                    />
                  )
                )}

                {tags[tagSelectedIndex]?._count.post == 0 &&
                  status == "view" &&
                  (isPending ? (
                    <Loader2Icon className={"h-4 w-4 animate-spin"} />
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
                    {tags[tagSelectedIndex]?.id ?? "N/A"}
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
                    {tags[tagSelectedIndex]?.name ?? "N/A"}
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

                        tags
                          .filter(
                            (tag) =>
                              status == "create" ||
                              (status == "edit" &&
                                tag.id != tags[tagSelectedIndex].id)
                          )
                          .find((tag) => tag.slug == form.slug)
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
                      <ShuffleIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <p className="font-medium truncate">
                    {tags[tagSelectedIndex]?.slug ?? "N/A"}
                  </p>
                )}
              </div>
              {status == "view" && (
                <div>
                  <Label className="text-sx font-normal">Amount</Label>
                  <p className="font-medium truncate">
                    {tags[tagSelectedIndex]?._count.post ?? "N/A"}
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
