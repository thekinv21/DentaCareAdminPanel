'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { IconButton } from '@/shared/ui/icon-button'

type TPaginationProps = {
	current: number
	/**
	 * Page numbers to show; `null` renders an ellipsis
	 */
	pages: (number | null)[]
	onChange?: (page: number) => void
}

export function Pagination({ current, pages, onChange }: TPaginationProps) {
	const t = useTranslations('Common')
	const last = Math.max(...pages.filter((p): p is number => p !== null))

	return (
		<nav aria-label={t('pages')} className='flex items-center gap-1'>
			<IconButton
				size='sm'
				aria-label={t('back')}
				disabled={current <= 1}
				onClick={() => onChange?.(current - 1)}
			>
				<ChevronLeft size={15} aria-hidden='true' />
			</IconButton>
			{pages.map((page, index) =>
				page === null ? (
					<span key={`gap-${index}`} aria-hidden='true' className='px-0.5'>
						…
					</span>
				) : (
					<button
						key={page}
						type='button'
						aria-current={page === current ? 'page' : undefined}
						onClick={() => onChange?.(page)}
						className={cn(
							'h-8 min-w-8 rounded-xl px-1 font-mono',
							page === current
								? 'bg-brand-soft font-semibold text-brand-strong'
								: 'text-ink hover:bg-raised',
						)}
					>
						{page}
					</button>
				),
			)}
			<IconButton
				size='sm'
				aria-label={t('forward')}
				disabled={current >= last}
				onClick={() => onChange?.(current + 1)}
			>
				<ChevronRight size={15} aria-hidden='true' />
			</IconButton>
		</nav>
	)
}
