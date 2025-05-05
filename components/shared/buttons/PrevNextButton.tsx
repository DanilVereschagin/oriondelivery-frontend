import { Button } from '@/components/ui';
import { useCarousel } from '@/components/ui/carousel';
import { cn } from '@/shared/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

export const PrevButton = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();

	return (
		<Button
			ref={ref}
			variant={variant}
			size={size}
			className={cn(
				'absolute h-10 w-10 rounded-full',
				orientation === 'horizontal'
					? '-left-12 top-1/2 -translate-y-1/2'
					: '-top-8 left-1/2 -translate-x-1/2 rotate-90',
				className
			)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			<ArrowLeft className='h-4 w-4' />
			<span className='sr-only'>Previous slide</span>
		</Button>
	);
});
PrevButton.displayName = 'PrevButton';

export const NextButton = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
	const { orientation, scrollNext, canScrollNext } = useCarousel();

	return (
		<Button
			ref={ref}
			variant={variant}
			size={size}
			className={cn(
				'absolute h-8 w-8 rounded-full',
				orientation === 'horizontal'
					? '-right-12 top-1/2 -translate-y-1/2'
					: '-bottom-8 left-1/2 -translate-x-1/2 rotate-90',
				className
			)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}
		>
			<ArrowRight className='h-4 w-4' />
			<span className='sr-only'>Next slide</span>
		</Button>
	);
});
NextButton.displayName = 'NextButton';
