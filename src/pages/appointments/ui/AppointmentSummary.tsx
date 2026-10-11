'use client'

import { useTranslations } from 'next-intl'

import { Overline } from '@/shared/ui/overline'

import { useAppointmentSummary } from '../model/useAppointmentSummary'

type TAppointmentSummaryProps = { patientName?: string; isEdit: boolean }

export function AppointmentSummary({
	patientName,
	isEdit,
}: TAppointmentSummaryProps) {
	const t = useTranslations('AppointmentForm')
	const summary = useAppointmentSummary(patientName)

	return (
		<aside
			aria-label={t('appointmentSummary')}
			className='sticky top-0 flex w-65 shrink-0 flex-col gap-3 rounded-[18px] border border-line bg-raised p-4 max-tablet:static max-tablet:w-full'
		>
			<Overline>{t('summary')}</Overline>
			<div className='font-mono text-[22px] leading-7 font-extrabold'>
				{summary.timeRange}
			</div>
			<div className='text-[12.5px] text-ink-muted'>{summary.dateLong}</div>
			<ul className='flex flex-col gap-2 border-t border-line pt-2.5 text-[13px]'>
				{summary.rows.map(row => (
					<li key={row.label} className='flex justify-between gap-2'>
						<span className='text-ink-muted'>{row.label}</span>
						<span className='text-right font-semibold'>{row.value}</span>
					</li>
				))}
			</ul>
			<div className='flex items-baseline justify-between border-t border-line pt-2.5'>
				<span className='text-ink-muted'>{t('cost')}</span>
				<span className='font-mono text-lg font-bold'>{summary.total}</span>
			</div>
			{isEdit && (
				<div className='text-xs text-ink-muted'>{t('createdMeta')}</div>
			)}
		</aside>
	)
}
