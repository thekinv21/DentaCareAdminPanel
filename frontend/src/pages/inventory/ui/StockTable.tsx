'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { ProgressBar } from '@/shared/ui/progress'
import { SearchInput } from '@/shared/ui/search-input'
import { Segmented } from '@/shared/ui/segmented'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import { useStockTable } from '../model/useStockTable'

export function StockTable() {
	const t = useTranslations('Inventory')
	const { filter, setFilter, filters, rows } = useStockTable()

	return (
		<Card
			as='section'
			className='min-h-105 flex-auto animate-rise max-[720px]:flex-none'
			style={{ animationDelay: '150ms' }}
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<Segmented
					aria-label={t('category')}
					options={filters}
					value={filter}
					onChange={setFilter}
				/>
				<SearchInput label={t('nameOrSku')} size='sm' className='basis-56' />
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
								<Td align='right'>
									<Button size='sm'>{row.action}</Button>
								</Td>
							</tr>
						))}
					</tbody>
				</Table>
			</TableScroll>
		</Card>
	)
}
