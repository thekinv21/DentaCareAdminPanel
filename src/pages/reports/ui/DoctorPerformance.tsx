'use client'

import { useTranslations } from 'next-intl'

import { Avatar } from '@/shared/ui/avatar'
import { Card, CardHeader } from '@/shared/ui/card'
import { ProgressBar } from '@/shared/ui/progress'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import type { TReportModel } from '../model/useReport'

const ROW_DELAY_STEP_MS = 60

type TDoctorPerformanceProps = { report: TReportModel }

export function DoctorPerformance({ report }: TDoctorPerformanceProps) {
	const t = useTranslations('Reports')
	return (
		<Card
			as='section'
			className='animate-rise'
			style={{ animationDelay: '300ms' }}
		>
			<CardHeader
				title={t('dentistPerformance')}
				description={report.rangeLabel}
			/>
			<TableScroll>
				<Table className='min-w-170'>
					<thead>
						<tr>
							<Th>{t('dentist')}</Th>
							<Th align='right'>{t('visits')}</Th>
							<Th align='right'>{t('revenue')}</Th>
							<Th align='right'>{t('planConsent')}</Th>
							<Th className='w-50'>{t('chairUtilization')}</Th>
						</tr>
					</thead>
					<tbody>
						{report.doctors.map((doctor, index) => (
							<DoctorPerformanceRow
								key={doctor.id}
								doctor={doctor}
								animationDelay={index * ROW_DELAY_STEP_MS}
							/>
						))}
					</tbody>
				</Table>
			</TableScroll>
		</Card>
	)
}

type TDoctorPerformanceRowProps = {
	doctor: TReportModel['doctors'][number]
	animationDelay: number
}

function DoctorPerformanceRow({
	doctor,
	animationDelay,
}: TDoctorPerformanceRowProps) {
	return (
		<tr>
			<Td>
				<div className='flex items-center gap-2.5'>
					<Avatar initials={doctor.initials} tone={doctor.tone} />
					<div>
						<div className='font-semibold'>{doctor.name}</div>
						<div className='text-[12.5px] leading-4.5 text-ink-muted'>
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
						delay={animationDelay}
						className='grow'
					/>
					<span className='font-mono text-xs'>{doctor.chairLoad}%</span>
				</div>
			</Td>
		</tr>
	)
}
