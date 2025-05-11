'use client';

import { useEffect, useState } from 'react';
import { Title } from '../Title';
import { cn } from '@/shared/lib/utils';
import { useDeliveryStore } from '@/shared/store/delivery';
import { Button, Input } from '@/components/ui';
import { Wallet } from 'lucide-react';
import { useCartStore } from '@/shared/store/cart';
import toast from 'react-hot-toast';
import { hasPromocode } from '@/services/promocode';
import { useOrderStore } from '@/shared/store/order';

interface Props {
	paying?: boolean;
	onPay: () => void;
	className?: string;
}

export const AmountInfo: React.FC<React.PropsWithChildren<Props>> = ({
	paying,
	onPay,
	className,
}) => {
	const { setAmount } = useOrderStore((state) => state);
	const [promocodeText, setPromocodeText] = useState('');
	const [promocodeSale, setPromocodeSale] = useState(0);
	const { price } = useDeliveryStore((state) => state);
	const { totalAmount } = useCartStore((state) => state);

	const handlePromocodeChange = async () => {
		const promocode = await hasPromocode(promocodeText);

		if (!promocode) {
			toast.error('Неверный промокод');
			return 0;
		}

		if (promocodeSale !== 0) {
			toast.success('Промокод успешно обновлён');
			setPromocodeSale(promocode.sale);
			return 0;
		}

		if (amount < 1000) {
			toast.error('Минимальная сумма заказа 1000 рублей');
			return 0;
		}

		setPromocodeSale(promocode.sale);
		toast.success('Промокод успешно применён');
	};

	const amount = price
		? price + totalAmount - promocodeSale
		: totalAmount - promocodeSale;

	useEffect(() => {
		setAmount(amount);
	}, [amount, setAmount]);

	return (
		<div className={cn('border border-violet-700 rounded-3xl', className)}>
			<div className='flex items-center justify-between pt-5 px-7'>
				<Title text={'Оплата'} size='md' className='font-bold' />

				<div className='flex flex-col gap-1'>
					<span className='text-xl'>
						Итого: <b>{amount} ₽</b>
					</span>
				</div>
			</div>

			<div className={'px-5 py-4'}>
				<div className='flex my-4'>
					<span className='flex flex-1 text-lg text-violet-700'>
						Стоимость блюд:{' '}
						<b className=' flex-1 border-b border-dashed border-b-violet-500 relative -top-1 mx-2'></b>
					</span>

					<span className='font-bold text-xl'>{totalAmount} ₽</span>
				</div>

				<div className='flex my-4'>
					<span className='flex flex-1 text-lg text-violet-700'>
						Доставка:{' '}
						<b className=' flex-1 border-b border-dashed border-b-violet-500 relative -top-1 mx-2'></b>
					</span>

					<span className='font-bold text-xl'>{price} ₽</span>
				</div>

				{promocodeSale > 0 && (
					<div className='flex my-4'>
						<span className='flex flex-1 text-lg text-violet-700'>
							Скидка:{' '}
							<b className=' flex-1 border-b border-dashed border-b-violet-500 relative -top-1 mx-2'></b>
						</span>

						<span className='font-bold text-xl'>-{promocodeSale} ₽</span>
					</div>
				)}

				<div className='flex my-4 gap-4'>
					<Input
						name='promocode'
						type='text'
						placeholder='Промокод...'
						value={promocodeText}
						onChange={(e) => setPromocodeText(e.target.value)}
					/>
					<Button type='submit' onClick={handlePromocodeChange}>
						Применить
					</Button>
				</div>

				<Button
					loading={paying}
					type='submit'
					className='w-full h-14 rounded-xl mt-6 text-base font-bold'
					onClick={onPay}
				>
					Оплатить
					<Wallet className='ml-3' />
				</Button>
			</div>
		</div>
	);
};
