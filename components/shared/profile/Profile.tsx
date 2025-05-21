import React from 'react';
import { Title } from '../Title';
import { ProfileForm } from '../forms';
import { getSession } from '@/shared/lib/hasSession';
import { prisma } from '@/prisma/PrismaClient';
import { redirect } from 'next/navigation';
import { Container } from '../Container';
import { cn } from '@/shared/lib/utils';
import OrderList from '../OrderList';

interface Props {
	className?: string;
}

export const Profile: React.FC<Props> = async ({ className }) => {
	const session = await getSession();

	if (!session) {
		return redirect('/not-auth');
	}

	const user = await prisma.user.findFirst({
		where: {
			id: Number(session.id),
		},
	});

	if (!user) {
		return redirect('/not-auth');
	}

	return (
		<div className={className}>
			<Title size={'xl'} className='font-bold' text={'Профиль'} />
			<Container
				className={cn(
					'mt-10 w-[100%] flex flex-row gap-40 justify-items-center'
				)}
			>
				<ProfileForm className='w-[47%]' data={user} />
				<OrderList user={user} className='w-[47%]' />
			</Container>
		</div>
	);
};
