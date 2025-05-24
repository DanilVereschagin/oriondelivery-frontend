import React from 'react';
import { Container } from '../Container';
import { Title } from '../Title';
import { AdminPromocodeForm } from '../forms';

interface Props {
	className?: string;
}

export const AdminPromocode: React.FC<Props> = ({ className }) => {
	return (
		<Container className={className}>
			<Title
				text={'Добавить промокод'}
				size='lg'
				className='font-extrabold mb-1'
			/>
			<AdminPromocodeForm className='mt-5 w-[50%]' />
		</Container>
	);
};
