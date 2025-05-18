import { z } from 'zod';

export const LoginFormSchema = z.object({
	email: z.string().email({ message: 'Email is required.' }),
	password: z.string().min(8, { message: 'Password is required.' }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
