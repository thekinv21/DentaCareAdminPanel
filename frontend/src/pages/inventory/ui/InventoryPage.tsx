'use client'

import { Plus, ShoppingCart } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'
import { StatCard, StatGrid } from '@/shared/ui/stat-card'

import { useStockItemForm } from '../model/useStockItemForm'
import { useStockMovement } from '../model/useStockMovement'
import { useStockRemoval } from '../model/useStockRemoval'
import { useStockTable } from '../model/useStockTable'
import { StockItemModal } from './StockItemModal'
import { StockMovementModal } from './StockMovementModal'
import { StockTable } from './StockTable'

export function InventoryPage() {
	const t = useTranslations('Inventory')
	const removal = useStockRemoval()
	const form = useStockItemForm(removal.remove)
	const movement = useStockMovement()
	const table = useStockTable({
		removedSkus: removal.removedSkus,
		onMove: movement.openFor,
		onEdit: form.openEdit,
		onRemove: removal.remove,
	})

	return (
		<>
			<PageHeader
				crumb={t('n186ItemsStockCount')}
				title={t('inventory')}
				actions={
					<>
						<Button onClick={form.openCreate}>
							<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
							{t('newItem')}
						</Button>
						<Button variant='primary'>
							<ShoppingCart size={17} aria-hidden='true' />
							{t('createOrder')}
						</Button>
					</>
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
				<StockTable table={table} />
			</PageContent>
			<StockItemModal form={form} />
			<StockMovementModal movement={movement} />
		</>
	)
}
