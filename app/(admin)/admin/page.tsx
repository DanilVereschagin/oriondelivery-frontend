import { Container } from '@/components/shared';
import { AdminOrders } from '@/components/shared/admin';
import { getSession } from '@/shared/lib/hasSession';
import { getAllOrders } from '@/services/orders';
import { redirect } from 'next/navigation';
import React from 'react';

const AdminPage = async () => {
	const session = await getSession();

	if (!session) {
		return redirect('/not-auth');
	}

	if (session.role !== 'ADMIN') {
		return redirect('/not-admin');
	}

	const orders = await getAllOrders();

	return (
		<Container className='mt-10'>
			<AdminOrders orders={orders} />
		</Container>
	);
};

export default AdminPage;
