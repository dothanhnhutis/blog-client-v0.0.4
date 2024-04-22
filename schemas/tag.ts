import { z } from "zod";

export const mutationTagSchema = z.object({
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

export type MutationTagPayload = z.infer<typeof mutationTagSchema>;
export type MutationTagResponse = {
  message: string;
  tag: MutationTagPayload & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type Tag = MutationTagResponse["tag"] & {
  _count: {
    post: number;
  };
};
