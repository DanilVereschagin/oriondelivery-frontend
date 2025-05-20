import React from 'react';
import { Title } from '../Title';
import { ProfileForm } from '../forms';
import { getSession } from '@/shared/lib/hasSession';
import { prisma } from '@/prisma/PrismaClient';
import { redirect } from 'next/navigation';

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
			<ProfileForm data={user} />
		</div>
	);
};
