import { prisma } from '@/prisma/PrismaClient';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { AddCartItem } from '@/services/cart';
import { updateTotalAmount } from '@/shared/lib/update-total-amount';

export async function GET(req: NextRequest) {
	try {
		const id = 1;
		const token = req.cookies.get('token')?.value || '';

		if (!token && !id) {
			return NextResponse.json({ totalAmount: 0, cart: [] });
		}

		const cart = await prisma.cart.findFirst({
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
			include: {
				cartItems: {
					orderBy: {
						createdAt: 'desc',
					},
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
		});

		if (!token) {
			if (cart) {
				cookies().set('token', cart.token);
			}
		}

		return NextResponse.json({ cart: cart });
	} catch (error) {
		console.log(error);
	}
}

export async function POST(req: NextRequest) {
	try {
		const id = 1;
		let token = req.cookies.get('token')?.value || '';

		if (!token) {
			token = crypto.randomUUID();
		}

		let cart = await prisma.cart.findFirst({
			where: {
				token,
			},
		});

		if (!cart) {
			cart = await prisma.cart.create({
				data: {
					userId: Number(id),
					token,
				},
			});
		}

		const data = (await req.json()) as AddCartItem;

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: cart.id,
				productVariantId: data.productVariantId,
				ingredients: {
					every: {
						id: {
							in: data.ingredients,
						},
					},
				},
			},
		});

		if (cartItem) {
			await prisma.cartItem.update({
				where: {
					id: cartItem.id,
				},
				data: {
					quantity: cartItem.quantity + 1,
				},
			});
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: cart.id,
					productVariantId: data.productVariantId,
					ingredients: {
						connect: data.ingredients?.map((id) => ({ id })),
					},
				},
			});
		}

		const updatedCart = await updateTotalAmount(token);
		cookies().set('token', token);
		return NextResponse.json(updatedCart);
	} catch (error) {
		console.log('Cart add error', error);
		return NextResponse.json(
			{ message: 'Не удалось создать корзину' },
			{ status: 500 }
		);
	}
}
