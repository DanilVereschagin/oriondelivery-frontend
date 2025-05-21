import React from 'react';

interface Props {
	code: string;
}

export const Code: React.FC<Props> = ({ code }) => {
	return (
		<div>
			<h1>
				<a href={`http://localhost:3000/api/auth/activate?code=${code}`}>
					Активировать аккаунт
				</a>
			</h1>
		</div>
	);
};
