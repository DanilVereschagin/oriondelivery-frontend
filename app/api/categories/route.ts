import { prisma } from '@/prisma/PrismaClient';
import { NextResponse } from 'next/server';

export async function GET() {
	const categories = await prisma.category.findMany({
		include: {
			products: {
				include: {
					ingredients: true,
					variants: true,
				},
			},
		},
	});

	return NextResponse.json(categories);
}
