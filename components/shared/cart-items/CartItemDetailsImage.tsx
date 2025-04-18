import { cn } from '@/shared/lib/utils';
import Image from 'next/image';

interface Props {
	src: string;
	className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
	return (
		<Image
			width={120}
			height={120}
			alt='cart product'
			className={cn('w-[120px] h-[120px]', className)}
			src={src}
		/>
	);
};
