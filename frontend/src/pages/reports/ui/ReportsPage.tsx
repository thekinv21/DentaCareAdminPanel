'use client'

import { Download } from 'lucide-react'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { useI18n } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'
import { Segmented } from '@/shared/ui/segmented'
import { Delta, StatCard, StatGrid } from '@/shared/ui/stat-card'

import { useReport } from '../model/use-report'
import { DoctorPerformance } from './DoctorPerformance'
import { ReportCharts } from './ReportCharts'

export function ReportsPage() {
	const { t } = useI18n()
	const report = useReport()
	const vsPrevious = t('к прошлому периоду')

	return (
		<>
			<PageHeader
				crumb={report.rangeLabel}
				title={t('Отчёты')}
				search={false}
				tools={
					<Segmented
						aria-label={t('Период')}
						options={report.ranges}
						value={report.range}
						onChange={report.setRange}
					/>
				}
				actions={
					<Button variant='primary'>
						<Download size={17} aria-hidden='true' />
						{t('Экспорт PDF')}
					</Button>
				}
			/>
			<PageContent>
				<StatGrid label={t('Показатели')}>
					<StatCard
						label={t('Выручка')}
						value={report.revenue}
						footer={
							<>
								<Delta>{report.kpi.revenueDelta}</Delta> {vsPrevious}
							</>
						}
					/>
					<StatCard
						label={t('Новые пациенты')}
						value={report.kpi.newPatients}
						delay={50}
						footer={
							<>
								<Delta>{report.kpi.newPatientsDelta}</Delta> {vsPrevious}
							</>
						}
					/>
					<StatCard
						label={t('Средний чек')}
						value='4 850'
						unit={t('сом')}
						delay={100}
						footer={
							<>
								<Delta>+4%</Delta> {vsPrevious}
							</>
						}
					/>
					<StatCard
						label={t('Неявки')}
						value='4,8%'
						delay={150}
						footer={
							<>
								<Delta>{t('−1,1 п.п.')}</Delta> {t('после SMS-напоминаний')}
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
