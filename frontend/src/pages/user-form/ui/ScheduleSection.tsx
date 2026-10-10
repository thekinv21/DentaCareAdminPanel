'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { ToggleChipsField } from '@/shared/ui/choice-chips'
import { Field, FormField, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'

import { SCHEDULE_DAYS } from '../model/Options'
import type { TUserFormValues } from '../model/UserFormSchema'

export function ScheduleSection() {
	const t = useTranslations('UserForm')
	const { control } = useFormContext<TUserFormValues>()
	const inputProps = useFieldProps<TUserFormValues>()

	return (
		<FormSection title={t('workSchedule')}>
			<div className='flex flex-wrap items-end gap-3.5'>
				<Field as='div' label={t('workDays')}>
					<ToggleChipsField
						control={control}
						name='days'
						aria-label={t('workDays')}
						options={SCHEDULE_DAYS.map(day => ({
							id: day,
							label: t(day),
						}))}
						chipClassName='min-w-11 justify-center'
					/>
				</Field>
				<FormField name='workStart' label={t('start')} className='w-30'>
					<input
						type='time'
						className={cn(inputClass, 'font-mono')}
						{...inputProps('workStart')}
					/>
				</FormField>
				<FormField name='workEnd' label={t('end')} className='w-30'>
					<input
						type='time'
						className={cn(inputClass, 'font-mono')}
						{...inputProps('workEnd')}
					/>
				</FormField>
			</div>
		</FormSection>
	)
}
