import type { Metadata } from 'next'

import { Plus } from 'lucide-react'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'
import { Delta, StatCard, StatGrid } from '@/shared/ui/stat-card'

import { BillingWorkspace } from './BillingWorkspace'

export const metadata: Metadata = { title: 'Оплаты' }

export function BillingPage() {
	return (
		<>
			<PageHeader
				crumb='Октябрь 2026 · приём через Visa, MBANK, Компаньон, Optima Bank'
				title='Оплаты'
				actions={
					<Button variant='primary'>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						Новый счёт
					</Button>
				}
			/>
			<PageContent>
				<StatGrid label='Сводка'>
					<StatCard
						label='Получено в октябре'
						value='2 184 300'
						unit='сом'
						footer={
							<>
								<Delta>+9%</Delta> к сентябрю
							</>
						}
					/>
					<StatCard
						label='К оплате'
						value='218 400'
						unit='сом'
						delay={50}
						footer='23 пациента'
					/>
					<StatCard
						label='Просрочено'
						value='46 900'
						unit='сом'
						valueClass='text-danger'
						delay={100}
						footer='6 счетов старше 30 дней'
					/>
				</StatGrid>
				<BillingWorkspace />
			</PageContent>
		</>
	)
}
