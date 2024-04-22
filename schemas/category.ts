import { z } from "zod";

export const mutationCategorySchema = z.object({
  name: z
    .string({
      required_error: "name field is required",
      invalid_type_error: "name field must be string",
    })
    .min(1, "name field must be at least 1 character"),
  slug: z
    .string({
      required_error: "slug field is required",
      invalid_type_error: "slug field must be string",
    })
    .min(1, "slug field must be at least 1 character"),
});

export type MutationCategoryPayload = z.infer<typeof mutationCategorySchema>;
export type MutationCategoryResponse = {
  message: string;
  category: MutationCategoryPayload & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type Category = MutationCategoryResponse["category"] & {
  _count: {
    product: number;
  };
};
