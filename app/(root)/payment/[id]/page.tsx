import { Container } from '@/components/shared';
import { Payment } from '@/components/shared/Payment';
import { getById } from '@/services/orders';
import { notFound } from 'next/navigation';

async function PaymentPage({ params: { id } }: { params: { id: string } }) {
	const order = await getById(id);

	if (!order) {
		return notFound();
	}

	return (
		<Container className='flex my-10 h-[65vh]'>
			<Payment className='h-[100%]' order={order} />
		</Container>
	);
}

export default PaymentPage;
