'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { Badge } from '@/shared/ui/badge'
import { Field, formGrid3, inputClass } from '@/shared/ui/field'
import { Switch } from '@/shared/ui/switch'

import { WORK_DAYS } from '../model/Clinic'
import type { TSettingsFormValues } from '../model/SettingsForm'

const timeClass = cn(inputClass, 'w-30 font-mono')

export function HoursSection() {
	const t = useTranslations('Settings')
	const { control, register } = useFormContext<TSettingsFormValues>()
	const hours = useWatch({ control, name: 'hours' })

	return (
		<div className='animate-fade pb-2'>
			<div className={cn(formGrid3, 'mb-2')}>
				<Field label={t('slotInterval')}>
					<select className={inputClass} {...register('slotInterval')}>
						<option value='15'>{t('n15Minutes')}</option>
						<option value='30'>{t('n30Minutes')}</option>
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
				{WORK_DAYS.map(day => {
					const name = t(day.name)
					const { open, from, to } = hours[day.id]
					return (
						<li
							key={day.id}
							className='flex flex-wrap items-center gap-3.5 border-b border-line py-3 last:border-b-0'
						>
							<Controller
								control={control}
								name={`hours.${day.id}.open`}
								render={({ field }) => (
									<Switch
										checked={field.value}
										onChange={field.onChange}
										aria-label={`${name}${t('workingDay')}`}
									/>
								)}
							/>
							<span className='w-32.5 font-semibold'>{name}</span>
							{open ? (
								<>
									<span className='flex items-center gap-2'>
										<input
											type='time'
											className={timeClass}
											aria-label={`${name}${t('start')}`}
											{...register(`hours.${day.id}.from`)}
										/>
										<span className='text-ink-muted'>—</span>
										<input
											type='time'
											className={timeClass}
											aria-label={`${name}${t('end')}`}
											{...register(`hours.${day.id}.to`)}
										/>
									</span>
									<span className='ml-auto text-[12.5px] text-ink-muted'>
										{parseInt(to) - parseInt(from)} {t('h')}
									</span>
								</>
							) : (
								<Badge>{t('dayOff')}</Badge>
							)}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
