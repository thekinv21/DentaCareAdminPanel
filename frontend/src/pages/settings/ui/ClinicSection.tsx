'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { translateOptional, useFormat } from '@/shared/lib/i18n'
import { Field, formGrid2, inputClass } from '@/shared/ui/field'

import { CLINIC_CHAIRS, CLINIC_FIELDS } from '../model/Clinic'
import type { TSettingsFormValues } from '../model/SettingsForm'

export function ClinicSection() {
	const t = useTranslations('Settings')
	const { register } = useFormContext<TSettingsFormValues>()

	return (
		<div className='flex animate-fade flex-col gap-5.5 pt-0.5 pb-2'>
			<div className={formGrid2}>
				{CLINIC_FIELDS.map(field => (
					<Field
						key={field.name}
						label={translateOptional(t, field.label)}
						className={'wide' in field ? 'col-span-full' : undefined}
					>
						<input
							className={cn(inputClass, 'mono' in field && 'font-mono')}
							{...register(`clinic.${field.name}`)}
						/>
					</Field>
				))}
				<Field label={t('timeZone')}>
					<select className={inputClass} {...register('timeZone')}>
						<option value='Asia/Bishkek'>{t('asiaBishkekUtc6')}</option>
					</select>
				</Field>
				<Field label={t('currency')}>
					<select className={inputClass} {...register('currency')}>
						<option value='KGS'>{t('kyrgyzSomKgs')}</option>
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
				<div className='grid grid-cols-4 gap-x-4 gap-y-3.5 max-laptop:grid-cols-2 max-mobile:grid-cols-1'>
					{CLINIC_CHAIRS.map(chair => (
						<ChairCard key={chair.number} chair={chair} />
					))}
				</div>
			</div>
		</div>
	)
}

type TChairCardProps = { chair: (typeof CLINIC_CHAIRS)[number] }

function ChairCard({ chair }: TChairCardProps) {
	const t = useTranslations('Settings')
	const format = useFormat()

	return (
		<div className='flex flex-col gap-1 rounded-[14px] border border-line p-3'>
			<span className='font-mono text-[12.5px] text-ink-muted'>
				{t('chairCode', { n: chair.number })}
			</span>
			<span className='font-semibold'>{t(chair.specialty)}</span>
			<span className='text-[12.5px] leading-4.5 text-ink-muted'>
				{chair.doctors.map(format.name).join(' / ')}
			</span>
		</div>
	)
}
