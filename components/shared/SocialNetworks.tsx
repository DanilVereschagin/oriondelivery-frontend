import { cn } from '@/shared/lib/utils';
import React from 'react';
import classes from '@/components/style/3DCard.module.scss';
import VKIcon from '@/public/assets/SocialNetworks/VK.png';
import TelegramIcon from '@/public/assets/SocialNetworks/Telegram.png';
import Image from 'next/image';

interface Props {
	className?: string;
}

export const SocialNetworks: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn(className, 'flex flex-col gap-4 mt-10')}>
			<div className={classes['parent']}>
				<div className={classes['card']}>
					<div className={classes['content-box']}>
						<span className={classes['card-title']}>VK</span>
						<p className={classes['card-content']}>
							Группа ресторана в ВКонтакте.
						</p>
						<a
							href='https://vk.com/orion_delivery'
							target='_blank'
							className={classes['see-more']}
						>
							Перейти
						</a>
					</div>
					<div className={classes['date-box']}>
						<Image src={VKIcon} alt={'VK'} />
					</div>
				</div>
			</div>
			<div className={classes['parent']}>
				<div className={classes['card']}>
					<div className={classes['content-box']}>
						<span className={classes['card-title']}>Telegram</span>
						<p className={classes['card-content']}>
							Группа ресторана в Telegram.
						</p>
						<a
							href='https://t.me/orion_delivery'
							target='_blank'
							className={classes['see-more']}
						>
							Перейти
						</a>
					</div>
					<div className={classes['date-box']}>
						<Image src={TelegramIcon} alt={'Telegram'} />
					</div>
				</div>
			</div>
		</div>
	);
};
