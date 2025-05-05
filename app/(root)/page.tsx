import {
	Container,
	Title,
	TopBar,
	Filters,
	ProductsGroupList,
} from '@/components/shared';
import { SocialNetworks } from '@/components/shared/SocialNetworks';
import { filterProducts, SearchParams } from '@/shared/lib/filter-products';
import { Category } from '@prisma/client';

export default async function Home({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const categories: Category[] = await filterProducts(searchParams);

	return (
		<>
			<Container className='mt-10'>
				<Title text='Меню' size='lg' className='font-extrabold' />
			</Container>
			<TopBar categories={categories.filter((c) => c.products?.length > 0)} />
			<Container className='pb-14 mt-10'>
				<div className='flex gap-[70px]'>
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							{(await categories).map(
								(category) =>
									category.products?.length > 0 && (
										<ProductsGroupList
											className='mb-2'
											key={category.id}
											title={category.name}
											categoryId={category.id}
											items={category.products}
										/>
									)
							)}
						</div>
					</div>
					<div className='w-[250px]'>
						<Filters />
						<SocialNetworks />
					</div>
				</div>
			</Container>
		</>
	);
}
