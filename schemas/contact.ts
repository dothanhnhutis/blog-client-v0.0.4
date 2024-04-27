import { z } from "zod";

export const createContactValidation = z
  .object({
    sessionId: z.string({
      required_error: "sessionId field is required",
      invalid_type_error: "sessionId field must be string",
    }),
    name: z.string({
      required_error: "name field is required",
      invalid_type_error: "name field must be string",
    }),
    isReaded: z
      .boolean({
        invalid_type_error: "isReaded field must be boolean",
      })
      .default(false),
    isDeleted: z
      .boolean({
        invalid_type_error: "isDeleted field must be boolean",
      })
      .default(false),
    contactType: z.enum(["BASE", "ARCHIVE", "JUNK"]).default("BASE"),
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
  contactType?: string | undefined;
  isDeleted?: string | undefined;
};
export type EditContact = {
  isReaded?: boolean | undefined;
  isDeleted?: boolean | undefined;
  contactType?: "BASE" | "ARCHIVE" | "JUNK" | undefined;
};
