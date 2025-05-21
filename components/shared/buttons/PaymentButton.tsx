'use client';

import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
	id: number;
}

export const PaymentButton: React.FC<Props> = ({ id }) => {
	const router = useRouter();

	const handlePayment = (id: number) => {
		router.push(`/payment/${id}`);
	};

	return (
		<Button onClick={() => handlePayment(id)} type='button'>
			Оплатить
		</Button>
	);
};
