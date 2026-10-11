'use client'

import { Download } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'
import { SegmentedField } from '@/shared/ui/segmented'
import { StatCard, StatDelta, StatGrid } from '@/shared/ui/stat-card'

import { useReport } from '../model/useReport'
import { DoctorPerformance } from './DoctorPerformance'
import { ReportCharts } from './ReportCharts'

export function ReportsPage() {
	const t = useTranslations('Reports')
	const report = useReport()
	const vsPrevious = t('vsPreviousPeriod')

	return (
		<>
			<PageHeader
				title={t('reports')}
				search={false}
				tools={
					<SegmentedField
						control={report.filters.control}
						name='range'
						aria-label={t('period')}
						options={report.ranges}
					/>
				}
				actions={
					// PDF export comes with the backend
					<Button variant='primary' disabled>
						<Download size={17} aria-hidden='true' />
						{t('exportPdf')}
					</Button>
				}
			/>
			<PageContent>
				<StatGrid label={t('metrics')}>
					<StatCard
						label={t('revenue')}
						value={report.revenue}
						footer={
							<>
								<StatDelta>{report.revenueChange}</StatDelta> {vsPrevious}
							</>
						}
					/>
					<StatCard
						label={t('newPatients')}
						value={report.newPatients}
						delay={50}
						footer={
							<>
								<StatDelta>{report.newPatientsChange}</StatDelta> {vsPrevious}
							</>
						}
					/>
					<StatCard
						label={t('averageBill')}
						value={report.averageBill}
						unit={t('som')}
						delay={100}
						footer={
							<>
								<StatDelta>{report.averageBillChange}</StatDelta> {vsPrevious}
							</>
						}
					/>
					<StatCard
						label={t('noShows')}
						value={report.noShows}
						delay={150}
						footer={
							<>
								<StatDelta>{report.noShowChange}</StatDelta>{' '}
								{t('afterSmsReminders')}
							</>
						}
					/>
				</StatGrid>
				<ReportCharts report={report} />
				<DoctorPerformance report={report} />
			</PageContent>
		</>
	)
}
