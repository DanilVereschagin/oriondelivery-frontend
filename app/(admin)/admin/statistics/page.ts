import { getSession } from '@/shared/lib/hasSession';
import { redirect } from 'next/navigation';


const Page = async () => {
	const session = await getSession();

	if (!session) {
		return redirect('/not-auth');
	}

	if (session.role !== 'ADMIN') {
		return redirect('/not-admin');
	}

	return (
        <Container className='mt-10'>
            <AdminStatistics />
        </Container>
	);
};

export default Page;
