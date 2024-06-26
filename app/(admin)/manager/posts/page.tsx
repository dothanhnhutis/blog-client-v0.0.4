import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

import { getAllAuthor, getCurrentUser } from "@/service/api/user";
import DataTable from "./data-table";
import { getAllPost } from "@/service/api/post";
import { getAllTag } from "@/service/api/tag";
export const dynamic = "force-dynamic";
const UserManagerPage = async () => {
  const authors = await getAllAuthor();
  const currentUser = await getCurrentUser();
  const posts = await getAllPost();
  const tags = await getAllTag();
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
            <BreadcrumbPage>Posts</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between gap-2 my-2">
        <h2 className="lg:text-2xl font-bold text-lg">Manager Post</h2>
      </div>
      <DataTable
        currentUser={currentUser!}
        posts={posts}
        authors={authors}
        tags={tags}
      />
    </div>
  );
};

export default UserManagerPage;
