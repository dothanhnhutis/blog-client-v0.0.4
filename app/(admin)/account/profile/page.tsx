import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";

import { EditAvatar } from "./edit-avatar";
import { getCurrentUser } from "@/service/api/user";

const ProfilePage = async () => {
  const me = await getCurrentUser();
  return (
    <div className="w-full xl:max-w-screen-xl xl:mx-auto p-2 sm:p-4 overflow-hidden">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/account">Account</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="lg:text-2xl font-bold text-lg">Personal Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4 bg-background rounded-lg p-4">
        <EditAvatar me={me!} />
        <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
          <div>
            <Label>Name</Label>
            <p className=" text-muted-foreground">
              {me?.name.length == 0 ? "N/A" : me?.name}
            </p>
          </div>
          <div>
            <Label>Phone</Label>
            <p className=" text-muted-foreground">
              {me?.phone.length == 0 ? "N/A" : me?.phone}
            </p>
          </div>
          <div>
            <Label>Address</Label>
            <p className=" text-muted-foreground">
              {me?.address.length == 0 ? "N/A" : me?.address}
            </p>
          </div>
          <div className="block">
            <Label>Bio</Label>
            <p className=" text-muted-foreground line-clamp-3">
              {me?.bio.length == 0 ? "N/A" : me?.bio}
            </p>
          </div>
        </div>
        <div className="col-span-2 flex flex-col md:flex-row gap-2 justify-end">
          <Link
            href="/account/profile/edit"
            className="h-10 px-6 bg-primary rounded-md hover:opacity-80 inline-flex items-center justify-center text-sm font-medium text-white"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
