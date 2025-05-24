import { z } from 'zod';

export const PromocodeFormSchema = z.object({
	sale: z.string().min(1, { message: 'Скидка обязательна и не меньше 100.' }),
	code: z.string().min(8, { message: 'Код обязателен не менее 8 символов.' }),
	quantity: z
		.string()
		.min(1, { message: 'Количество обязательно и не меньше 1.' }),
});

export type PromocodeFormType = z.infer<typeof PromocodeFormSchema>;
