'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { translateOptional, useFormat } from '@/shared/lib/i18n'
import { Field, formGrid2, inputClass } from '@/shared/ui/field'

import { CHAIRS } from '../model/Clinic'

const TEXT_FIELDS = [
	{ label: 'clinicName', value: 'dentaAlaToo' },
	{ label: 'legalEntity', value: 'dentaClinicLlc' },
	{ label: 'tin', value: '02410202610153', mono: true },
	{
		label: 'kyrgyzMinistryOfHealth',
		value: 'no0417MzValid',
		mono: true,
	},
	{ label: 'address', value: 'n112ToktogulSt1st', wide: true },
	{ label: 'receptionPhone', value: '+996 312 90 41 41', mono: true },
	{ label: 'Email', value: 'info@denta.kg' },
]

export function ClinicSection() {
	const t = useTranslations('Settings')
	const format = useFormat()
	return (
		<div className='flex animate-fade flex-col gap-5.5 pt-0.5 pb-2'>
			<div className={formGrid2}>
				{TEXT_FIELDS.map(field => (
					<Field
						key={field.label}
						label={translateOptional(t, field.label)}
						className={field.wide ? 'col-span-full' : undefined}
					>
						<input
							className={cn(inputClass, field.mono && 'font-mono')}
							defaultValue={translateOptional(t, field.value)}
						/>
					</Field>
				))}
				<Field label={t('timeZone')}>
					<select className={inputClass}>
						<option>{t('asiaBishkekUtc6')}</option>
					</select>
				</Field>
				<Field label={t('currency')}>
					<select className={inputClass}>
						<option>{t('kyrgyzSomKgs')}</option>
					</select>
				</Field>
			</div>
			<div>
				<p className='font-display text-[15px] leading-6 font-bold'>
					{t('roomsAndChairs')}
				</p>
				<p className='mb-2.5 text-[12.5px] leading-4.5 text-ink-muted'>
					{t('usedInTheSchedule')}
				</p>
				<div className='grid grid-cols-4 gap-x-4 gap-y-3.5 max-[1100px]:grid-cols-2 max-[720px]:grid-cols-1'>
					{CHAIRS.map(chair => (
						<div
							key={chair.id}
							className='flex flex-col gap-1 rounded-[14px] border border-line p-3'
						>
							<span className='font-mono text-[12.5px] text-ink-muted'>
								{t(chair.id)}
							</span>
							<span className='font-semibold'>{t(chair.name)}</span>
							<span className='text-[12.5px] leading-4.5 text-ink-muted'>
								{format.name(chair.doctor)}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
