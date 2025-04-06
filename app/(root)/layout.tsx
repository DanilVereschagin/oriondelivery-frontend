import type { Metadata } from 'next';
import { Header } from '@/components/shared/Header';

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
		<html lang='en'>
			<body>
				<main className='min-h-screen'>
					<Header />
					{children}
					{modal}
				</main>
			</body>
		</html>
	);
}
