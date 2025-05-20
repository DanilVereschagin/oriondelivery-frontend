import { Container } from '@/components/shared';
import { Profile } from '@/components/shared/profile';
import { getSession } from '@/shared/lib/hasSession';
import { redirect } from 'next/navigation';

const ProfilePage = async () => {
	const session = await getSession();

	if (!session) {
		return redirect('/not-auth');
	}

	return (
		<Container className='flex my-10'>
			<Profile className='flex flex-1 flex-col items-center' />
		</Container>
	);
};

export default ProfilePage;
