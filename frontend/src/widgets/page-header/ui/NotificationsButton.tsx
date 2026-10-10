import { Bell } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { IconButton } from '@/shared/ui/icon-button'

type TNotificationsButtonProps = {
	unreadNotificationCount: number
}

export function NotificationsButton({
	unreadNotificationCount,
}: TNotificationsButtonProps) {
	const t = useTranslations('PageHeader')

	return (
		<IconButton
			aria-label={t('notificationsUnread', { n: unreadNotificationCount })}
		>
			<Bell size={18} aria-hidden='true' />
			{unreadNotificationCount > 0 && (
				<span className='absolute top-2 right-2.25 size-2 rounded-full bg-accent shadow-[0_0_0_2px_var(--surface)]' />
			)}
		</IconButton>
	)
}
