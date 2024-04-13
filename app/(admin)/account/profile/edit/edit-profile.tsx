"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EditProfile, User } from "@/schemas/user";
import React, { useState, useTransition } from "react";
import { isEqual } from "lodash";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { editProfile } from "@/service/api/user";

const EditProfileForm = ({ currentUser }: { currentUser: User }) => {
  const router = useRouter();
  const [profile, setProfile] = useState<EditProfile>(() => {
    return {
      name: currentUser.name,
      phone: currentUser.phone,
      address: currentUser.address,
      bio: currentUser.bio,
    };
  });
  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [isPending, startTransistion] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(async () => {
      editProfile(profile)
        .then((data) => {
          if (data.statusCode == 200) {
            router.push("/account/profile");
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 overflow-y-scroll"
    >
      <div className="col-span-2 lg:col-span-1">
        <Label className="leading-snug text-muted-foreground">Your Name</Label>
        <Input
          disabled={isPending}
          value={profile.name ?? ""}
          onChange={handleOnchange}
          type="text"
          name="name"
          className="focus-visible:ring-transparent"
        />
      </div>

      <div className="col-span-2 lg:col-span-1">
        <Label className="leading-snug text-muted-foreground">Phone</Label>
        <Input
          disabled={isPending}
          value={profile.phone ?? ""}
          onChange={handleOnchange}
          name="phone"
          type="text"
          className="focus-visible:ring-transparent"
        />
      </div>

      <div className="col-span-2 ">
        <Label className="leading-snug text-muted-foreground">Address</Label>
        <Input
          disabled={isPending}
          value={profile.address ?? ""}
          onChange={handleOnchange}
          name="address"
          type="text"
          className="focus-visible:ring-transparent"
        />
      </div>
      <div className="col-span-2">
        <Label className="leading-snug text-muted-foreground">Bio</Label>
        <Textarea
          disabled={isPending}
          onChange={handleOnchange}
          name="bio"
          maxLength={255}
          className="focus-visible:ring-transparent"
          placeholder="Tell us a little bit about yourself"
          value={profile.bio ?? ""}
        />
      </div>
      <div className="col-span-2">
        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="lg"
            disabled={isPending || isEqual(currentUser, profile)}
          >
            {isPending ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
