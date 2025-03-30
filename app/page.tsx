import {
	Container,
	Title,
	TopBar,
	Filters,
	ProductsGroupList,
} from '@/components/shared';

export default function Home() {
	return (
		<>
			<Container className='mt-10'>
				<Title text='Меню' size='lg' className='font-extrabold' />
			</Container>
			<TopBar />
			<Container className='pb-14 mt-10'>
				<div className='flex gap-[70px]'>
					<div className='w-[250px]'>
						<Filters />
					</div>
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							<ProductsGroupList
								title='Пицца'
								categoryId={1}
								items={[
									{
										id: 1,
										name: 'Пицца Маргарита',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11ee7d6105ef6690b86fbde6150b5b0c.avif',
										items: [
											{
												price: 550,
											},
											{
												price: 790,
											},
										],
									},
									{
										id: 2,
										name: 'Пицца Маргарита',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11ee7d6105ef6690b86fbde6150b5b0c.avif',
										items: [
											{
												price: 550,
											},
											{
												price: 790,
											},
										],
									},
									{
										id: 3,
										name: 'Пицца Маргарита',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11ee7d6105ef6690b86fbde6150b5b0c.avif',
										items: [
											{
												price: 550,
											},
											{
												price: 790,
											},
										],
									},
									{
										id: 4,
										name: 'Пицца Маргарита',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11ee7d6105ef6690b86fbde6150b5b0c.avif',
										items: [
											{
												price: 550,
											},
											{
												price: 790,
											},
										],
									},
								]}
							/>
							<ProductsGroupList
								title='Завтраки'
								categoryId={2}
								items={[
									{
										id: 5,
										name: 'Пицца Маргарита',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11ee7d6105ef6690b86fbde6150b5b0c.avif',
										items: [
											{
												price: 550,
											},
											{
												price: 790,
											},
										],
									},
									{
										id: 6,
										name: 'Пицца Маргарита',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11ee7d6105ef6690b86fbde6150b5b0c.avif',
										items: [
											{
												price: 550,
											},
											{
												price: 790,
											},
										],
									},
									{
										id: 7,
										name: 'Пицца Маргарита',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11ee7d6105ef6690b86fbde6150b5b0c.avif',
										items: [
											{
												price: 550,
											},
											{
												price: 790,
											},
										],
									},
									{
										id: 8,
										name: 'Пицца Маргарита',
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/11ee7d6105ef6690b86fbde6150b5b0c.avif',
										items: [
											{
												price: 550,
											},
											{
												price: 790,
											},
										],
									},
								]}
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
