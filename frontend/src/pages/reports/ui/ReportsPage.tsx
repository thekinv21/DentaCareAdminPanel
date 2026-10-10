'use client'

import { Download } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Controller } from 'react-hook-form'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'
import { Segmented } from '@/shared/ui/segmented'
import { Delta, StatCard, StatGrid } from '@/shared/ui/stat-card'

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
				crumb={report.rangeLabel}
				title={t('reports')}
				search={false}
				tools={
					<Controller
						control={report.filters.control}
						name='range'
						render={({ field }) => (
							<Segmented
								aria-label={t('period')}
								options={report.ranges}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				}
				actions={
					<Button variant='primary'>
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
								<Delta>{report.kpi.revenueDelta}</Delta> {vsPrevious}
							</>
						}
					/>
					<StatCard
						label={t('newPatients')}
						value={report.kpi.newPatients}
						delay={50}
						footer={
							<>
								<Delta>{report.kpi.newPatientsDelta}</Delta> {vsPrevious}
							</>
						}
					/>
					<StatCard
						label={t('averageBill')}
						value='4 850'
						unit={t('som')}
						delay={100}
						footer={
							<>
								<Delta>+4%</Delta> {vsPrevious}
							</>
						}
					/>
					<StatCard
						label={t('noShows')}
						value='4,8%'
						delay={150}
						footer={
							<>
								<Delta>{t('n11PP')}</Delta> {t('afterSmsReminders')}
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
