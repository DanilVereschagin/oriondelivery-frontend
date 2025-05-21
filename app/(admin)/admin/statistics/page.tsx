import { getSession } from '@/shared/lib/hasSession';
import { redirect } from 'next/navigation';
import React from 'react';
import { Container } from '@/components/shared';
import { AdminStatistics } from '@/components/shared/admin';

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
