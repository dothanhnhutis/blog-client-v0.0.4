"use client";
import React, { useTransition } from "react";
import Image from "next/image";
import { useEditor } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { addHours, isEqual, isPast } from "date-fns";
import {
  ImageIcon,
  Loader2Icon,
  LockIcon,
  PlusIcon,
  ShuffleIcon,
  UnlockIcon,
  XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagDialog } from "./tag-dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import { User } from "@/schemas/user";
import { Tag } from "@/schemas/tag";
import { Blog, BlogFormType } from "@/schemas/blog";
import DatePicker, { getNow } from "@/components/date-picker";
import { cn, generateSlug } from "@/lib/utils";
import { UploadPicture } from "@/components/upload-picture";
import TiptapEditor from "@/components/tiptap-editor";
import { toast } from "sonner";
import { createBlog, editBlog } from "@/service/api/blog";
import { UploadImageSingle } from "@/components/upload-image";

type BlogFormProps = {
  currentUser: User;
  type: "create" | "edit";
  authors: User[];
  tags: Tag[];
  blog?: Blog;
};

const BlogForm1 = ({
  type,
  authors,
  tags,
  currentUser,
  blog,
}: BlogFormProps) => {
  if (type == "edit" && !blog) throw new Error("Blog is required");
  const router = useRouter();

  const [form, setForm] = React.useState<BlogFormType>(() => {
    if (type == "edit" && blog) {
      const { id, createAt, updateAt, tag, author, ...other } = blog;
      return other;
    }
    return {
      title: "",
      thumnail: "",
      slug: "",
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
      contentHTML: "<p></p>",
      contentText: "",
      tagId: tags.length > 0 ? tags[0].id : "",
      authorId: currentUser.id,
      isActive: true,
      publishAt: addHours(getNow(), 3).toISOString(),
    };
  });

  const [isPending, startTransistion] = useTransition();

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(async () => {
      if (type === "create") {
        if (isPast(new Date(form.publishAt))) {
          toast.error("Publish At should be feature.");
        }
        createBlog(form)
          .then((data) => {
            if (data.statusCode == 201) {
              toast.success(data.message);
              router.push("/manager/blogs");
            } else {
              toast.error(data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        editBlog(blog!.id, form)
          .then((data) => {
            if (data.statusCode == 200) {
              toast.success(data.message);
              router.push("/manager/blogs");
            } else {
              toast.error(data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="grid sm:grid-cols-3 gap-4 ">
        <div className="sm:col-span-1 sm:order-none">
          <div className="flex flex-col space-y-1.5 border rounded-lg p-6 bg-card">
            <h3 className="text-2xl font-semibold leading-none tracking-tight mb-4">
              Thumnail
            </h3>

            {form.thumnail ? (
              <div className="rounded-lg cursor-pointer relative">
                <Image
                  priority
                  alt="Product image"
                  className="aspect-[3/2] w-full rounded-md object-contain"
                  height="300"
                  src={form.thumnail}
                  width="300"
                />
                <Button
                  disabled={isPending}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setForm((prev) => ({ ...prev, thumnail: "" }));
                  }}
                  variant="ghost"
                  className="absolute top-0 right-0 p-1 h-auto bg-transparent "
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <UploadImageSingle
                aspectRatios={3 / 2}
                title="Thumnail"
                onchange={(data) => {
                  setForm((prev) => ({ ...prev, thumnail: data }));
                }}
                className="border-dashed text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 border-2 rounded-lg flex items-center justify-center cursor-pointer relative"
              >
                <div className="flex flex-col items-center justify-center gap-1 h-[300px]">
                  <ImageIcon className="size-16 justify-self-center self-center flex-shrink-0 text-gray-400 dark:text-white" />
                  <p className="text-sm font-semibold self-center">
                    Upload image
                  </p>
                  <ul className="list-disc text-xs text-[#00000059] dark:text-white px-4">
                    <li>
                      <p>Dimensions: 600 x 400 px</p>
                    </li>
                    <li>
                      <p>Maximum file size: 5MB</p>
                    </li>
                    <li>
                      <p>Format: JPG, JPEG, PNG</p>
                    </li>
                  </ul>
                </div>
              </UploadImageSingle>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:col-span-2 border rounded-lg p-6 bg-card">
          <div className="flex flex-col space-y-1.5 ">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Blog Details
            </h3>
          </div>
          <div className="flex flex-col space-y-1.5 ">
            <Label htmlFor="title">Title</Label>
            <Input
              disabled={isPending}
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              id="title"
              name="title"
              className="focus-visible:ring-transparent "
              placeholder="Name of your project"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="slug">Slug</Label>
            <div className="flex gap-2">
              <Input
                disabled={isPending}
                id="slug"
                name="slug"
                className="focus-visible:ring-transparent "
                placeholder="Slug"
                value={form.slug}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    slug: e.target.value,
                  }))
                }
              />
              <Button
                disabled={isPending}
                type="button"
                variant="secondary"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    slug: generateSlug(prev.title),
                  }))
                }
              >
                <ShuffleIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="tag">Tag</Label>
            <div className="flex gap-2">
              <Select
                disabled={isPending}
                onValueChange={(v) => {
                  if (v !== "")
                    setForm((prev) => {
                      return { ...prev, tagId: v };
                    });
                }}
                value={form.tagId}
              >
                <SelectTrigger className="focus-visible:ring-transparent focus:ring-transparent text-start h-auto">
                  <SelectValue className="h-10" placeholder="Select tag" />
                </SelectTrigger>
                <SelectContent id="tags">
                  {tags.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      <div className="flex flex-col ">
                        <p>{t.name}</p>
                        <p className="text-xs">{t.slug}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {["ADMIN", "MANAGER"].includes(currentUser.role) && (
                <TagDialog tags={tags}>
                  <Button
                    disabled={isPending}
                    variant="secondary"
                    type="button"
                    className="h-full"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </Button>
                </TagDialog>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Author</Label>

            {["ADMIN", "MANAGER"].includes(currentUser.role) ? (
              <Select
                //   disabled={isPending}
                onValueChange={(v) => {
                  if (v !== "")
                    setForm((prev) => {
                      return { ...prev, authorId: v };
                    });
                }}
                value={form.authorId}
              >
                <SelectTrigger className="focus-visible:ring-transparent focus:ring-transparent text-start h-auto">
                  <SelectValue placeholder="Select author" />
                </SelectTrigger>
                <SelectContent id="users">
                  <div>
                    {authors.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        <div className="flex items-center gap-2 ">
                          <Avatar>
                            <AvatarImage
                              src={u.avatarUrl ?? AvatarDefault.src}
                              alt="avatar"
                              className="z-[1]"
                            />
                            <Skeleton className="h-12 w-12 rounded-full" />
                          </Avatar>
                          <div className="w-full overflow-hidden">
                            <p className="truncate">{u.name}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {u.email}
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            ) : (
              <div className="flex items-center gap-2 border p-2 px-3 rounded-lg">
                <Avatar>
                  <AvatarImage
                    src={AvatarDefault.src}
                    alt="avatar"
                    className="z-[1]"
                  />
                  <Skeleton className="h-12 w-12 rounded-full" />
                </Avatar>
                <div className="w-full overflow-hidden h-10">
                  <p className="truncate">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {currentUser.email}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status">Active</Label>
              <div className="flex items-center justify-between space-y-1.5">
                <p className="text-sm font-light text-card-foreground mt-1">
                  Do you want blog to be public?
                </p>
                <Switch
                  disabled={isPending}
                  id="status"
                  checked={form.isActive}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({ ...prev, isActive: checked }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Publish At</Label>
              <DatePicker
                disabled={
                  (type == "edit" &&
                    blog &&
                    isPast(new Date(blog.publishAt))) ||
                  isPending
                }
                defaultDate={new Date(form.publishAt)}
                onSubmit={(date) => {
                  setForm((prev) => ({
                    ...prev,
                    publishAt: date.toISOString(),
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border rounded-lg p-6 bg-card mt-4">
        <h3 className="text-2xl font-semibold leading-none tracking-tight mb-4">
          Content
        </h3>
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
            form.thumnail == "" ||
            form.title == "" ||
            form.slug == "" ||
            form.contentText == ""
            // (type == "edit" &&
            //   isEqual(
            //     form,
            //     omit(blog, ["id", "author", "tag", "createAt", "updateAt"])
            //   ))
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

export default BlogForm1;
