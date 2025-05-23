import { Container } from '@/components/shared';
import { getById } from '@/services/products';
import { notFound } from 'next/navigation';
import React from 'react';
import { ProductPageForm } from '@/components/shared/forms';
import { getCommentsByProductId } from '@/services/feedback';

async function Product({ params: { id } }: { params: { id: string } }) {
	const product = await getById(id);

	if (!product) {
		return notFound();
	}

	const comments = await getCommentsByProductId(product.id);

	return (
		<Container className='flex xl:flex-row sm:flex-col my-10'>
			<ProductPageForm product={product} comments={comments} />
		</Container>
	);
}

export default Product;
