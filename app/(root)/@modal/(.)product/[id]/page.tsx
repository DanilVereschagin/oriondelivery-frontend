import { ProductModal } from '@/components/shared/modals';
import { getById } from '@/services/products';
import { notFound } from 'next/navigation';
import React from 'react';

async function ProductModalPage({
	params: { id },
}: {
	params: { id: string };
}) {
	const product = await getById(id);

	if (!product) {
		return notFound();
	}

	return <ProductModal product={product} />;
}

export default ProductModalPage;
