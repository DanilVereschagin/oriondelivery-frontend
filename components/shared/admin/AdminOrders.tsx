'use client';

import { Order, OrderStatus } from '@prisma/client';
import React from 'react';
import { Container } from '../Container';
import { Title } from '../Title';
import { cn } from '@/shared/lib/utils';
import { calcPrice, PlateCartItem } from '@/shared/lib/convert-to-cart';
import { deliveryTypes } from '@/shared/constants/delivery';
import { Button } from '@/components/ui';
import { updateOrderStatus } from '@/shared/actions/actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Props {
	orders: Order[];
	className?: string;
}

export const AdminOrders: React.FC<Props> = ({ orders, className }) => {
	const router = useRouter();

	const handleOrderUpdate = (id: number, status: OrderStatus) => {
		try {
			updateOrderStatus(id, status);
			toast.success('Статус заказа обновлен.');

			router.refresh();
		} catch (error) {
			console.error(error);
			toast.error('Что-то пошло не так');
		}
	};

	return (
		<Container className={className}>
			<Title text='Заказы' className='font-bold' size='xl' />
			<div className='flex flex-col gap-4 h-[75vh] overflow-y-scroll scrollbar scroll-pr-4 pr-4'>
				{orders.map((order) => (
					<div key={order.id} className='flex flex-row gap-4'>
						<div
							key={order.id}
							className='w-[90%] flex flex-col gap-1 border border-primary rounded-xl p-4'
						>
							<div className='flex justify-between'>
								<Title
									size='sm'
									className='font-bold'
									text={`Заказ №${order.id}`}
								/>
								<div className='flex flex-row gap-2'>
									<p
										className={cn(
											'border border-primary rounded-lg p-2 font-bold text-white',
											{
												' bg-green-400': order.status === 'DONE',
												' bg-orange-400': order.status === 'PENDING',
												' bg-gray-600': order.status === 'CANCELLED',
												' bg-blue-400': order.status === 'SUCCEEDED',
											}
										)}
									>
										{order.status === 'DONE'
											? 'Доставлен'
											: order.status === 'PENDING'
												? 'Ждёт оплаты'
												: order.status === 'CANCELLED'
													? 'Отменён'
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
								{JSON.parse(order.items as string).map(
									(item: PlateCartItem) => (
										<li key={item.id}>
											{item.productVariant.product.name} | {item.quantity} шт x{' '}
											{calcPrice(item)} руб = {item.quantity * calcPrice(item)}{' '}
											₽
										</li>
									)
								)}
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
						<div className='flex flex-col justify-between py-10 px-2 rounded-2xl border border-primary'>
							<Button
								onClick={() => handleOrderUpdate(order.id, 'DONE')}
								className='bg-green-400 text-white font-bold'
							>
								Доставлен
							</Button>
							<Button
								onClick={() => handleOrderUpdate(order.id, 'SUCCEEDED')}
								className='bg-blue-400 text-white font-bold'
							>
								Оплачен
							</Button>
							<Button
								onClick={() => handleOrderUpdate(order.id, 'CANCELLED')}
								className='bg-gray-600 text-white font-bold'
							>
								Отменён
							</Button>
							<Button
								onClick={() => handleOrderUpdate(order.id, 'PENDING')}
								className='bg-orange-400 text-white font-bold'
							>
								Ждёт оплаты
							</Button>
						</div>
					</div>
				))}
			</div>
		</Container>
	);
};
