'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'
import { StatCard, StatDelta, StatGrid } from '@/shared/ui/stat-card'

import { usePlanForm } from '../model/usePlanForm'
import { usePlanRemoval } from '../model/usePlanRemoval'
import { usePlansSummary } from '../model/usePlansSummary'
import { usePlansTable } from '../model/usePlansTable'
import { PlanFormModal } from './PlanFormModal'
import { PlansTable } from './PlansTable'

export function TreatmentPlansPage() {
	const t = useTranslations('TreatmentPlans')
	const summary = usePlansSummary()
	const removal = usePlanRemoval()
	const form = usePlanForm(removal.remove)
	const table = usePlansTable({
		removedIds: removal.removedIds,
		onEdit: form.openEdit,
		onRemove: removal.remove,
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
						value={summary.activePlans}
						footer={
							<>
								<StatDelta>{summary.startedThisMonth}</StatDelta>{' '}
								{t('startedInOctober')}
							</>
						}
					/>
					<StatCard
						label={t('awaitingConsent')}
						value={summary.awaitingConsent}
						delay={50}
						footer={summary.awaitingConsentValue}
					/>
					<StatCard
						label={t('patientConsent')}
						value={summary.consent}
						delay={100}
						footer={summary.consentTarget}
					/>
				</StatGrid>
				<PlansTable table={table} />
			</PageContent>
			<PlanFormModal form={form} />
		</>
	)
}
