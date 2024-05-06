import { z } from "zod";

export const createContactValidation = z
  .object({
    requestId: z.string({
      required_error: "requestId field is required",
      invalid_type_error: "requestId field must be string",
    }),
    name: z.string({
      required_error: "name field is required",
      invalid_type_error: "name field must be string",
    }),
    isReaded: z
      .boolean({
        invalid_type_error: "isReaded field must be boolean",
      })
      .default(false)
      .optional(),
    contactTag: z
      .enum(["NORMAL", "ARCHIVE", "JUNK", "TRASH"])
      .default("NORMAL")
      .optional(),
    email: z
      .string({
        required_error: "email field is required",
        invalid_type_error: "email field must be string",
      })
      .optional(),
    phone: z.string({
      required_error: "phone field is required",
      invalid_type_error: "phone field must be string",
    }),
    productName: z.string({
      required_error: "productName field is required",
      invalid_type_error: "productName field must be string",
    }),
    description: z.string({
      required_error: "description field is required",
      invalid_type_error: "description field must be string",
    }),
  })
  .strict();
export type CreateContact = z.infer<typeof createContactValidation>;
export type Contact = CreateContact & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type QueryContact = {
  isReaded?: string | undefined;
  contactTag?: string | undefined;
};
export type EditContact = {
  isReaded?: boolean | undefined;
  contactTag?: "NORMAL" | "ARCHIVE" | "JUNK" | "TRASH" | undefined;
};
