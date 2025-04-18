import {
	Container,
	Title,
	TopBar,
	Filters,
	ProductsGroupList,
} from '@/components/shared';
import { prisma } from '@/prisma/PrismaClient';

export default async function Home() {
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

	return (
		<>
			<Container className='mt-10'>
				<Title text='Меню' size='lg' className='font-extrabold' />
			</Container>
			<TopBar categories={categories.filter((c) => c.products.length > 0)} />
			<Container className='pb-14 mt-10'>
				<div className='flex gap-[70px]'>
					<div className='w-[250px]'>
						<Filters />
					</div>
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							{(await categories).map(
								(category) =>
									category.products.length > 0 && (
										<ProductsGroupList
											key={category.id}
											title={category.name}
											categoryId={category.id}
											items={category.products}
										/>
									)
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
