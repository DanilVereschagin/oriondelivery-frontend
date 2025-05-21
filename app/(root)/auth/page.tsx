import { LoginForm, RegistrationForm } from '@/components/shared/forms';
import React from 'react';

export interface SearchParamsProps {
	active?: string;
}

const Auth = ({ searchParams }: { searchParams: SearchParamsProps }) => {
	return (
		<div className='grid h-[87vh] min-h-[100%] lg:grid-cols-2'>
			<div className='flex flex-col gap-4 p-6 border-r-2'>
				<div className='flex flex-1 items-center justify-center'>
					<div className='w-[60%]'>
						<LoginForm searchParams={searchParams} />
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-4 p-6'>
				<div className='flex flex-1 items-center justify-center'>
					<div className='w-[60%]'>
						<RegistrationForm />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
