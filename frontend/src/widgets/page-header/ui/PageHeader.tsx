'use client'

import type { ReactNode } from 'react'

import { Bell } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { LanguageSwitcher } from '@/features/switch-language'

import { IconButton } from '@/shared/ui/icon-button'
import { SearchInput } from '@/shared/ui/search-input'

interface PageHeaderProps {
	/**
	 * Display-ready (already translated) title
	 */
	title: string
	crumb?: ReactNode
	/**
	 * Primary page actions, rendered last
	 */
	actions?: ReactNode
	/**
	 * Controls rendered before the language switch (e.g. a period switch)
	 */
	tools?: ReactNode
	search?: boolean
}

export function PageHeader({
	title,
	crumb,
	actions,
	tools,
	search = true,
}: PageHeaderProps) {
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
			<IconButton aria-label={t('notifications3New')}>
				<Bell size={18} aria-hidden='true' />
				<span className='absolute top-2 right-2.25 size-2 rounded-full bg-accent shadow-[0_0_0_2px_var(--surface)]' />
			</IconButton>
			{actions}
		</header>
	)
}

/**
 * Scrollable page body under the header
 */
export function PageContent({ children }: { children: ReactNode }) {
	return (
		<main className='flex min-h-0 flex-auto flex-col gap-4 overflow-auto px-1 pt-0.5 pb-4 scrollbar-thin max-[720px]:overflow-visible'>
			{children}
		</main>
	)
}
