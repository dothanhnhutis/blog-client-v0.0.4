import React from "react";
import { ProductForm } from "../product-form";
import { getAllCategory } from "@/service/api/category";
import { getCurrentUser } from "@/service/api/user";
const CreateProductPage = async () => {
  const categories = await getAllCategory();
  return <ProductForm categories={categories} />;
};

export default CreateProductPage;
