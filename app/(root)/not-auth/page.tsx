'use client';

import { Container, Title } from '@/components/shared';
import { Button } from '@/components/ui';
import NotAuthIcon from '@/public/decor/NotAuth.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Profile = () => {
	const router = useRouter();

	return (
		<Container className='flex my-10'>
			<div className='flex flex-1 flex-col items-center justify-center'>
				<Title className='font-bold' size='xl' text='Вы не авторизованы' />
				<Image src={NotAuthIcon} alt='not auth' width={400} height={400} />
				<div className='flex flex-row gap-4 mt-4'>
					<Button
						type='submit'
						onClick={() => router.push('/auth')}
						size={'lg'}
						className='text-xl'
					>
						Авторизоваться
					</Button>
					<Button
						onClick={() => router.push('/')}
						type='submit'
						size={'lg'}
						className='text-xl'
						variant='outline'
					>
						Вернуться
					</Button>
				</div>
			</div>
		</Container>
	);
};

export default Profile;
