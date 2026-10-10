'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { ToggleChips } from '@/shared/ui/choice-chips'
import { Field, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'

import { WORK_DAYS } from '../model/Options'
import type { TUserFormValues } from '../model/Schema'

export function ScheduleSection() {
	const t = useTranslations('UserForm')
	const { control, register } = useFormContext<TUserFormValues>()

	return (
		<FormSection title={t('workSchedule')}>
			<div className='flex flex-wrap items-end gap-3.5'>
				<Field as='div' label={t('workDays')}>
					<Controller
						control={control}
						name='days'
						render={({ field }) => (
							<ToggleChips
								aria-label={t('workDays')}
								options={WORK_DAYS.map(id => ({
									id: id as string,
									label: t(id),
								}))}
								value={field.value}
								onChange={field.onChange}
								chipClassName='min-w-11 justify-center'
							/>
						)}
					/>
				</Field>
				<Field label={t('start')} className='w-30'>
					<input
						className={`${inputClass} font-mono`}
						{...register('workStart')}
					/>
				</Field>
				<Field label={t('end')} className='w-30'>
					<input
						className={`${inputClass} font-mono`}
						{...register('workEnd')}
					/>
				</Field>
			</div>
		</FormSection>
	)
}
