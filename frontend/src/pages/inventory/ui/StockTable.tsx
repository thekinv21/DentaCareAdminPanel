'use client'

import { ArrowLeftRight, Pencil, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Controller } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { IconButton } from '@/shared/ui/icon-button'
import { ProgressBar } from '@/shared/ui/progress'
import { SearchInput } from '@/shared/ui/search-input'
import { Segmented } from '@/shared/ui/segmented'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import type { TStockTableModel } from '../model/useStockTable'

type TStockTableProps = { table: TStockTableModel }

export function StockTable({ table }: TStockTableProps) {
	const t = useTranslations('Inventory')
	const { filters, categories, rows } = table

	return (
		<Card
			as='section'
			className='min-h-105 flex-auto animate-rise max-[720px]:flex-none'
			style={{ animationDelay: '150ms' }}
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<Controller
					control={filters.control}
					name='category'
					render={({ field }) => (
						<Segmented
							aria-label={t('category')}
							options={categories}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
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
							<tr key={row.key}>
								<Td>
									<span className='font-semibold'>{row.name}</span>
									<div className='font-mono text-[11.5px] text-ink-muted'>
										{row.sku}
									</div>
								</Td>
								<Td nowrap className='text-ink-muted'>
									{row.category}
								</Td>
								<Td>
									<div className='flex items-center gap-2.5'>
										<span className='min-w-18 font-mono font-semibold whitespace-nowrap'>
											{row.quantity}
										</span>
										<ProgressBar
											value={row.fill}
											fillClass={row.fillClass}
											delay={row.delay}
											className='grow'
										/>
									</div>
									<div className='text-[11.5px] text-ink-muted'>
										{row.minimum}
									</div>
								</Td>
								<Td nowrap className='text-ink-muted'>
									{row.supplier}
								</Td>
								<Td
									nowrap
									className={cn(
										row.expiresSoon
											? 'font-semibold text-danger'
											: 'text-ink-muted',
									)}
								>
									{row.expires}
								</Td>
								<Td>
									<Badge tone={row.level.tone}>{row.level.label}</Badge>
								</Td>
								<Td align='right' nowrap>
									<span className='inline-flex items-center gap-0.5'>
										<Button size='sm' onClick={row.move}>
											<ArrowLeftRight size={14} aria-hidden='true' />
											{t('movement')}
										</Button>
										<IconButton
											quiet
											size='sm'
											aria-label={`${t('editColon')} ${row.name}`}
											title={t('edit')}
											onClick={row.edit}
										>
											<Pencil size={16} aria-hidden='true' />
										</IconButton>
										<IconButton
											quiet
											size='sm'
											aria-label={`${t('deleteColon')} ${row.name}`}
											title={t('delete')}
											onClick={row.remove}
											className='text-danger'
										>
											<Trash2 size={16} aria-hidden='true' />
										</IconButton>
									</span>
								</Td>
							</tr>
						))}
					</tbody>
				</Table>
			</TableScroll>
		</Card>
	)
}
