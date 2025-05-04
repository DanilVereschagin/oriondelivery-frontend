import { Container } from '@/components/shared';
import { getById } from '@/services/products';
import { notFound } from 'next/navigation';
import React from 'react';
import { ProductPageForm } from '@/components/shared/forms';

async function Product({ params: { id } }: { params: { id: string } }) {
	const product = await getById(id);

	if (!product) {
		return notFound();
	}

	return (
		<Container className='flex xl:flex-row sm:flex-col my-10'>
			<ProductPageForm product={product} />
		</Container>
	);
}

export default Product;
