'use client'

import type { RowData } from '@tanstack/react-table'
import { useTranslations } from 'next-intl'

import type { TDataGridTable } from './Features'
import { getPageItems } from './PageItems'

/**
 * Range summary and page buttons of a data grid
 */
export function useDataGridPagination<TData extends RowData>(
	table: TDataGridTable<TData>,
) {
	const t = useTranslations('DataGrid')

	const { pageIndex, pageSize } = table.state.pagination

	const total = table.getRowCount()

	const from = total === 0 ? 0 : pageIndex * pageSize + 1

	const to = Math.min((pageIndex + 1) * pageSize, total)

	const summary = t('range', { from, to, total })

	const pages = getPageItems(pageIndex, table.getPageCount()).map(
		(item, position) =>
			item === 'gap'
				? { key: `gap-${position}`, page: null }
				: { key: `page-${item}`, page: item },
	)

	const canPrevious = table.getCanPreviousPage()

	const canNext = table.getCanNextPage()

	const onPrevious = () => table.previousPage()

	const onNext = () => table.nextPage()

	const onPageChange = (index: number) => table.setPageIndex(index)

	return {
		summary,
		pageIndex,
		pages,
		canPrevious,
		canNext,
		onPrevious,
		onNext,
		onPageChange,
	}
}
