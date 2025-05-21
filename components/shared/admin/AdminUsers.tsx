import React from 'react';
import { Container } from '../Container';
import { getAll } from '@/services/users';
import { cn } from '@/shared/lib/utils';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { AdminProfileForm } from '../forms';

interface Props {
	className?: string;
}

export const AdminUsers: React.FC<Props> = async ({ className }) => {
	const users = await getAll();

	return (
		<Container className={cn('grid grid-cols-2 gap-4', className)}>
			{users
				.filter((user) => user.role !== 'ADMIN')
				.map((user) => (
					<Accordion key={user.id} type='single' collapsible>
						<AccordionItem value='item-1'>
							<AccordionTrigger>{user.fullName}</AccordionTrigger>
							<AccordionContent>
								<AdminProfileForm
									className=' border border-primary p-4 rounded-xl'
									key={user.id}
									data={user}
								/>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				))}
		</Container>
	);
};
