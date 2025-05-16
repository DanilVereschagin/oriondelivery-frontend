import { z } from 'zod';

export const PaymentFormSchema = z.object({
	fullName: z.string().min(2, { message: 'Name is required.' }),
	cardNumber: z
		.string()
		.min(16, { message: 'Card number is required.' })
		.max(16),
	expiryDate: z.string().min(5, { message: 'Expiry date is required.' }).max(5),
	cvv: z.string().min(3, { message: 'CVV is required.' }).max(3),
});

export type PaymentFormType = z.infer<typeof PaymentFormSchema>;
