'use client'

import { useTranslations } from 'next-intl'

import { useSidebarNav } from '../model/useSidebarNav'
import { useSidebarProfile } from '../model/useSidebarProfile'
import { SidebarBrand } from './SidebarBrand'
import { SidebarNav } from './SidebarNav'
import { SidebarProfileLink } from './SidebarProfileLink'

export function AdminSidebar() {
	const t = useTranslations('AdminSidebar')

	const user = useSidebarProfile()

	const { groups, profileActive } = useSidebarNav()

	return (
		<aside
			aria-label={t('menu')}
			className='flex h-full w-61 shrink-0 flex-col gap-2 overflow-y-auto rounded-[22px] bg-surface px-3 py-3.5 shadow-clay-md scrollbar-none max-laptop:w-17 max-laptop:px-2 max-laptop:py-3 max-mobile:h-auto max-mobile:w-auto max-mobile:flex-row max-mobile:items-center max-mobile:overflow-x-auto max-mobile:rounded-2xl max-mobile:p-2'
		>
			<SidebarBrand branch={user.branch} />
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
