import { Container } from '@/components/shared';
import { AdminUsers } from '@/components/shared/admin';
import { getSession } from '@/shared/lib/hasSession';
import { redirect } from 'next/navigation';
import React from 'react';

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
			<AdminUsers />
		</Container>
	);
};

export default Page;
