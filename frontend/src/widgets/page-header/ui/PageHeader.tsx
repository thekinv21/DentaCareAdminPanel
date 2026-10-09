import type { ReactNode } from 'react'

import { Bell } from 'lucide-react'

import { IconButton } from '@/shared/ui/icon-button'
import { SearchInput } from '@/shared/ui/search-input'

interface PageHeaderProps {
	title: string
	crumb?: ReactNode
	/**
	 * Primary page actions, rendered after the notifications button
	 */
	actions?: ReactNode
	/**
	 * Controls rendered before the notifications button (e.g. a period switch)
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
	return (
		<header className='flex shrink-0 items-center gap-2.5 px-1 pt-1 pb-3.5 max-[720px]:flex-wrap'>
			<div className='min-w-0 flex-auto'>
				{crumb && (
					<div className='text-xs leading-4 text-ink-muted'>{crumb}</div>
				)}
				<h1 className='font-display text-2xl leading-[30px] font-extrabold tracking-[-0.02em]'>
					{title}
				</h1>
			</div>
			{search && (
				<SearchInput
					label='Поиск: пациент, ID, услуга'
					shortcut='Ctrl K'
					className='flex-[0_1_300px] max-[720px]:order-3 max-[720px]:basis-full'
				/>
			)}
			{tools}
			<IconButton aria-label='Уведомления, 3 новых'>
				<Bell size={18} aria-hidden='true' />
				<span className='absolute top-2 right-[9px] size-2 rounded-full bg-accent shadow-[0_0_0_2px_var(--surface)]' />
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
