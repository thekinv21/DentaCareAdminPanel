'use client'

import { ShoppingCart } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'
import { StatCard, StatGrid } from '@/shared/ui/stat-card'

import { StockTable } from './StockTable'

export function InventoryPage() {
	const t = useTranslations('Inventory')
	return (
		<>
			<PageHeader
				crumb={t('n186ItemsStockCount')}
				title={t('inventory')}
				actions={
					<Button variant='primary'>
						<ShoppingCart size={17} aria-hidden='true' />
						{t('createOrder')}
					</Button>
				}
			/>
			<PageContent>
				<StatGrid label={t('summary')}>
					<StatCard
						label={t('belowMinimum')}
						value='7'
						valueClass='text-warning'
						footer={t('n3AlreadyOrdered')}
					/>
					<StatCard
						label={t('expiresWithin30Days')}
						value='4'
						valueClass='text-danger'
						delay={50}
						footer={t('totaling9280Som')}
					/>
					<StatCard
						label={t('inventoryValue')}
						value='468 900'
						unit={t('som')}
						delay={100}
						footer={t('n6Categories')}
					/>
				</StatGrid>
				<StockTable />
			</PageContent>
		</>
	)
}
