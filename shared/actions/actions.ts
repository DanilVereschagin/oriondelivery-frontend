'use server';

import { CheckoutFormType } from '@/components/schemas/CheckoutFormSchema';
import { prisma } from '@/prisma/PrismaClient';
import { cookies } from 'next/headers';
import { sendEmail } from '../lib/send-email';
import { Order } from '@/components/emails/order';
import { PaymentFormType } from '@/components/schemas/PaymentFormSchema';
import { PlateCartItem } from '../lib/convert-to-cart';
import { Payment } from '@/components/emails/payment';

export async function createOrder(data: CheckoutFormType, amount: number) {
	try {
		const cookiesStore = cookies();
		const token = cookiesStore.get('token')?.value || '';
		const id = 1;

		if (!token && !id) {
			throw new Error('Токен или ID не найден');
		}

		const cart = await prisma.cart.findFirst({
			include: {
				user: true,
				cartItems: {
					include: {
						productVariant: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
			where: {
				OR: [
					{
						userId: Number(id),
					},
					{
						token,
					},
				],
			},
		});

		if (!cart) {
			throw new Error('Корзина не найдена');
		}

		if (cart?.cartItems.length === 0) {
			throw new Error('Корзина пуста');
		}

		const order = await prisma.order.create({
			data: {
				token,
				fullName: data.fullName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: amount,
				items: JSON.stringify(cart.cartItems),
				user: {
					connect: {
						id: Number(id),
					},
				},
			},
		});

		await prisma.cart.update({
			where: {
				id: cart.id,
			},
			data: {
				totalAmount: 0,
			},
		});

		await prisma.cartItem.deleteMany({
			where: {
				cartId: cart.id,
			},
		});

		const url = `payment/${order.id}`;

		await sendEmail(
			data.email,
			'Заказ оформлен',
			Order({
				data: { orderId: order.id, totalPrice: amount, url: url },
			})
		);

		return url;
	} catch (error) {
		console.error(error);
	}
}

export async function payOrder(data: PaymentFormType, orderId: number) {
	try {
		const order = await prisma.order.findFirst({
			where: {
				id: orderId,
			},
		});

		if (!order) {
			throw new Error('Заказ не найден');
		}

		await prisma.order.update({
			where: {
				id: orderId,
			},
			data: {
				status: 'SUCCEEDED',
			},
		});

		const items = JSON.parse(order.items as string) as PlateCartItem[];

		sendEmail(
			order.email,
			'Заказ оплачен',
			Payment({
				data: { orderId: order.id, totalPrice: order.totalAmount, items },
			})
		);
	} catch (error) {
		console.error(error);
	}
}
