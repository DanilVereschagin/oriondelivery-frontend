import { hasPromocode } from '@/shared/lib/hasPromocode';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const query = (await request.nextUrl.searchParams.get('promo')) || '';

	const promocode = await hasPromocode(query);

	return NextResponse.json(promocode);
}
