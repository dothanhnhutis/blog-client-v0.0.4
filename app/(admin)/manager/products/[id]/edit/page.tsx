import React from "react";
import { ProductForm } from "../../product-form";
import { getAllCategory } from "@/service/api/category";
import { getProductByIdOrSlug } from "@/service/api/product";
import { notFound } from "next/navigation";
import { omit } from "lodash";
type EditProductPageProps = {
  params: { id: string };
};
const EditProductPage = async ({ params }: EditProductPageProps) => {
  const [categories, product] = await Promise.all([
    getAllCategory(),
    getProductByIdOrSlug(params.id),
  ]);
  if (!product) notFound();
  return (
    <ProductForm
      categories={categories}
      product={omit(product, [
        "category",
        "createdById",
        "createdBy",
        "createdAt",
        "updatedAt",
      ])}
    />
  );
};

export default EditProductPage;
