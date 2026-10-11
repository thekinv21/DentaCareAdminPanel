'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { WEEK_DAYS } from '@/shared/lib/date'
import { Field, formGrid3, inputClass } from '@/shared/ui/field'

import { SLOT_INTERVALS, type TSettingsFormValues } from '../model/SettingsForm'
import { WorkDayRow } from './WorkDayRow'

export function HoursSection() {
	const t = useTranslations('Settings')
	const { register } = useFormContext<TSettingsFormValues>()

	return (
		<div className='animate-fade pb-2'>
			<div className={cn(formGrid3, 'mb-2')}>
				<Field label={t('slotInterval')}>
					<select className={inputClass} {...register('slotInterval')}>
						{SLOT_INTERVALS.map(minutes => (
							<option key={minutes} value={minutes}>
								{t('slotMinutes', { n: minutes })}
							</option>
						))}
					</select>
				</Field>
				<Field label={t('lunch')}>
					<input
						className={cn(inputClass, 'font-mono')}
						{...register('lunch')}
					/>
				</Field>
				<Field label={t('onlineBooking')}>
					<select className={inputClass} {...register('bookingWindow')}>
						<option value='next30'>{t('next30Days')}</option>
						<option value='last14'>{t('last14Days')}</option>
					</select>
				</Field>
			</div>
			<ul>
				{WEEK_DAYS.map(day => (
					<WorkDayRow key={day} day={day} />
				))}
			</ul>
		</div>
	)
}
