import { z } from "zod";
const base64Regex =
  /^data:image\/(?:png|gif|png|jpg|jpeg|bmp|webp)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/g;
export const blogFormSchema = z.object({
  title: z
    .string({
      required_error: "title field is required",
      invalid_type_error: "title field must be string",
    })
    .min(1, "title field cann't empty"),
  thumnail: z
    .string({
      required_error: "thumnail field is required",
      invalid_type_error: "thumnail field must be url or image base64",
    })
    .superRefine((value, ctx) => {
      if (value.length == 0) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "thumnail not empty",
        });
      }

      if (
        !z.string().url().safeParse(value).success &&
        !z.string().regex(base64Regex).safeParse(value).success
      )
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "thumnail field must be url or image base64",
        });
    }),
  slug: z
    .string({
      required_error: "slug field is required",
      invalid_type_error: "slug field must be string",
    })
    .min(1, "slug field cann't empty")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "invalid slug"),
  contentJson: z.string({
    required_error: "contentJson field is required",
    invalid_type_error: "contentJson field must be string",
  }),
  contentText: z.string({
    required_error: "contentText field is required",
    invalid_type_error: "contentText field must be string",
  }),
  contentHTML: z.string({
    required_error: "contentHTML field is required",
    invalid_type_error: "contentHTML field must be string",
  }),
  tagId: z.string({
    required_error: "tagId field is required",
    invalid_type_error: "tagId field must be string",
  }),
  authorId: z.string({
    required_error: "authorId field is required",
    invalid_type_error: "authorId field must be string",
  }),
  isActive: z.boolean({
    required_error: "isActive field is required",
    invalid_type_error: "isActive field must be boolean",
  }),
  publishAt: z.string().datetime("invalid date"),
});

export type BlogFormType = z.infer<typeof blogFormSchema>;

export type Blog = BlogFormType & {
  id: string;
  tag: {
    slug: string;
    name: string;
  };
  author: {
    name: string;
    avatarUrl: string | null;
  };
  createAt: Date;
  updateAt: Date;
};

export type BlogQuery = {
  blogs: {
    id: string;
    slug: string;
    thumnail: string;
    title: string;
    shortContent: string;
    tag: {
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
