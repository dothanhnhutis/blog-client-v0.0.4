import React from "react";
import { ProductForm } from "../product-form";
import { getAllCategory } from "@/service/api/category";
import { getCurrentUser } from "@/service/api/user";
const CreateProductPage = async () => {
  const [currentUser, categories] = await Promise.all([
    getCurrentUser(),
    getAllCategory(),
  ]);
  return <ProductForm currentUser={currentUser!} categories={categories} />;
};

export default CreateProductPage;
