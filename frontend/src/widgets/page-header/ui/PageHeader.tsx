'use client'

import type { ReactNode } from 'react'

import { useTranslations } from 'next-intl'

import { LanguageSwitcher } from '@/features/switch-language'

import { SearchInput } from '@/shared/ui/search-input'

import { NotificationsButton } from './NotificationsButton'

type TPageHeaderProps = {
	title: string
	crumb?: ReactNode
	actions?: ReactNode
	tools?: ReactNode
	search?: boolean
}

export function PageHeader(props: TPageHeaderProps) {
	const { title, crumb, actions, tools, search = true } = props

	const t = useTranslations('PageHeader')
	return (
		<header className='flex shrink-0 items-center gap-2.5 px-1 pt-1 pb-3.5 max-[720px]:flex-wrap'>
			<div className='min-w-0 flex-auto'>
				{crumb && (
					<div className='text-xs leading-4 text-ink-muted'>{crumb}</div>
				)}
				<h1 className='font-display text-2xl leading-7.5 font-extrabold tracking-[-0.02em]'>
					{title}
				</h1>
			</div>
			{search && (
				<SearchInput
					label={t('searchPatientIdService')}
					shortcut='Ctrl K'
					className='flex-[0_1_300px] max-[720px]:order-3 max-[720px]:basis-full'
				/>
			)}
			{tools}
			<LanguageSwitcher />
			<NotificationsButton />
			{actions}
		</header>
	)
}
