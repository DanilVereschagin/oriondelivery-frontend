'use client';

import { Container, Title } from '@/components/shared';
import { Button } from '@/components/ui';
import NotAdminIcon from '@/public/decor/NotAdmin.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NotAdmin = () => {
	const router = useRouter();

	return (
		<Container className='flex my-10'>
			<div className='flex flex-1 flex-col items-center justify-center'>
				<Title
					className='font-bold text-red-500'
					size='xl'
					text='Вы не администратор'
				/>
				<Image src={NotAdminIcon} alt='not admin' width={400} height={400} />
				<div className='flex flex-row gap-4 mt-4'>
					<Button
						onClick={() => router.push('/')}
						type='submit'
						size={'lg'}
						className='text-xl text-red-500 border-red-500'
						variant='outline'
					>
						Вернуться на главную
					</Button>
				</div>
			</div>
		</Container>
	);
};

export default NotAdmin;
