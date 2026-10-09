'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'
import { Delta, StatCard, StatGrid } from '@/shared/ui/stat-card'

import { usePlanForm } from '../model/usePlanForm'
import { usePlanRemoval } from '../model/usePlanRemoval'
import { usePlansTable } from '../model/usePlansTable'
import { PlanFormModal } from './PlanFormModal'
import { PlansTable } from './PlansTable'

export function TreatmentPlansPage() {
	const t = useTranslations('TreatmentPlans')
	const removal = usePlanRemoval()
	const form = usePlanForm(removal.remove)
	const table = usePlansTable({
		removedKeys: removal.removedKeys,
		onEdit: form.openEdit,
		onRemove: plan => removal.remove(plan),
	})

	return (
		<>
			<PageHeader
				crumb={t('planApprovalAndCompletion')}
				title={t('treatmentPlans')}
				actions={
					<Button variant='primary' onClick={form.openCreate}>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						{t('newPlan')}
					</Button>
				}
			/>
			<PageContent>
				<StatGrid label={t('summary')}>
					<StatCard
						label={t('activePlans')}
						value='64'
						footer={
							<>
								<Delta>+6</Delta> {t('startedInOctober')}
							</>
						}
					/>
					<StatCard
						label={t('awaitingConsent')}
						value='9'
						delay={50}
						footer={t('totaling312400Som')}
					/>
					<StatCard
						label={t('patientConsent')}
						value='78%'
						delay={100}
						footer={t('last90DaysTarget')}
					/>
				</StatGrid>
				<PlansTable table={table} />
			</PageContent>
			<PlanFormModal form={form} />
		</>
	)
}
