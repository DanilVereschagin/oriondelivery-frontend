import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '../textarea';

interface Props extends React.ComponentProps<'textarea'> {
	rows?: number;
	name: string;
	label?: string;
	required?: boolean;
	className?: string;
}

export const FormTextarea: React.FC<Props> = ({
	rows = 5,
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
			<Textarea
				rows={rows}
				className='text-base resize-none'
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
