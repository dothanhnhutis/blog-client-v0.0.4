import { z } from "zod";
import { Role } from "./user";

export const siginSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string({
        invalid_type_error: "Password must be string",
        required_error: "Password is required",
      })
      .min(1, "Password is required"),
  })
  .strict();

export const signupSchema = z
  .object({
    name: z.string().min(1, "name_empty"),
    email: z.string().email("invaid_email"),
    password: z
      .string()
      .min(8, "password_too_small")
      .max(40, "password_too_big")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
        "password_format_error"
      ),
    code: z.string().length(6, "code_error"),
  })
  .strict();

export type SignInDataType = z.infer<typeof siginSchema>;
export type SignInResType = {
  message: string;
  user: {
    id: string;
    email: string;
    role: Role;
    name: string;
    isActive: boolean;
    avatarUrl: null | string;
  };
};

export interface IUser {
  id: string;
  email: string;
  role: Role;
  isActive: boolean;
  name: string;
  avatarUrl: null | string;
}

export interface ISignInRes {
  message: string;
  user: IUser | null;
}
