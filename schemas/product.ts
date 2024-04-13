import { z } from "zod";

export const productFormSchema = z.object({
  images: z.string().array(),
  video: z.string().nullable(),
  productName: z.string().min(1, "Product name can't be empty"),
  description: z.string({
    required_error: "description field is required",
    invalid_type_error: "description field must be string",
  }),
  slug: z.string().min(1, "Slug can't be empty"),
  code: z.string().min(1, "Code can't be empty"),
  categoryId: z.string({
    required_error: "categoryId field is required",
    invalid_type_error: "categoryId field must be string",
  }),
  benefits: z.string().array(),
  ingredients: z.string().array(),
  contentJson: z.string(),
  contentText: z.string(),
  contentHTML: z.string(),
  isActive: z.boolean().optional().default(true),
});

export type ProductFormType = z.infer<typeof productFormSchema>;
export type Product = ProductFormType & {
  id: string;
  category: {
    name: string;
    slug: string;
  };
  createdById: string;
  createdBy: {
    email: string;
    name: string;
    avatarUrl: string;
  };
  createAt: Date;
  updateAt: Date;
};

export type ProductQuery = {
  products: {
    id: string;
    slug: string;
    thumnail: string;
    productName: string;
    shortContent: string;
    category: {
      slug: string;
      name: string;
    };
    publishAt: string;
  }[];
  metadata: {
    hasNextPage: boolean;
    totalPage: number;
  };
};
