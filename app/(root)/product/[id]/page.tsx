import { Container, Title } from '@/components/shared';
import { GroupVariants } from '@/components/shared/GroupVariants';
import { ProductImage } from '@/components/shared/ProductImage';
import { getById } from '@/services/products';
import { notFound } from 'next/navigation';
import React from 'react';

async function Product({ params: { id } }: { params: { id: string } }) {
	const product = await getById(id);
	const isPizza = Boolean(product.variants[0]?.pizzaType);

	if (!product) {
		return notFound();
	}

	return (
		<Container className='flex flex-col my-10'>
			<div className='flex flex-1'>
				<ProductImage
					src={product.imageUrl}
					alt={product.name}
					className='mb-10'
					size={40}
					isPizza={isPizza}
				/>
				<div className='w-[490px] bg-violet-100 p-7 rounded-lg'>
					<Title
						text={product.name}
						size='md'
						className='font-extrabold mb-1 text-black'
					/>

					<p className='text-violet-600'>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
						perferendis ullam quod quaerat, praesentium fugiat id quam enim
						cupiditate, vero dolores quisquam velit consectetur provident
						incidunt facilis dicta. Facilis, libero.
					</p>

					<GroupVariants
						className='text-black'
						selectedValue='2'
						items={[
							{
								name: 'Маленькая',
								value: '1',
							},
							{
								name: 'Средняя',
								value: '2',
							},
							{
								name: 'Большая',
								value: '3',
								disabled: true,
							},
						]}
					/>
				</div>
			</div>
		</Container>
	);
}

export default Product;
