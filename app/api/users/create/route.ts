import { prisma } from '@/prisma/PrismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const data = await request.json();
	const user = await prisma.user.create({
		data,
	});

	return NextResponse.json(user);
}
