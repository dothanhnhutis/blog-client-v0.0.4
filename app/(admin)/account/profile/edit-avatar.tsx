"use client";
import React from "react";

import AvatarDefault from "@/images/avatars/user-1.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { PencilIcon, TrashIcon, UploadIcon } from "lucide-react";
import { toast } from "sonner";
import { User } from "@/schemas/user";
import { useRouter } from "next/navigation";
import { editProfile } from "@/service/api/user";
import { UploadImage } from "@/components/upload-image";

export const EditAvatar = ({ me }: { me: User }) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center col-span-2 md:col-span-1">
      <div className="relative group ">
        <Avatar className="size-80 aspect-square rounded-lg">
          <AvatarImage src={me?.avatarUrl ?? AvatarDefault.src} />
          <AvatarFallback className="bg-transparent">
            <Skeleton className="size-80 aspect-square rounded-lg" />
          </AvatarFallback>
        </Avatar>
        <div className="group-hover:bg-black/30 text-white invisible group-hover:visible absolute top-0 left-0 size-80 aspect-square rounded-lg flex items-center justify-center gap-2">
          <UploadImage
            aspectRatio={[
              {
                label: "1:1",
                value: 1,
              },
            ]}
            title="Edit Avatar"
            onchange={(images) => {
              editProfile({ avatarUrl: images[0] })
                .then((data) => {
                  if (data.statusCode == 200) {
                    router.push("/account/profile");
                    toast.success("Edit avatar success");
                  } else {
                    toast.error(data.message);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            <UploadIcon className="size-4" />
          </UploadImage>
          <PencilIcon className="size-4" />
          {me?.avatarUrl && (
            <button>
              <TrashIcon className="size-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
