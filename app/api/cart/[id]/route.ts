import { prisma } from '@/prisma/PrismaClient';
import { updateTotalAmount } from '@/shared/lib/update-total-amount';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params;
		const data = (await req.json()) as { quantity: number };
		const token = req.cookies.get('token')?.value || '';

		if (!token) {
			return NextResponse.json({ message: 'Токен не найден' }, { status: 401 });
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: Number(id),
			},
		});

		if (!cartItem) {
			return NextResponse.json(
				{ message: 'Корзина не найдена' },
				{ status: 404 }
			);
		}

		await prisma.cartItem.update({
			where: {
				id: Number(id),
			},
			data: {
				quantity: data.quantity,
			},
		});

		const updatedCart = await updateTotalAmount(token);

		return NextResponse.json(updatedCart);
	} catch (error) {
		console.error('Cart patch error', error);
		return NextResponse.json(
			{ message: 'Ошибка обновления корзины' },
			{ status: 500 }
		);
	}
}
