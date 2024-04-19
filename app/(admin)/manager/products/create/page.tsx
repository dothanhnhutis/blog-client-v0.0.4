import React from "react";
import { ProductForm } from "../product-form";
import { getAllCategory } from "@/service/api/category";
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
import { ProductLayout } from "./product-layout";
import { CreateProduct } from "./create";
import { UploadMutiple } from "./upload-custom";
const CreateProductPage = async () => {
  const [currentUser, categories] = await Promise.all([
    getCurrentUser(),
    getAllCategory(),
  ]);
  return (
    <>
      <ProductForm
        type="create"
        currentUser={currentUser!}
        categories={categories}
      />
      {/* <CreateProduct currentUser={currentUser!} categories={categories} /> */}
      {/* <ProductForm
        type="create"
        currentUser={currentUser!}
        categories={categories}
      />
      <div className="w-full xl:max-w-screen-xl xl:mx-auto p-4 overflow-hidden">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/manager">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbLink asChild>
              <Link href="/manager/products">Products</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center justify-between gap-2 my-2">
          <h2 className="lg:text-2xl font-bold text-lg">Manager Product</h2>
        </div>
        <ProductForm
          type="create"
          currentUser={currentUser!}
          categories={categories}
        />
      </div> */}
    </>
  );
};

export default CreateProductPage;
