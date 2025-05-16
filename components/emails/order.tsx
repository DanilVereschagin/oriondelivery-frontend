import React from 'react';

interface Props {
	data: {
		orderId: number;
		totalPrice: number;
		url: string;
	};
}

export const Order: React.FC<Props> = ({ data }) => {
	return (
		<div>
			<h1>
				Здравствуйте. Заказ №{data.orderId} на сумму {data.totalPrice} рублей
				оформлен.
			</h1>

			<p>Заказ начнёт готовиться только после оплаты.</p>
		</div>
	);
};
