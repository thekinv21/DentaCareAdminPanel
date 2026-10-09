'use client'

import Link from 'next/link'

import { ChevronRight } from 'lucide-react'

import { CURRENT_USER } from '@/entities/employee'

import { useI18n } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { LogoMark } from '@/shared/ui/logo'

import { useSidebarNav } from '../model/use-sidebar-nav'
import { SidebarNav } from './SidebarNav'

export function AdminSidebar() {
	const { t, format } = useI18n()
	const { groups, profileActive } = useSidebarNav()

	return (
		<aside
			aria-label={t('Меню')}
			className='flex h-full w-[244px] shrink-0 flex-col gap-2 overflow-y-auto rounded-[22px] bg-surface px-3 py-3.5 shadow-clay-md scrollbar-none max-[1100px]:w-[68px] max-[1100px]:px-2 max-[1100px]:py-3 max-[720px]:h-auto max-[720px]:w-auto max-[720px]:flex-row max-[720px]:items-center max-[720px]:overflow-x-auto max-[720px]:rounded-2xl max-[720px]:p-2'
		>
			<div className='flex items-center gap-2.5 border-b border-line px-1 pt-0.5 pb-3 max-[1100px]:justify-center max-[1100px]:px-0 max-[720px]:border-0 max-[720px]:p-0'>
				<LogoMark />
				<span className='min-w-0 flex-grow max-[1100px]:hidden'>
					<span className='block font-display text-lg leading-[22px] font-extrabold tracking-[-0.01em]'>
						Denta
					</span>
					<span className='block truncate text-[12.5px] leading-[18px] text-ink-muted'>
						{t(CURRENT_USER.branch)}
					</span>
				</span>
			</div>

			<SidebarNav groups={groups} label={t('Основное меню')} />

			<Link
				href={ROUTES.profile}
				title={t('Мой профиль')}
				aria-current={profileActive ? 'page' : undefined}
				className='flex items-center gap-2.5 rounded-2xl border border-line p-2 text-ink no-underline transition-colors duration-150 hover:bg-raised aria-[current=page]:bg-brand-soft max-[1100px]:justify-center max-[1100px]:border-0 max-[1100px]:p-1 max-[720px]:hidden'
			>
				<Avatar initials={t(CURRENT_USER.initials)} tone='accent' size={36} />
				<span className='min-w-0 flex-grow max-[1100px]:hidden'>
					<span className='block truncate font-semibold'>
						{format.name(CURRENT_USER.fullName)}
					</span>
					<span className='block text-[12.5px] leading-[18px] text-ink-muted'>
						{t(CURRENT_USER.role)}
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
