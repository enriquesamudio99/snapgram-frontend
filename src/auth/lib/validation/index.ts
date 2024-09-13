import * as z from 'zod';

export const SignInValidation = z.object({
  email: z.string()
    .email(),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters.' })
});

export const SignUpValidation = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 4 characters.' }),
  username: z.string()
    .min(4, { message: 'Username must be at least 4 characters.' }),
  email: z.string()
    .email(),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z.string()
    .min(8, { message: 'Confirm Password must be at least 8 characters.' })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'], // Esto indica el campo donde se mostrará el mensaje de error
});;

