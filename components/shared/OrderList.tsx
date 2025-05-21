import { User } from '@prisma/client';
import React from 'react';
import { Container } from './Container';
import { getOrders } from '@/services/orders';
import { Title } from './Title';
import { PlateCartItem } from '@/shared/lib/convert-to-cart';

interface Props {
	user: User;
	className?: string;
}

const OrderList: React.FC<Props> = async ({ user, className }) => {
	const orders = await getOrders(user.id);

	return (
		<Container className={className}>
			<div className='flex flex-col gap-4'>
				{orders.map((order) => (
					<div
						key={order.id}
						className='flex flex-col gap-1 border border-primary rounded-xl p-2'
					>
						<Title
							size='sm'
							className='font-bold'
							text={`Заказ №${order.id}`}
						/>
						<p>
							Имя: <b>{order.fullName}</b>
						</p>
						<p>
							Email: <b>{order.email}</b>
						</p>
						<p>
							Телефон: <b>{order.phone}</b>
						</p>
						<p>
							Адрес: <b>{order.address}</b>
						</p>
						<p>
							Комментарий: <b>{order.comment}</b>
						</p>
						<Title size='xs' className='font-bold' text='Список блюд:' />
						<ul className='flex flex-col gap-1 ml-2'>
							{JSON.parse(order.items as string).map((item: PlateCartItem) => (
								<li key={item.id}>
									{item.productVariant.product.name} | {item.quantity} шт x{' '}
									{item.productVariant.price} руб ={' '}
									{item.quantity * item.productVariant.price} ₽
								</li>
							))}
						</ul>
						<p>
							Доставка: {order.deliveryType === 'DEFAULT' && <b>Обычная</b>}
							{order.deliveryType === 'COMET' && <b>Комета</b>}
						</p>
						<p>
							<b>Сумма заказа: {order.totalAmount} ₽</b>
						</p>
					</div>
				))}
			</div>
		</Container>
	);
};

export default OrderList;
