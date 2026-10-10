'use client'

import { useTranslations } from 'next-intl'

import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'

import { PREVIEW_APPOINTMENT } from '../config/BrandPanel'
import { PreviewTag } from './PreviewTag'

/**
 * Decorative "next patient" card of the brand panel
 */
export function NextPatientPreview() {
	const t = useTranslations('AuthPanel')

	const format = useFormat()

	const patientName = format.name(PREVIEW_APPOINTMENT.patientName)

	return (
		<div
			aria-hidden='true'
			className='flex max-w-100 animate-float flex-col gap-3 rounded-3xl bg-surface p-4.5 text-ink shadow-[0_30px_60px_-24px_rgba(0,0,0,0.5)]'
		>
			<div className='flex items-center justify-between'>
				<span className='text-xs font-bold tracking-[0.04em] text-accent uppercase'>
					{t('nextInChairAt', { time: PREVIEW_APPOINTMENT.time })}
				</span>
				<span className='size-2 rounded-full bg-accent' />
			</div>
			<div className='flex items-center gap-3'>
				<span className='flex size-11 items-center justify-center rounded-full bg-brand-soft font-bold text-brand-strong'>
					{getInitials(patientName)}
				</span>
				<div>
					<div className='font-display text-lg font-bold'>{patientName}</div>
					<div className='text-[13px] text-ink-muted'>
						{t('rootCanalTreatment')} ·{' '}
						<span className='font-mono'>{PREVIEW_APPOINTMENT.tooth}</span> ·{' '}
						{t('chairNumber', { n: PREVIEW_APPOINTMENT.chair })}
					</div>
				</div>
			</div>
			<div className='flex flex-wrap gap-1.5'>
				<PreviewTag tone='danger'>{t('allergyPenicillin')}</PreviewTag>
				<PreviewTag tone='info'>{t('mhif')}</PreviewTag>
			</div>
		</div>
	)
}
