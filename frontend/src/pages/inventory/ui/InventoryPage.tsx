'use client'

import { ShoppingCart } from 'lucide-react'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { useI18n } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'
import { StatCard, StatGrid } from '@/shared/ui/stat-card'

import { StockTable } from './StockTable'

export function InventoryPage() {
	const { t } = useI18n()
	return (
		<>
			<PageHeader
				crumb={t('186 позиций · инвентаризация 01.10.2026')}
				title={t('Склад')}
				actions={
					<Button variant='primary'>
						<ShoppingCart size={17} aria-hidden='true' />
						{t('Создать заказ')}
					</Button>
				}
			/>
			<PageContent>
				<StatGrid label={t('Сводка')}>
					<StatCard
						label={t('Ниже минимума')}
						value='7'
						valueClass='text-warning'
						footer={t('3 уже заказаны')}
					/>
					<StatCard
						label={t('Истекает за 30 дней')}
						value='4'
						valueClass='text-danger'
						delay={50}
						footer={t('На сумму 9 280 сом')}
					/>
					<StatCard
						label={t('Стоимость запасов')}
						value='468 900'
						unit={t('сом')}
						delay={100}
						footer={t('6 категорий')}
					/>
				</StatGrid>
				<StockTable />
			</PageContent>
		</>
	)
}
