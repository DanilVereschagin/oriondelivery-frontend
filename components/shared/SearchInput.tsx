'use client';

import { cn } from '@/lib/utils';
import { Api } from '@/services/api';
import { Product } from '@prisma/client';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useClickAway, useDebounce } from 'react-use';

interface Props {
	className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [focused, setFocused] = useState(false);
	const ref = useRef(null);

	useClickAway(ref, () => {
		setFocused(false);
	});

	useDebounce(
		async () => {
			Api.products
				.search(searchQuery)
				.then((data: Product[]) => setProducts(data))
				.catch((error) => console.log(error));
		},
		100,
		[searchQuery]
	);

	const onClickProduct = () => {
		setFocused(false);
		setSearchQuery('');
		setProducts([]);
	};

	return (
		<>
			{focused && (
				<div className='fixed top-0 left-0 right-0 bottom-0 bg-violet-950/50 z-30' />
			)}
			<div
				ref={ref}
				className={cn(
					'flex rounded-2xl flex-1 justify-between relative h-11 z-40',
					className
				)}
			>
				<Search className='absolute left-3 top-1/2 translate-y-[-50%] h-5 text-violet-400' />
				<input
					type='text'
					placeholder='Поиск...'
					className='rounded-2xl outline-none w-full bg-violet-100 pl-11'
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>

				{products.length > 0 && (
					<div
						className={cn(
							'absolute w-full bg-violet-100 rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-40 text-violet-950',
							focused && 'visible opacity-100 top-12'
						)}
					>
						{products.map((product) => (
							<Link
								className='flex items-center gap-2 px-5 py-2 hover:bg-primary/10'
								href={`/product/${product.id}`}
								key={product.id}
								onClick={onClickProduct}
							>
								<img
									className='rounded-lg h-8 w-8'
									src={product.imageUrl}
									width={32}
									height={32}
									alt={product.name}
								/>
								<span>{product.name}</span>
							</Link>
						))}
					</div>
				)}
			</div>
		</>
	);
};
