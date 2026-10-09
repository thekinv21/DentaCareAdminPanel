'use client'

import { useTranslations } from 'next-intl'

import type { TAppointmentFormModel } from '../model/useAppointmentForm'

type TAppointmentSummaryProps = { form: TAppointmentFormModel }

export function AppointmentSummary({ form }: TAppointmentSummaryProps) {
	const t = useTranslations('AppointmentForm')
	const { summary } = form
	const rows = [
		[t('patient'), summary.patient],
		[t('doctor'), summary.doctor],
		[t('chair'), summary.chair],
		[t('servicesCount'), String(summary.services)],
	]

	return (
		<aside
			aria-label={t('appointmentSummary')}
			className='sticky top-0 flex w-65 shrink-0 flex-col gap-3 rounded-[18px] border border-line bg-raised p-4 max-[900px]:static max-[900px]:w-full'
		>
			<div className='text-[11px] leading-3.5 font-semibold tracking-[0.06em] text-ink-muted uppercase'>
				{t('summary')}
			</div>
			<div className='font-mono text-[22px] leading-7 font-extrabold'>
				{form.values.start}–{form.end}
			</div>
			<div className='text-[12.5px] text-ink-muted'>{summary.dateLong}</div>
			<ul className='flex flex-col gap-2 border-t border-line pt-2.5 text-[13px]'>
				{rows.map(([label, value]) => (
					<li key={label} className='flex justify-between gap-2'>
						<span className='text-ink-muted'>{label}</span>
						<span className='text-right font-semibold'>{value}</span>
					</li>
				))}
			</ul>
			<div className='flex items-baseline justify-between border-t border-line pt-2.5'>
				<span className='text-ink-muted'>{t('cost')}</span>
				<span className='font-mono text-lg font-bold'>{summary.total}</span>
			</div>
			{form.isEdit && (
				<div className='text-xs text-ink-muted'>{t('createdMeta')}</div>
			)}
		</aside>
	)
}
