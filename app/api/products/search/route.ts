import { prisma } from '@/prisma/PrismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const query = (await request.nextUrl.searchParams.get('q')) || '';

	const products = await prisma.product.findMany({
		where: {
			name: {
				contains: query,
				mode: 'insensitive',
			},
		},
		take: 5,
	});

	return NextResponse.json(products);
}
