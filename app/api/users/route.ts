import { prisma } from '@/prisma/PrismaClient';
import { NextResponse } from 'next/server';

export async function GET() {
	const users = await prisma.user.findMany();

	return NextResponse.json(users);
}
