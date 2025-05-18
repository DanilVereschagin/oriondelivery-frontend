import { z } from 'zod';

export const RegistrationFormSchema = z
	.object({
		fullName: z.string().min(2, { message: 'Name is required.' }),
		email: z.string().email({ message: 'Email is required.' }),
		password: z.string().min(8, { message: 'Password is required.' }),
		confirmPassword: z.string().min(8, { message: 'Password is required.' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	});

export type RegistrationFormType = z.infer<typeof RegistrationFormSchema>;
