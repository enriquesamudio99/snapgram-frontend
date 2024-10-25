import * as z from 'zod';

export const UpdateProfileValidation = z.object({
  name: z.string()
    .trim()
    .min(4, { message: "Name must be at least 4 characters long" }),
  username: z.string()
    .trim()
    .min(4, { message: "Username must be at least 4 characters long" }),
  email: z.string()
    .email(),
  images: z.custom<File>(),
  bio: z.string()
    .trim()
    .min(4, { message: "Bio must be at least 4 characters long" }),
});