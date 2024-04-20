"use client";

import React from "react";
import Image from "next/image";
import BlogForm1 from "../blog-form";
import { ImageIcon, PlusIcon, ShuffleIcon } from "lucide-react";
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
import DatePicker from "@/components/date-picker";
import { User } from "@/schemas/user";
import { Tag } from "@/schemas/tag";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TagDialog } from "../tag-dialog";
import TiptapEditor from "@/components/tiptap-editor";

type BlogFormProps = {
  currentUser: User;
  authors: User[];
  tags: Tag[];
};
export const NewPostForm = ({ currentUser, tags, authors }: BlogFormProps) => {
  return (
    <div className="grid sm:grid-flow-col sm:grid-cols-[1fr_0.7fr] gap-4">
      <div className="order-last sm:order-none bg-card rounded-lg p-4 overflow-hidden space-y-4">
        <div className="flex flex-col space-y-1.5 ">
          <Label htmlFor="title">Title</Label>
          <Input
            // disabled={isPending}
            // value={form.title}
            // onChange={(e) =>
            //   setForm((prev) => ({
            //     ...prev,
            //     title: e.target.value,
            //   }))
            // }
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
              //   disabled={isPending}
              id="slug"
              name="slug"
              className="focus-visible:ring-transparent "
              placeholder="Slug"
              //   value={form.slug}
              //   onChange={(e) =>
              //     setForm((prev) => ({
              //       ...prev,
              //       slug: e.target.value,
              //     }))
              //   }
            />
            <Button
              //   disabled={isPending}
              type="button"
              variant="secondary"
              //   onClick={() =>
              //     setForm((prev) => ({
              //       ...prev,
              //       slug: generateSlug(prev.title),
              //     }))
              //   }
            >
              <ShuffleIcon className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="tag">Tag</Label>
          <div className="flex gap-2">
            <Select
            //   disabled={isPending}
            //   onValueChange={(v) => {
            //     if (v !== "")
            //       setForm((prev) => {
            //         return { ...prev, tagId: v };
            //       });
            //   }}
            //   value={form.tagId}
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
                  //   disabled={isPending}
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
          <Label>Content</Label>
          <TiptapEditor
          // content={JSON.parse(form.contentJson)}
          // onChange={(data) => {
          //   setForm((prev) => ({
          //     ...prev,
          //     contentJson: data.json,
          //     contentText: data.text,
          //     contentHTML: data.html,
          //   }));
          // }}
          />
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 bg-card p-4 rounded-lg">
          <h3 className="font-semibold text-base">Featured Image</h3>
          {false ? (
            <div className="relative border rounded-md overflow-hidden flex-shrink-0">
              <Image
                className="object-contain aspect-[4/3]"
                alt="Featured Image"
                width={800}
                height={600}
                src="https://res.cloudinary.com/dr1ntj4ar/image/upload/v1709799295/ich/wncg5almjopwgeqe4oyb.jpg"
              />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center text-center p-4 gap-2 size-full border-dashed border rounded-md cursor-pointer hover:border-primary aspect-[4/3]">
              <ImageIcon className="size-6 flex-shrink-0 text-muted-foreground" />
              <p className="text-xs font-medium">Upload image</p>
              <ul className="list-disc text-start text-xs text-muted-foreground px-4 ml-4">
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
          )}
        </div>
        <div className="bg-card p-4 rounded-lg space-y-4">
          <div className="flex flex-col space-y-1.5">
            <Label>Author</Label>

            {["ADMIN", "MANAGER"].includes(currentUser!.role!) ? (
              <Select
              //   disabled={isPending}
              // onValueChange={(v) => {
              //   if (v !== "")
              //     setForm((prev) => {
              //       return { ...prev, authorId: v };
              //     });
              // }}
              // value={form.authorId}
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
                //   disabled={isPending}
                id="status"
                //   checked={form.isActive}
                //   onCheckedChange={(checked) =>
                //     setForm((prev) => ({ ...prev, isActive: checked }))
                //   }
              />
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Publish At</Label>
            <DatePicker
              // disabled={
              //   (type == "edit" &&
              //     blog &&
              //     isPast(new Date(blog.publishAt))) ||
              //   isPending
              // }
              // defaultDate={new Date(form.publishAt)}
              onSubmit={(date) => {
                // setForm((prev) => ({
                //   ...prev,
                //   publishAt: date.toISOString(),
                // }));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
