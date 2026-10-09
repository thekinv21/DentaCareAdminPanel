'use client'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { ProgressBar } from '@/shared/ui/progress'
import { SearchInput } from '@/shared/ui/search-input'
import { Segmented } from '@/shared/ui/segmented'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import { useStockTable } from '../model/use-stock-table'

export function StockTable() {
	const { t } = useI18n()
	const { filter, setFilter, filters, rows } = useStockTable()

	return (
		<Card
			as='section'
			className='min-h-[420px] flex-auto animate-rise max-[720px]:flex-none'
			style={{ animationDelay: '150ms' }}
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<Segmented
					aria-label={t('Категория')}
					options={filters}
					value={filter}
					onChange={setFilter}
				/>
				<SearchInput
					label={t('Название или артикул')}
					size='sm'
					className='basis-56'
				/>
			</div>
			<TableScroll className='min-h-0 flex-auto'>
				<Table className='min-w-[820px]'>
					<thead>
						<tr>
							<Th>{t('Позиция')}</Th>
							<Th>{t('Категория')}</Th>
							<Th className='w-[210px]'>{t('Остаток')}</Th>
							<Th>{t('Поставщик')}</Th>
							<Th>{t('Годен до')}</Th>
							<Th>{t('Статус')}</Th>
							<Th>
								<span className='sr-only'>{t('Действия')}</span>
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
										<span className='min-w-[72px] font-mono font-semibold whitespace-nowrap'>
											{row.quantity}
										</span>
										<ProgressBar
											value={row.fill}
											fillClass={row.fillClass}
											delay={row.delay}
											className='flex-grow'
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
