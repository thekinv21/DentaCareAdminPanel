'use client'

import { useTranslations } from 'next-intl'

import { useCurrentUser } from '@/entities/employee'

import { useSidebarNav } from '../model/useSidebarNav'
import { SidebarBrand } from './SidebarBrand'
import { SidebarNav } from './SidebarNav'
import { SidebarProfileLink } from './SidebarProfileLink'

export function AdminSidebar() {
	const t = useTranslations('AdminSidebar')
	const user = useCurrentUser()
	const { groups, profileActive } = useSidebarNav()

	return (
		<aside
			aria-label={t('menu')}
			className='flex h-full w-61 shrink-0 flex-col gap-2 overflow-y-auto rounded-[22px] bg-surface px-3 py-3.5 shadow-clay-md scrollbar-none max-[1100px]:w-17 max-[1100px]:px-2 max-[1100px]:py-3 max-[720px]:h-auto max-[720px]:w-auto max-[720px]:flex-row max-[720px]:items-center max-[720px]:overflow-x-auto max-[720px]:rounded-2xl max-[720px]:p-2'
		>
			<SidebarBrand branch={user?.branch} />
			<SidebarNav groups={groups} label={t('mainMenu')} />
			<SidebarProfileLink
				initials={user.initials}
				fullName={user.fullName}
				role={user.role}
				active={profileActive}
			/>
		</aside>
	)
}
