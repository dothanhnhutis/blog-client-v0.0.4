import React from "react";
import { Loading } from "@/components/loading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
const UserManagerLoadingPage = () => {
  return (
    <div className="w-full xl:max-w-screen-xl xl:mx-auto p-4 overflow-hidden">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/manager">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Users</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between gap-2 my-2">
        <h2 className="lg:text-2xl font-bold text-lg">Manager User</h2>
      </div>

      <Loading />
    </div>
  );
};

export default UserManagerLoadingPage;
