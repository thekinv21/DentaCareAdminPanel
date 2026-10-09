import type { Metadata } from 'next'

import { Plus } from 'lucide-react'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'
import { Delta, StatCard, StatGrid } from '@/shared/ui/stat-card'

import { PlansTable } from './PlansTable'

export const metadata: Metadata = { title: 'Планы лечения' }

export function TreatmentPlansPage() {
	return (
		<>
			<PageHeader
				crumb='Согласование и выполнение планов'
				title='Планы лечения'
				actions={
					<Button variant='primary'>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						Новый план
					</Button>
				}
			/>
			<PageContent>
				<StatGrid label='Сводка'>
					<StatCard
						label='Активные планы'
						value='64'
						footer={
							<>
								<Delta>+6</Delta> начато в октябре
							</>
						}
					/>
					<StatCard
						label='Ждут согласия'
						value='9'
						delay={50}
						footer='На сумму 312 400 сом'
					/>
					<StatCard
						label='Согласие пациентов'
						value='78%'
						delay={100}
						footer='За 90 дней · цель 70%'
					/>
				</StatGrid>
				<PlansTable />
			</PageContent>
		</>
	)
}
