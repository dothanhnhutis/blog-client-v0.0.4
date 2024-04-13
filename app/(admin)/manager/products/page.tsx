import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getCurrentUser } from "@/service/api/user";
import Link from "next/link";
import DataTable from "./data-table";
import { getAllProduct } from "@/service/api/product";
import { getAllCategory } from "@/service/api/category";
import SiderBarComponent from "@/components/sidebar-component";

const ProductPage = async () => {
  const [products, categories, currentUser] = await Promise.all([
    getAllProduct(),
    getAllCategory(),
    getCurrentUser(),
  ]);

  return (
    <div className="relative flex">
      <SiderBarComponent role={currentUser?.role || "CUSTOMER"} />
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
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center justify-between gap-2 my-2">
          <h2 className="lg:text-2xl font-bold text-lg">Manager Product</h2>
        </div>
        <DataTable categories={categories} products={products} />
      </div>
    </div>
  );
};

export default ProductPage;
