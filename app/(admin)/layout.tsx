import type { Metadata } from 'next';
import '../globals.css';
import { AdminHeader } from '@/components/shared/admin';

export const metadata: Metadata = {
	title: 'Admin | ORION Delivery',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className='min-h-screen'>
			<AdminHeader />
			{children}
		</main>
	);
}
