import * as z from 'zod';

export const CreatePostValidation = z.object({
  caption: z.string()
    .trim()
    .min(3, { message: "Caption must be at least 3 characters long" }),
  images: z.array(z.custom<File>())
    .nonempty({ message: "You must upload at least one image" })
    .max(10, { message: "Maximum 10 images" }),
  location: z.string()
    .trim()
    .min(1, { message: "Location must be at least 1 character long" }),
  tags: z.string(),
});