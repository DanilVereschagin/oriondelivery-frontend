import type { Metadata } from 'next';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';

export const metadata: Metadata = {
	title: 'ORION Delivery',
};

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<main className='min-h-screen'>
			<Header />
			{children}
			{modal}
			<Footer />
		</main>
	);
}
