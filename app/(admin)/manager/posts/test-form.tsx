"use client";

import React, { useTransition } from "react";
import Image from "next/image";
import {
  EditIcon,
  EyeIcon,
  ImageIcon,
  Loader2Icon,
  PlusIcon,
  ShuffleIcon,
  TrashIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import DatePicker, { getNow } from "@/components/date-picker";
import { User } from "@/schemas/user";
import { Tag } from "@/schemas/tag";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TagDialog } from "./tag-dialog";
import TiptapEditor from "@/components/tiptap-editor";
import { useRouter } from "next/navigation";
import { addHours, isPast } from "date-fns";
import { PostFormPayload } from "@/schemas/post";
import { UploadImage } from "@/components/upload-image";
import { cn, generateSlug } from "@/lib/utils";
import { toast } from "sonner";
import { createPost, editPost } from "@/service/api/post";
import { isEqual, omit } from "lodash";

type PostFormProps = {
  currentUser: User;
  authors: User[];
  tags: Tag[];
  post?: PostFormPayload & { id: string };
};
export const NewPostForm = ({
  currentUser,
  tags,
  authors,
  post,
}: PostFormProps) => {
  const router = useRouter();

  const [form, setForm] = React.useState<PostFormPayload>(() => {
    return post
      ? omit(post, ["id"])
      : {
          title: "",
          image: "",
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
      if (post) {
        editPost(post.id, form)
          .then((data) => {
            if (data.statusCode == 200) {
              toast.success(data.message);
              router.push("/manager/posts");
            } else {
              toast.error(data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        if (isPast(new Date(form.publishAt))) {
          toast.error("Publish At should be feature.");
        }
        createPost(form)
          .then((data) => {
            if (data.statusCode == 201) {
              toast.success(data.message);
              router.push("/manager/posts");
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
    <form
      onSubmit={handleSubmitForm}
      className="bg-card shadow rounded-lg p-4 overflow-hidden"
    >
      <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,_.75fr)_minmax(0,_1fr)] gap-4 ">
        <div className="col-span-2 lg:col-span-1">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="title">Featured Image</Label>
            {form.image ? (
              <div className="relative group border rounded-md overflow-hidden flex-shrink-0">
                <Image
                  className="object-contain aspect-[4/3]"
                  alt="Featured Image"
                  width={800}
                  height={600}
                  src={form.image}
                />
                <div className="bg-black/50 absolute top-0 left-0 right-0 bottom-0 z-10 rounded-md invisible group-hover:visible">
                  <div className="flex items-center justify-center h-full gap-1 text-white">
                    <EyeIcon className="w-4 h-4" />
                    <EditIcon className="w-4 h-4" />
                    <TrashIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setForm((prev) => ({ ...prev, image: "" }));
                      }}
                      className="w-4 h-4 cursor-pointer flex-shrink-0 "
                    />
                  </div>
                </div>
              </div>
            ) : (
              <UploadImage
                onchange={(images) => {
                  setForm((prev) => ({ ...prev, image: images[0] }));
                }}
              >
                <div className="flex flex-col justify-center items-center text-center p-4 gap-2 size-full border-dashed border rounded-md cursor-pointer hover:border-primary aspect-[4/3]">
                  <ImageIcon className="size-6 flex-shrink-0 text-muted-foreground" />
                  <p className="text-xs font-medium">Upload image</p>
                  <ul className="list-disc text-start text-xs text-muted-foreground px-4 ml-4">
                    <li>
                      <p>Dimensions: 800 x 600px</p>
                    </li>
                    <li>
                      <p>Maximum file size: 5MB</p>
                    </li>
                    <li>
                      <p>Format: JPG, JPEG, PNG</p>
                    </li>
                  </ul>
                </div>
              </UploadImage>
            )}
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1 flex gap-4 flex-col">
          <div className="flex flex-col space-y-1.5">
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
                <ShuffleIcon className="size-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="tag">Tag</Label>
            <div className="flex gap-2 items-center">
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
                    <PlusIcon className="size-4" />
                  </Button>
                </TagDialog>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Author</Label>

            {["ADMIN", "MANAGER"].includes(currentUser!.role!) ? (
              <Select
                disabled={isPending}
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
                  <p className="truncate">{currentUser?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {currentUser?.email}
                  </p>
                </div>
              </div>
            )}
          </div>
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
              disabled={(post && isPast(new Date(post.publishAt))) || isPending}
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
        <div className="col-span-2">
          <div className="flex flex-col space-y-1.5">
            <Label>Content</Label>
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
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={() => router.back()} type="button" variant="outline">
          Cancel
        </Button>

        <Button
          disabled={
            form.image == "" ||
            form.title == "" ||
            form.slug == "" ||
            form.contentText == "" ||
            (post &&
              isEqual(
                form,
                omit(post, ["id", "author", "tag", "createdAt", "updatedAt"])
              ))
          }
          type="submit"
        >
          {isPending ? (
            <Loader2Icon
              className={cn("h-4 w-4 animate-spin", !post ? "mx-3.5" : "mx-2")}
            />
          ) : !post ? (
            "Create"
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </form>
  );
};
