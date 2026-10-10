'use client'

import type { RowData } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { IconButton } from '@/shared/ui/icon-button'

import type { TDataGridTable } from './Features'
import { useDataGridPagination } from './useDataGridPagination'

type TDataGridPaginationProps<TData extends RowData> = {
	table: TDataGridTable<TData>
}

export function DataGridPagination<TData extends RowData>({
	table,
}: TDataGridPaginationProps<TData>) {
	const t = useTranslations('DataGrid')

	const {
		summary,
		pageIndex,
		pages,
		canPrevious,
		canNext,
		onPrevious,
		onNext,
		onPageChange,
	} = useDataGridPagination(table)

	return (
		<nav aria-label={t('pagination')} className='flex items-center gap-3'>
			<span className='whitespace-nowrap'>{summary}</span>
			<div className='flex items-center gap-1'>
				<IconButton
					quiet
					size='sm'
					aria-label={t('previousPage')}
					disabled={!canPrevious}
					onClick={onPrevious}
				>
					<ChevronLeft size={16} aria-hidden='true' />
				</IconButton>
				{pages.map(({ key, page }) =>
					page === null ? (
						<span key={key} aria-hidden='true' className='min-w-6 text-center'>
							…
						</span>
					) : (
						<IconButton
							key={key}
							quiet
							size='sm'
							aria-label={t('page', { n: page + 1 })}
							aria-current={page === pageIndex ? 'page' : undefined}
							onClick={() => onPageChange(page)}
							className={cn(
								'font-mono text-[12.5px] tabular-nums',
								page === pageIndex &&
									'bg-brand-soft font-semibold text-brand-strong hover:bg-brand-soft',
							)}
						>
							{page + 1}
						</IconButton>
					),
				)}
				<IconButton
					quiet
					size='sm'
					aria-label={t('nextPage')}
					disabled={!canNext}
					onClick={onNext}
				>
					<ChevronRight size={16} aria-hidden='true' />
				</IconButton>
			</div>
		</nav>
	)
}
