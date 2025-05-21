import { User } from '@prisma/client';
import React from 'react';
import { Container } from './Container';
import { getOrders } from '@/services/orders';
import { Title } from './Title';
import { calcPrice, PlateCartItem } from '@/shared/lib/convert-to-cart';
import { deliveryTypes } from '@/shared/constants/delivery';
import { cn } from '@/shared/lib/utils';
import { PaymentButton } from './buttons/PaymentButton';

interface Props {
	user: User;
	className?: string;
}

const OrderList: React.FC<Props> = async ({ user, className }) => {
	const orders = await getOrders(user.id);

	return (
		<Container className={className}>
			<div className='flex flex-col gap-4 h-[65vh] overflow-y-scroll scrollbar scroll-pr-4 pr-4'>
				{orders.map((order) => (
					<div
						key={order.id}
						className='flex flex-col gap-1 border border-primary rounded-xl p-4'
					>
						<div className='flex justify-between'>
							<Title
								size='sm'
								className='font-bold'
								text={`Заказ №${order.id}`}
							/>
							<div className='flex flex-row gap-2'>
								{order.status === 'PENDING' && <PaymentButton id={order.id} />}
								<p
									className={cn(
										'border border-primary rounded-lg p-2 font-bold',
										{
											' bg-green-400': order.status === 'DONE',
											' bg-orange-400': order.status === 'PENDING',
											' bg-gray-600': order.status === 'CANCELLED',
											' bg-blue-400': order.status === 'SUCCEEDED',
										}
									)}
								>
									{order.status === 'DONE'
										? 'Завершен'
										: order.status === 'PENDING'
											? 'Ждёт оплаты'
											: order.status === 'CANCELLED'
												? 'Отменен'
												: 'Оплачен'}
								</p>
							</div>
						</div>
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
						<ul className='flex flex-col gap-1 ml-4 list-disc'>
							{JSON.parse(order.items as string).map((item: PlateCartItem) => (
								<li key={item.id}>
									{item.productVariant.product.name} | {item.quantity} шт x{' '}
									{calcPrice(item)} руб = {item.quantity * calcPrice(item)} ₽
								</li>
							))}
						</ul>
						<p>
							Доставка:{' '}
							{order.deliveryType === 'DEFAULT' && (
								<b>{deliveryTypes[0].name.price} ₽</b>
							)}
							{order.deliveryType === 'COMET' && (
								<b>{deliveryTypes[1].name.price} ₽</b>
							)}
							{order.deliveryType === 'LIGHT' && (
								<b>{deliveryTypes[2].name.price} ₽</b>
							)}
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
