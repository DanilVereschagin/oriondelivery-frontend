import { z } from 'zod';

export const CheckoutFormSchema = z.object({
	fullName: z.string().min(2, { message: 'Name is required.' }),
	email: z.string().email({ message: 'Email is required.' }),
	phone: z.string().min(11, { message: 'Phone is required.' }),
	address: z.string().min(5, { message: 'Address is required.' }),
	comment: z.string().optional(),
});

export type CheckoutFormType = z.infer<typeof CheckoutFormSchema>;
