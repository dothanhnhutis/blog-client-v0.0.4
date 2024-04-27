import { z } from "zod";
export const roles = [
  "ADMIN",
  "MANAGER",
  "SALER",
  // "Accountance",
  // "ResearchAndDevelopment",
  // "Paperworker",
  "WRITER",
  "CUSTOMER",
] as const;
export const createUserSchema = z.object({
  email: z
    .string({
      required_error: "email field is required",
      invalid_type_error: "email field must be string",
    })
    .email("Invalid email"),
  isActive: z.boolean({
    required_error: "isActive field is required",
    invalid_type_error: "isActive field must be boolean",
  }),
  role: z.enum(roles),
  name: z.string({
    required_error: "name field is required",
    invalid_type_error: "name field must be string",
  }),
  password: z.string({
    required_error: "password field is required",
    invalid_type_error: "password field must be string",
  }),
});

export const editUserSchema = createUserSchema
  .omit({ email: true, password: true })
  .extend({
    bio: z
      .string({
        required_error: "bio field is required",
        invalid_type_error: "bio field must be string",
      })
      .max(255, "bio_length_error"),
    phone: z.string({
      required_error: "phone field is required",
      invalid_type_error: "phone field must be string",
    }),
    avatarUrl: z
      .string({
        required_error: "avatarUrl field is required",
        invalid_type_error: "avatarUrl field must be string",
      })
      .nullable(),
    address: z.string({
      required_error: "address field is required",
      invalid_type_error: "address field must be string",
    }),
  })
  .partial();

export type CreateUserType = z.infer<typeof createUserSchema>;
export type EditUserType = z.infer<typeof editUserSchema>;
export type Role = CreateUserType["role"];

export type User = Omit<CreateUserType, "password"> &
  Required<EditUserType> & {
    id: string;
    createdAt: string;
    updatedAt: string;
  };

export type EditProfile = {
  password?: string | undefined;
  name?: string | undefined;
  bio?: string | undefined;
  phone?: string | undefined;
  avatarUrl?: string | null | undefined;
  address?: string | undefined;
};
