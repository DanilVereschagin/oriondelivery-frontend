import { Container } from '@/components/shared';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'ORION | Оформление заказа',
};

export default function CheckoutLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className='min-h-screen'>
			<Container>{children}</Container>
		</main>
	);
}
