import z from 'zod';

export const emailValidationSchema = z
  .string({ required_error: 'Email address is required!' })
  .email();
export const passwordValidationSchema = z
  .string({ required_error: 'Password is required!' })
  .min(6, 'Minimum 6 character is required!');

export const loginValidationSchema = z.object({
  body: z.object({
    email: emailValidationSchema,
    password: passwordValidationSchema,
  }),
});

export const signupValidationSchema = z.object({
  name: z
    .string({ required_error: 'Name is required!' })
    .min(2, 'Minimum 2 character is required!'),
  email: emailValidationSchema,
  password: passwordValidationSchema,
});
