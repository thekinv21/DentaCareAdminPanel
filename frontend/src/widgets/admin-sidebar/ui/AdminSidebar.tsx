'use client'

import Link from 'next/link'

import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useCurrentUser } from '@/entities/employee'

import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { LogoMark } from '@/shared/ui/logo'

import { useSidebarNav } from '../model/useSidebarNav'
import { SidebarNav } from './SidebarNav'

export function AdminSidebar() {
	const t = useTranslations('AdminSidebar')
	const user = useCurrentUser()
	const { groups, profileActive } = useSidebarNav()

	return (
		<aside
			aria-label={t('menu')}
			className='flex h-full w-61 shrink-0 flex-col gap-2 overflow-y-auto rounded-[22px] bg-surface px-3 py-3.5 shadow-clay-md scrollbar-none max-[1100px]:w-17 max-[1100px]:px-2 max-[1100px]:py-3 max-[720px]:h-auto max-[720px]:w-auto max-[720px]:flex-row max-[720px]:items-center max-[720px]:overflow-x-auto max-[720px]:rounded-2xl max-[720px]:p-2'
		>
			<div className='flex items-center gap-2.5 border-b border-line px-1 pt-0.5 pb-3 max-[1100px]:justify-center max-[1100px]:px-0 max-[720px]:border-0 max-[720px]:p-0'>
				<LogoMark />
				<span className='min-w-0 grow max-[1100px]:hidden'>
					<span className='block font-display text-lg leading-5.5 font-extrabold tracking-[-0.01em]'>
						Denta
					</span>
					<span className='block truncate text-[12.5px] leading-4.5 text-ink-muted'>
						{user.branch}
					</span>
				</span>
			</div>

			<SidebarNav groups={groups} label={t('mainMenu')} />

			<Link
				href={ROUTES.profile}
				title={t('myProfile')}
				aria-current={profileActive ? 'page' : undefined}
				className='flex items-center gap-2.5 rounded-2xl border border-line p-2 text-ink no-underline transition-colors duration-150 hover:bg-raised aria-[current=page]:bg-brand-soft max-[1100px]:justify-center max-[1100px]:border-0 max-[1100px]:p-1 max-[720px]:hidden'
			>
				<Avatar initials={user.initials} tone='accent' size={36} />
				<span className='min-w-0 grow max-[1100px]:hidden'>
					<span className='block truncate font-semibold'>{user.fullName}</span>
					<span className='block text-[12.5px] leading-4.5 text-ink-muted'>
						{user.role}
					</span>
				</span>
				<ChevronRight
					size={16}
					aria-hidden='true'
					className='text-ink-subtle max-[1100px]:hidden'
				/>
			</Link>
		</aside>
	)
}
