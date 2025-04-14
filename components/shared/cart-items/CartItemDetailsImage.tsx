import { cn } from '@/shared/lib/utils';
import Image from 'next/image';

interface Props {
	src: string;
	className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
	return (
		<Image
			alt='cart product'
			width={88}
			height={88}
			className={cn('', className)}
			src={src}
		/>
	);
};
