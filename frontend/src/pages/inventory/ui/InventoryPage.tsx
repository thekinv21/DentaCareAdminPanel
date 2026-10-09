import type { Metadata } from 'next'

import { ShoppingCart } from 'lucide-react'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'
import { StatCard, StatGrid } from '@/shared/ui/stat-card'

import { StockTable } from './StockTable'

export const metadata: Metadata = { title: 'Склад' }

export function InventoryPage() {
	return (
		<>
			<PageHeader
				crumb='186 позиций · инвентаризация 01.10.2026'
				title='Склад'
				actions={
					<Button variant='primary'>
						<ShoppingCart size={17} aria-hidden='true' />
						Создать заказ
					</Button>
				}
			/>
			<PageContent>
				<StatGrid label='Сводка'>
					<StatCard
						label='Ниже минимума'
						value='7'
						valueClass='text-warning'
						footer='3 уже заказаны'
					/>
					<StatCard
						label='Истекает за 30 дней'
						value='4'
						valueClass='text-danger'
						delay={50}
						footer='На сумму 9 280 сом'
					/>
					<StatCard
						label='Стоимость запасов'
						value='468 900'
						unit='сом'
						delay={100}
						footer='6 категорий'
					/>
				</StatGrid>
				<StockTable />
			</PageContent>
		</>
	)
}
