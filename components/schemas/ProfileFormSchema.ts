import { z } from 'zod';

export const ProfileFormSchema = z
	.object({
		fullName: z.string().min(2, { message: 'Name is required.' }),
		email: z.string().email({ message: 'Email is required.' }),
		password: z
			.string()
			.min(8, { message: 'Password is required.' })
			.optional()
			.or(z.literal('')),
		confirmPassword: z
			.string()
			.min(8, { message: 'Password is required.' })
			.optional()
			.or(z.literal('')),
		phone: z.string().min(11, { message: 'Phone is required.' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	});

export type ProfileFormType = z.infer<typeof ProfileFormSchema>;
