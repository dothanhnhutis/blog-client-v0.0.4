import React, { Suspense } from "react";
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
import { getAllBlog } from "@/service/api/blog";
import { getAllTag } from "@/service/api/tag";
import { Loading } from "@/components/loading";

const UserManagerPage = async () => {
  const [authors, currentUser, blogs, tags] = await Promise.all([
    getAllAuthor(),
    getCurrentUser(),
    getAllBlog(),
    getAllTag(),
  ]);

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
            <BreadcrumbPage>Blogs</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between gap-2 my-2">
        <h2 className="lg:text-2xl font-bold text-lg">Manager Blog</h2>
      </div>
      <Suspense fallback={<Loading />}>
        <DataTable
          currentUser={currentUser!}
          blogs={blogs}
          authors={authors}
          tags={tags}
        />
      </Suspense>
    </div>
  );
};

export default UserManagerPage;
