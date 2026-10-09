'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'
import { Delta, StatCard, StatGrid } from '@/shared/ui/stat-card'

import { PlansTable } from './PlansTable'

export function TreatmentPlansPage() {
	const t = useTranslations('TreatmentPlans')
	return (
		<>
			<PageHeader
				crumb={t('planApprovalAndCompletion')}
				title={t('treatmentPlans')}
				actions={
					<Button variant='primary'>
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
				<PlansTable />
			</PageContent>
		</>
	)
}
