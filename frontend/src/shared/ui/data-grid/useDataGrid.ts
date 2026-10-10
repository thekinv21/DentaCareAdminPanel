'use client'

import { useState } from 'react'

import {
	type ColumnFiltersState,
	type PaginationState,
	type Row,
	type RowData,
	useTable,
} from '@tanstack/react-table'

import { matchesText } from '@/shared/lib/search'

import {
	clampPageSize,
	DATA_GRID_FEATURES,
	DEFAULT_PAGE_SIZE,
	type TDataGridColumn,
	type TDataGridFeatures,
} from './Features'

type TDataGridOptions<TData extends RowData> = {
	data: TData[]
	columns: TDataGridColumn<TData>[]
	/**
	 * Text of a row the search box is matched against
	 */
	getSearchText: (row: TData) => string
	search: string
	filters: ColumnFiltersState
	pageSize?: number
}

/**
 * TanStack table with client-side search, column filters and pagination.
 * A new search or filter starts from the first page; when the last rows of the
 * last page disappear, the grid moves to the new last page
 */
export function useDataGrid<TData extends RowData>(
	options: TDataGridOptions<TData>,
) {
	const {
		data,
		columns,
		getSearchText,
		search,
		filters,
		pageSize = DEFAULT_PAGE_SIZE,
	} = options

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: clampPageSize(pageSize),
	})

	const query = JSON.stringify([search, filters])

	const [appliedQuery, setAppliedQuery] = useState(query)

	if (query !== appliedQuery) {
		setAppliedQuery(query)

		setPagination(current => ({ ...current, pageIndex: 0 }))
	}

	const globalFilterFn = (
		row: Row<TDataGridFeatures, TData>,
		_columnId: string,
		value: string,
	) => matchesText(getSearchText(row.original), value)

	const table = useTable({
		features: DATA_GRID_FEATURES,
		columns,
		data,
		state: { pagination, globalFilter: search, columnFilters: filters },
		onPaginationChange: setPagination,
		globalFilterFn,
		autoResetPageIndex: false,
	})

	const lastPageIndex = Math.max(table.getPageCount() - 1, 0)

	if (pagination.pageIndex > lastPageIndex) {
		setPagination(current => ({ ...current, pageIndex: lastPageIndex }))
	}

	return { table }
}
