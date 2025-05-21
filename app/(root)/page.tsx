import {
	Container,
	TopBar,
	Filters,
	ProductsGroupList,
	Categories,
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
			<TopBar />
			<Container className='pb-14 mt-10'>
				<div className='flex gap-[70px]'>
					<div>
						<Categories
							categories={categories.filter((c) => c.products?.length > 0)}
						/>
					</div>
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
