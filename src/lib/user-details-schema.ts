import { z } from "zod";

const GenderSchema = z.enum(["male", "female"], {
  errorMap: () => ({ message: "Please select your gender" }),
});
export const AboutSchema = z.object({
  displayName: z
    .string()
    .min(3, { message: "Display name must be at least 3 characters" }),
  gender: GenderSchema,
  birthday: z.string(),
  height: z.number().min(2, { message: "Please specify your height" }),
  weight: z.number().min(1, { message: "Please specify your weight" }),
});

export type TAboutSchema = z.infer<typeof AboutSchema>;
