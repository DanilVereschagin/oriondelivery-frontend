import { z } from 'zod';

export const CommentFormSchema = z.object({
	comment: z
		.string()
		.min(10, { message: 'Комментарий обязателен. Не менее 10 символов' }),
});

export type CommentFormType = z.infer<typeof CommentFormSchema>;
