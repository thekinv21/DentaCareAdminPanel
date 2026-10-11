import { Bell } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { IconButton } from '@/shared/ui/icon-button'

import { UNREAD_NOTIFICATIONS } from '../config/Notifications'

export function NotificationsButton() {
	const t = useTranslations('PageHeader')

	return (
		<IconButton
			aria-label={t('notificationsUnread', { n: UNREAD_NOTIFICATIONS })}
		>
			<Bell size={18} aria-hidden='true' />
			{UNREAD_NOTIFICATIONS > 0 && (
				<span className='absolute top-2 right-2.25 size-2 rounded-full bg-accent shadow-[0_0_0_2px_var(--surface)]' />
			)}
		</IconButton>
	)
}
