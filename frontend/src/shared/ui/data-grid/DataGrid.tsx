'use client'

import type { RowData } from '@tanstack/react-table'

import { cn } from '@/shared/lib/cn'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import type { TDataGridTable } from './Features'

type TDataGridProps<TData extends RowData> = {
	table: TDataGridTable<TData>
	emptyText: string
	className?: string
	/**
	 * Dims the data cells of a row (e.g. a disabled account); controls stay visible
	 */
	isRowMuted?: (row: TData) => boolean
}

/**
 * Renders the current page of a `useDataGrid` table with the shared table styles
 */
export function DataGrid<TData extends RowData>(props: TDataGridProps<TData>) {
	const { table, emptyText, className, isRowMuted } = props

	const rows = table.getRowModel().rows

	return (
		<TableScroll>
			<Table className={className}>
				<thead>
					{table.getHeaderGroups().map(group => (
						<tr key={group.id}>
							{group.headers.map(header => (
								<Th key={header.id}>
									{!header.isPlaceholder && (
										<table.FlexRender header={header} />
									)}
								</Th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{rows.map(row => {
						const isMuted = isRowMuted?.(row.original)

						return (
							<tr key={row.id}>
								{row.getAllCells().map(cell => {
									const meta = cell.column.columnDef.meta

									return (
										<Td
											key={cell.id}
											align={meta?.align}
											mono={meta?.mono}
											nowrap={meta?.nowrap}
											className={cn(
												meta?.className,
												isMuted && !meta?.control && 'opacity-55',
											)}
										>
											<table.FlexRender cell={cell} />
										</Td>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</Table>
			{rows.length === 0 && (
				<p className='py-12 text-center text-[12.5px] text-ink-muted'>
					{emptyText}
				</p>
			)}
		</TableScroll>
	)
}
