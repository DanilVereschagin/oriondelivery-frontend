import React from 'react';
import { Input } from '../input';
import { useFormContext } from 'react-hook-form';

interface Props extends React.ComponentProps<'input'> {
	name: string;
	label?: string;
	required?: boolean;
	className?: string;
}

export const FormInput: React.FC<Props> = ({
	name,
	label,
	required,
	className,
	...props
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const error = errors[name]?.message as string;

	return (
		<div className={className}>
			{label && (
				<p className='mb-2 font-medium'>
					{label} {required && <span className='text-red-600'>*</span>}
				</p>
			)}
			<Input
				className='text-base'
				id={name}
				required={required}
				{...register(name)}
				{...props}
			/>

			{error && (
				<p className='text-red-600 text-sm mt-2'>
					Поле обязательно для заполнения
				</p>
			)}
		</div>
	);
};
