import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from './Title';
import { CommentForm } from './forms/CommentForm';
import { ProductFeedback } from '@prisma/client';

interface Props {
	productId: number;
	comments: ProductFeedback[] | undefined;
	className?: string;
}

export const Comments: React.FC<Props> = ({
	className,
	comments,
	productId,
}) => {
	return (
		<div className={cn('flex flex-1 p-6', className)}>
			<div className='w-[700px] p-7 rounded-lg'>
				<Title
					text={'Добавить отзыв'}
					size='md'
					className='font-extrabold mb-2'
				/>
				<CommentForm productId={productId} />

				<Title text={'Отзывы'} size='lg' className='font-extrabold mb-1' />
				<div className='mt-5 flex flex-col gap-4 p-6 h-[70vh] overflow-y-scroll scrollbar scroll-pr-4 pr-4'>
					{comments!.map((comment) => (
						<div
							key={comment.id}
							className='flex flex-col gap-4 border border-primary rounded-xl p-4'
						>
							<b>{comment.user?.fullName}</b>
							<p>{comment.text}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
