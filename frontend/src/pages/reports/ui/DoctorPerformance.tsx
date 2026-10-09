'use client'

import { useI18n } from '@/shared/lib/i18n'
import { Avatar } from '@/shared/ui/avatar'
import { Card, CardHeader } from '@/shared/ui/card'
import { ProgressBar } from '@/shared/ui/progress'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import type { ReportModel } from '../model/use-report'

export function DoctorPerformance({ report }: { report: ReportModel }) {
	const { t } = useI18n()
	return (
		<Card
			as='section'
			className='animate-rise'
			style={{ animationDelay: '300ms' }}
		>
			<CardHeader
				title={t('Эффективность врачей')}
				description={report.rangeLabel}
			/>
			<TableScroll>
				<Table className='min-w-[680px]'>
					<thead>
						<tr>
							<Th>{t('Врач')}</Th>
							<Th align='right'>{t('Приёмы')}</Th>
							<Th align='right'>{t('Выручка')}</Th>
							<Th align='right'>{t('Согласие на планы')}</Th>
							<Th className='w-[200px]'>{t('Загрузка кресла')}</Th>
						</tr>
					</thead>
					<tbody>
						{report.doctors.map((doctor, index) => (
							<tr key={doctor.name}>
								<Td>
									<div className='flex items-center gap-2.5'>
										<Avatar initials={doctor.initials} tone={doctor.tone} />
										<div>
											<div className='font-semibold'>{doctor.name}</div>
											<div className='text-[12.5px] leading-[18px] text-ink-muted'>
												{doctor.specialty}
											</div>
										</div>
									</div>
								</Td>
								<Td mono align='right'>
									{doctor.visits}
								</Td>
								<Td mono align='right' className='font-semibold'>
									{doctor.revenue}
								</Td>
								<Td mono align='right'>
									{doctor.planConsent}%
								</Td>
								<Td>
									<div className='flex items-center gap-2'>
										<ProgressBar
											value={doctor.chairLoad}
											delay={index * 60}
											className='flex-grow'
										/>
										<span className='font-mono text-xs'>
											{doctor.chairLoad}%
										</span>
									</div>
								</Td>
							</tr>
						))}
					</tbody>
				</Table>
			</TableScroll>
		</Card>
	)
}
