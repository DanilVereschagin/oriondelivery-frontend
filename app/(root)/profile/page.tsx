import { Container } from '@/components/shared';
import { getSession } from '@/shared/lib/hasSession';
import { redirect } from 'next/navigation';

const Profile = async () => {
	const session = await getSession();

	if (!session) {
		return redirect('/not-auth');
	}

	return (
		<Container className='flex my-10'>
			<h1>Profile</h1>
		</Container>
	);
};

export default Profile;
