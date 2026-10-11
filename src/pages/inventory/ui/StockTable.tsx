'use client'

import { useTranslations } from 'next-intl'

import { Card } from '@/shared/ui/card'
import { SearchInput } from '@/shared/ui/search-input'
import { SegmentedField } from '@/shared/ui/segmented'
import { Table, TableScroll, Th } from '@/shared/ui/table'

import type { TStockTableModel } from '../model/useStockTable'
import { StockRow } from './StockRow'

type TStockTableProps = { table: TStockTableModel }

export function StockTable({ table }: TStockTableProps) {
	const t = useTranslations('Inventory')
	const { filters, categories, rows } = table

	return (
		<Card
			as='section'
			className='min-h-105 flex-auto animate-rise max-mobile:flex-none'
			style={{ animationDelay: '150ms' }}
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<SegmentedField
					control={filters.control}
					name='category'
					aria-label={t('category')}
					options={categories}
				/>
				<SearchInput
					label={t('nameOrSku')}
					size='sm'
					className='basis-56'
					{...filters.register('search')}
				/>
			</div>
			<TableScroll className='min-h-0 flex-auto'>
				<Table className='min-w-205'>
					<thead>
						<tr>
							<Th>{t('item')}</Th>
							<Th>{t('category')}</Th>
							<Th className='w-52.5'>{t('remaining')}</Th>
							<Th>{t('supplier')}</Th>
							<Th>{t('expires')}</Th>
							<Th>{t('status')}</Th>
							<Th>
								<span className='sr-only'>{t('actions')}</span>
							</Th>
						</tr>
					</thead>
					<tbody>
						{rows.map(row => (
							<StockRow key={row.sku} row={row} />
						))}
					</tbody>
				</Table>
			</TableScroll>
		</Card>
	)
}
