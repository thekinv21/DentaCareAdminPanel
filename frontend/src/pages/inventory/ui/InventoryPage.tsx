'use client'

import { Plus, ShoppingCart } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'
import { StatCard, StatGrid } from '@/shared/ui/stat-card'

import { useInventorySummary } from '../model/useInventorySummary'
import { useStockItemForm } from '../model/useStockItemForm'
import { useStockMovement } from '../model/useStockMovement'
import { useStockRemoval } from '../model/useStockRemoval'
import { useStockTable } from '../model/useStockTable'
import { StockItemModal } from './StockItemModal'
import { StockMovementModal } from './StockMovementModal'
import { StockTable } from './StockTable'

export function InventoryPage() {
	const t = useTranslations('Inventory')
	const summary = useInventorySummary()
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
				crumb={summary.crumb}
				title={t('inventory')}
				actions={
					<>
						<Button onClick={form.openCreate}>
							<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
							{t('newItem')}
						</Button>
						{/* supplier orders come with the backend */}
						<Button variant='primary' disabled>
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
						value={summary.belowMinimum}
						valueClass='text-warning'
						footer={summary.alreadyOrdered}
					/>
					<StatCard
						label={t('expiresWithin30Days')}
						value={summary.expiringSoon}
						valueClass='text-danger'
						delay={50}
						footer={summary.expiringValue}
					/>
					<StatCard
						label={t('inventoryValue')}
						value={summary.totalValue}
						unit={t('som')}
						delay={100}
						footer={summary.categories}
					/>
				</StatGrid>
				<StockTable table={table} />
			</PageContent>
			<StockItemModal form={form} />
			<StockMovementModal movement={movement} />
		</>
	)
}
