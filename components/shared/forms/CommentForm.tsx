'use client';

import {
	CommentFormSchema,
	CommentFormType,
} from '@/components/schemas/CommentFormSchema';
import { Button } from '@/components/ui';
import { FormTextarea } from '@/components/ui/form';
import { createFeedback } from '@/shared/actions/actions';
import { cn } from '@/shared/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
	productId: number;
	className?: string;
}

export const CommentForm: React.FC<Props> = ({ className, productId }) => {
	const data = useSession();
	const session = data.data;

	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const onSubmit: SubmitHandler<CommentFormType> = async (
		data: CommentFormType
	) => {
		try {
			setLoading(true);
			await createFeedback(data, session?.user?.id, productId);
			toast.success('Отзыв успешно оставлен');
			router.refresh();
		} catch (error) {
			toast.error('Не удалось оставить отзыв, попробуйте позже');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const form = useForm<CommentFormType>({
		resolver: zodResolver(CommentFormSchema),
		defaultValues: {
			comment: '',
		},
	});

	return (
		<div className={cn('mb-14 flex items-center justify-center', className)}>
			<FormProvider {...form}>
				<div className='w-full h-full flex flex-col gap-4'>
					<FormTextarea name={'comment'} />
					<Button
						loading={loading}
						onClick={form.handleSubmit(onSubmit)}
						className='self-end'
						type='submit'
					>
						Добавить
					</Button>
				</div>
			</FormProvider>
		</div>
	);
};
