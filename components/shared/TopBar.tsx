import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './Container';
import { SearchInput } from './SearchInput';

interface Props {
	className?: string;
}

export const TopBar: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				'sticky top-32 py-10 shadow-lg shadow-black/5 z-10',
				className
			)}
		>
			<Container className='flex items-center justify-between'>
				<div className='ml-60 w-[70%]'>
					<SearchInput />
				</div>
			</Container>
		</div>
	);
};
