'use client'

import { use } from 'react'

import Link from 'next/link'

import { Play } from 'lucide-react'

import { DentalChart } from '@/widgets/dental-chart'
import { PageContent, PageHeader } from '@/widgets/page-header'

import { useI18n } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { Button } from '@/shared/ui/button'

import { useProfileTabs } from '../model/use-profile-tabs'
import { PatientSummaryCard } from './PatientSummaryCard'
import { PaymentsSection } from './PaymentsSection'
import { TreatmentPlanSection } from './TreatmentPlanSection'
import { VisitHistorySection } from './VisitHistorySection'

export function PatientProfilePage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = use(params)
	const { t } = useI18n()
	const tabs = useProfileTabs()

	return (
		<>
			<PageHeader
				crumb={
					<nav aria-label='Breadcrumb'>
						<Link
							href={ROUTES.patients}
							className='text-inherit no-underline hover:text-ink'
						>
							{t('Пациенты')}
						</Link>
						<span aria-hidden='true' className='px-1.5'>
							/
						</span>
						<span className='font-mono'>{decodeURIComponent(id)}</span>
					</nav>
				}
				title={t('Карта пациента')}
				actions={
					<Button variant='primary'>
						<Play size={15} fill='currentColor' aria-hidden='true' />
						{t('Начать приём')}
					</Button>
				}
			/>
			<PageContent>
				<PatientSummaryCard tabs={tabs} />
				{tabs.tab === 'chart' && <DentalChart />}
				{tabs.tab === 'plan' && <TreatmentPlanSection />}
				{tabs.tab === 'history' && <VisitHistorySection />}
				{tabs.tab === 'payments' && <PaymentsSection />}
			</PageContent>
		</>
	)
}
