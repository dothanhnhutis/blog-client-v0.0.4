import React from "react";
import EditProfileForm from "./edit-profile";
import { getCurrentUser } from "@/service/api/user";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const EditProfilePage = async () => {
  const currentUser = await getCurrentUser();
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
            <BreadcrumbLink asChild>
              <Link href="/account/profile">Profile</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="lg:text-2xl font-bold text-lg">Edit Profile</h2>

      <EditProfileForm currentUser={currentUser!} />
    </div>
  );
};

export default EditProfilePage;
