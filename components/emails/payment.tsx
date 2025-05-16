import { PlateCartItem } from '@/shared/lib/convert-to-cart';
import React from 'react';

interface Props {
	data: {
		orderId: number;
		items: PlateCartItem[];
		totalPrice: number;
	};
}

export const Payment: React.FC<Props> = ({ data }) => {
	return (
		<div>
			<h1>
				Ваш заказ №{data.orderId} на сумму {data.totalPrice} рублей оплачен.
				Приступаем к готовке.
			</h1>

			<p>Список заказа:</p>

			<ul>
				{data.items.map((item) => (
					<li className='flex flex-row' key={item.id}>
						<p>
							{item.productVariant.product.name} | {item.quantity} шт. x{' '}
							{item.productVariant.price} руб ={' '}
							{item.quantity * item.productVariant.price} ₽
						</p>
					</li>
				))}
			</ul>
			<b>Сумма заказа: {data.totalPrice} ₽</b>
		</div>
	);
};
