'use server';

import { CheckoutFormType } from '@/components/schemas/CheckoutFormSchema';
import { prisma } from '@/prisma/PrismaClient';
import { cookies } from 'next/headers';
import { sendEmail } from '../lib/send-email';
import { Order } from '@/components/emails/order';
import { PaymentFormType } from '@/components/schemas/PaymentFormSchema';
import { PlateCartItem } from '../lib/convert-to-cart';
import { Payment } from '@/components/emails/payment';
import { RegistrationFormType } from '@/components/schemas/RegistrationSchema';
import { getSession } from '../lib/hasSession';
import { hashSync } from 'bcrypt';
import { ProfileFormType } from '@/components/schemas/ProfileFormSchema';
import { Code } from '@/components/emails/code';
import { DeliveryType } from '../constants/delivery';
import { OrderStatus } from '@prisma/client';
import { CommentFormType } from '@/components/schemas/CommentFormSchema';

export async function createOrder(
	data: CheckoutFormType,
	amount: number,
	type: string
) {
	try {
		const cookiesStore = cookies();
		const token = cookiesStore.get('token')?.value || '';
		const session = await getSession();

		const id = session?.id;

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
				deliveryType: type as DeliveryType,
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

export async function updateUser(data: ProfileFormType) {
	try {
		const session = await getSession();

		if (!session) {
			throw new Error('Пользователь не авторизован');
		}

		if (data.password) {
			await prisma.user.update({
				where: {
					id: Number(session.id),
				},
				data: {
					fullName: data.fullName,
					email: data.email,
					phone: data.phone,
					password: hashSync(data.password, 10),
				},
			});
		} else {
			await prisma.user.update({
				where: {
					id: Number(session.id),
				},
				data: {
					fullName: data.fullName,
					email: data.email,
					phone: data.phone,
				},
			});
		}
	} catch (error) {
		console.log(error);
	}
}

export async function updateAnotherUser(data: ProfileFormType, id: number) {
	try {
		const session = await getSession();

		if (!session) {
			throw new Error('Пользователь не авторизован');
		}

		if (session.role !== 'ADMIN') {
			throw new Error('Недостаточно прав');
		}

		if (data.password) {
			await prisma.user.update({
				where: {
					id: Number(id),
				},
				data: {
					fullName: data.fullName,
					email: data.email,
					phone: data.phone,
					password: hashSync(data.password, 10),
				},
			});
		} else {
			await prisma.user.update({
				where: {
					id: Number(id),
				},
				data: {
					fullName: data.fullName,
					email: data.email,
					phone: data.phone,
				},
			});
		}
	} catch (error) {
		console.log(error);
	}
}

export async function registerUser(data: RegistrationFormType) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: data.email,
			},
		});

		if (user) {
			if (!user.verified) {
				throw new Error(
					'Пользователь с таким email уже зарегистрирован. Подтвердите почту и авторизуйтесь'
				);
			}

			throw new Error('Пользователь с таким email уже зарегистрирован');
		}

		const newUser = await prisma.user.create({
			data: {
				fullName: data.fullName,
				email: data.email,
				phone: data.phone,
				password: hashSync(data.password, 10),
			},
		});

		const code = Math.floor(
			Math.random() * (9999 - 1000 + 1) + 1000
		).toString();

		await prisma.verificationCode.create({
			data: {
				code,
				userId: newUser.id,
			},
		});

		sendEmail(
			newUser.email,
			'Активация аккаунта',
			Code({
				code: code,
			})
		);
	} catch (error) {
		console.log(error);
	}
}

export async function updateOrderStatus(orderId: number, status: OrderStatus) {
	try {
		await prisma.order.update({
			where: {
				id: orderId,
			},
			data: {
				status,
			},
		});
	} catch (error) {
		console.error(error);
	}
}

export async function createFeedback(
	data: CommentFormType,
	userId: number,
	productId: number
) {
	try {
		const comment = await prisma.productFeedback.findFirst({
			where: {
				productId: Number(productId),
				userId: Number(userId),
			},
		});

		if (comment) {
			return Error('Вы уже оставляли отзыв');
		}

		if (!userId) {
			return Error('Пользователь не авторизован');
		}

		await prisma.productFeedback.create({
			data: {
				text: data.comment,
				productId: Number(productId),
				userId: Number(userId),
			},
		});
	} catch (error) {
		console.error(error);
	}
}
