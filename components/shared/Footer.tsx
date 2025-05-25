import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
	className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				'border-t border-primary flex justify-center p-5 gap-40 w-full',
				className
			)}
		>
			<div className='flex flex-col gap-4'>
				<div className='flex flex-row gap-2 items-center'>
					<b>Telegram: </b>
					<a
						className='border border-primary rounded-lg p-2'
						href='https://t.me/orion_delivery'
					>
						{' '}
						Перейти
					</a>
				</div>
				<div className='flex flex-row gap-2 items-center'>
					<b>ВКонтакте: </b>
					<a
						className='border border-primary rounded-lg p-2'
						href='https://vk.com/orion_delivery'
					>
						{' '}
						Перейти
					</a>
				</div>
			</div>
			<div className='flex flex-col gap-4'>
				<div className='flex flex-row gap-2'>
					<div>Телефон: </div>
					<b>8 928 615 90 30</b>
				</div>
				<div className='flex flex-row gap-2'>
					<div>Почта: </div>
					<b>diafin.bernuly@mail.ru</b>
				</div>
				<div className='flex flex-row gap-2'>
					<b>© 2025 Orion Delivery</b>
				</div>
			</div>
		</div>
	);
};
