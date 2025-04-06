import type { Metadata } from 'next';
import { Header } from '@/components/shared/Header';

export const metadata: Metadata = {
	title: 'ORION Delivery',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<main className='min-h-screen'>
					<Header />
					{children}
				</main>
			</body>
		</html>
	);
}
