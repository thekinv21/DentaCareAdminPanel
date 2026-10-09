'use client'

import { useState } from 'react'

import { cn } from '@/shared/lib/cn'
import { Badge, type Tone } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { ProgressBar } from '@/shared/ui/progress'
import { SearchInput } from '@/shared/ui/search-input'
import { Segmented } from '@/shared/ui/segmented'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import {
	CATEGORY_LABEL,
	STOCK,
	type StockCategory,
	type StockLevel,
	stockLevel,
} from '../model/stock'

type Filter = 'all' | 'low' | Exclude<StockCategory, 'impl'>

const FILTERS: { id: Filter; label: string }[] = [
	{ id: 'all', label: 'Все' },
	{ id: 'low', label: 'Мало' },
	{ id: 'anes', label: 'Анестетики' },
	{ id: 'cons', label: 'Расходники' },
	{ id: 'rest', label: 'Пломбирование' },
	{ id: 'endo', label: 'Эндодонтия' },
]

const LEVEL: Record<StockLevel, { label: string; tone: Tone; bar: string }> = {
	ok: { label: 'В наличии', tone: 'ok', bar: 'bg-brand' },
	low: { label: 'Мало', tone: 'warning', bar: 'bg-warning' },
	critical: { label: 'Критично', tone: 'danger', bar: 'bg-danger' },
}

export function StockTable() {
	const [filter, setFilter] = useState<Filter>('all')

	const rows = STOCK.filter(item => {
		if (filter === 'all') return true
		if (filter === 'low') return item.quantity < item.minimum
		return item.category === filter
	})

	return (
		<Card
			as='section'
			className='min-h-[420px] flex-auto animate-rise max-[720px]:flex-none'
			style={{ animationDelay: '150ms' }}
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<Segmented
					aria-label='Категория'
					options={FILTERS}
					value={filter}
					onChange={setFilter}
				/>
				<SearchInput
					label='Название или артикул'
					size='sm'
					className='basis-56'
				/>
			</div>
			<TableScroll className='min-h-0 flex-auto'>
				<Table className='min-w-[820px]'>
					<thead>
						<tr>
							<Th>Позиция</Th>
							<Th>Категория</Th>
							<Th className='w-[210px]'>Остаток</Th>
							<Th>Поставщик</Th>
							<Th>Годен до</Th>
							<Th>Статус</Th>
							<Th>
								<span className='sr-only'>Действия</span>
							</Th>
						</tr>
					</thead>
					<tbody>
						{rows.map((item, index) => {
							const level = LEVEL[stockLevel(item)]
							const percent = Math.min(
								100,
								Math.round((item.quantity / (item.minimum * 2)) * 100),
							)
							return (
								<tr key={item.sku}>
									<Td>
										<span className='font-semibold'>{item.name}</span>
										<div className='font-mono text-[11.5px] text-ink-muted'>
											{item.sku}
										</div>
									</Td>
									<Td nowrap className='text-ink-muted'>
										{CATEGORY_LABEL[item.category]}
									</Td>
									<Td>
										<div className='flex items-center gap-2.5'>
											<span className='min-w-[72px] font-mono font-semibold whitespace-nowrap'>
												{item.quantity} {item.unit}
											</span>
											<ProgressBar
												value={Math.max(4, percent)}
												fillClass={level.bar}
												delay={240 + index * 40}
												className='flex-grow'
											/>
										</div>
										<div className='text-[11.5px] text-ink-muted'>
											Минимум {item.minimum} {item.unit}
										</div>
									</Td>
									<Td nowrap className='text-ink-muted'>
										{item.supplier}
									</Td>
									<Td
										nowrap
										className={cn(
											item.expiresSoon
												? 'font-semibold text-danger'
												: 'text-ink-muted',
										)}
									>
										{item.expires}
									</Td>
									<Td>
										<Badge tone={level.tone}>{level.label}</Badge>
									</Td>
									<Td align='right'>
										<Button size='sm'>
											{item.quantity < item.minimum ? 'Заказать' : 'Списать'}
										</Button>
									</Td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</TableScroll>
		</Card>
	)
}
