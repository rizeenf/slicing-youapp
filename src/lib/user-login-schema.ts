import { z } from "zod";

export const UserSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Username or email must be at least 6 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export type TUserSchema = z.infer<typeof UserSchema>;
