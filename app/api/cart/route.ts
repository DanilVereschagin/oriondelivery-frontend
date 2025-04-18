import { prisma } from '@/prisma/PrismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('token')?.value || '';

		if (!token) {
			return NextResponse.json({ totalAmount: 0, cart: [] });
		}

		const cart = await prisma.cart.findFirst({
			where: {
				OR: [
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

		return NextResponse.json({ cart: cart });
	} catch (error) {
		console.log(error);
	}
}
