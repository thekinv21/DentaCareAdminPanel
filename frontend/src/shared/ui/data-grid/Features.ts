import {
	type ColumnDef,
	columnFilteringFeature,
	createColumnHelper,
	createFilteredRowModel,
	createPaginatedRowModel,
	filterFn_equals,
	globalFilteringFeature,
	type ReactTable,
	type RowData,
	rowPaginationFeature,
	tableFeatures,
} from '@tanstack/react-table'

export type TDataGridColumnMeta = {
	align?: 'left' | 'center' | 'right'
	mono?: boolean
	nowrap?: boolean
	className?: string
	/**
	 * Interactive cell (switch, row actions) that stays fully visible in a muted row
	 */
	control?: boolean
}

/**
 * Client-side search, column filters and pagination shared by every data grid
 */
export const DATA_GRID_FEATURES = tableFeatures({
	columnFilteringFeature,
	globalFilteringFeature,
	rowPaginationFeature,
	filteredRowModel: createFilteredRowModel(),
	paginatedRowModel: createPaginatedRowModel(),
	filterFns: { equals: filterFn_equals },
	columnMeta: {} as TDataGridColumnMeta,
})

export type TDataGridFeatures = typeof DATA_GRID_FEATURES

export type TDataGridColumn<TData extends RowData> = ColumnDef<
	TDataGridFeatures,
	TData
>

export type TDataGridTable<TData extends RowData> = ReactTable<
	TDataGridFeatures,
	TData
>

export const createDataGridColumnHelper = <TData extends RowData>() =>
	createColumnHelper<TDataGridFeatures, TData>()

export const DEFAULT_PAGE_SIZE = 10
