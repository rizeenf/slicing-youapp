import { z } from "zod";

export const UserRegisterSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    username: z
      .string()
      .min(6, { message: "Username must be at least 6 characters." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    cpassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Password should match",
    path: ["cpassword"],
  });
export type TUserRegisterSchema = z.infer<typeof UserRegisterSchema>;
