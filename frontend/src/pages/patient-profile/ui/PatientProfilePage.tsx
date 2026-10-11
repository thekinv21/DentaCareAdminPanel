'use client'

import { use } from 'react'

import { Play } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { DentalChart } from '@/widgets/dental-chart'
import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'

import { safeDecode } from '../lib/SafeDecode'
import { usePatientCard } from '../model/usePatientCard'
import {
	PATIENT_TABPANEL_ID,
	patientTabId,
	usePatientTabs,
} from '../model/usePatientTabs'
import { PatientSummaryCard } from './PatientSummaryCard'
import { PaymentsSection } from './PaymentsSection'
import { TreatmentPlanSection } from './TreatmentPlanSection'
import { VisitHistorySection } from './VisitHistorySection'

type TPatientProfilePageProps = {
	params: Promise<{ id: string }>
}

export function PatientProfilePage({ params }: TPatientProfilePageProps) {
	const patientId = safeDecode(use(params).id)
	const t = useTranslations('PatientProfile')
	const patient = usePatientCard(patientId)
	const tabs = usePatientTabs()

	return (
		<>
			<PageHeader
				title={t('patientRecord')}
				actions={
					// starting a visit comes with the realtime queue
					<Button variant='primary' disabled>
						<Play size={15} fill='currentColor' aria-hidden='true' />
						{t('startVisit')}
					</Button>
				}
			/>
			<PageContent>
				<PatientSummaryCard patient={patient} tabs={tabs} />
				<div
					id={PATIENT_TABPANEL_ID}
					role='tabpanel'
					aria-labelledby={patientTabId(tabs.tab)}
					className='contents'
				>
					{tabs.tab === 'chart' && <DentalChart />}
					{tabs.tab === 'plan' && <TreatmentPlanSection />}
					{tabs.tab === 'history' && <VisitHistorySection />}
					{tabs.tab === 'payments' && <PaymentsSection />}
				</div>
			</PageContent>
		</>
	)
}
