import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
	onChange: (value?: string) => void;
}

export const FormAddressInput: React.FC<Props> = ({ onChange }) => {
	return (
		<AddressSuggestions
			inputProps={{
				name: 'address',
				placeholder: 'Введите адрес',
				required: true,
				className:
					'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
			}}
			suggestionClassName='text-primary'
			suggestionsClassName='bg-background border border-primary rounded-md mt-4 p-3 gap-2'
			token={process.env.NEXT_PUBLIC_DADATA_KEY!}
			onChange={(data) => onChange?.(data?.value)}
		/>
	);
};
