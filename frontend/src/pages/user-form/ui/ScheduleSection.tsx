'use client'

import { useTranslations } from 'next-intl'

import { ToggleChips } from '@/shared/ui/choice-chips'
import { Field, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'

import { WORK_DAYS } from '../model/Options'
import type { TUserFormModel } from '../model/useUserForm'

type TScheduleSectionProps = { form: TUserFormModel }

export function ScheduleSection({ form }: TScheduleSectionProps) {
	const t = useTranslations('UserForm')

	return (
		<FormSection title={t('workSchedule')}>
			<div className='flex flex-wrap items-end gap-3.5'>
				<Field as='div' label={t('workDays')}>
					<ToggleChips
						aria-label={t('workDays')}
						options={WORK_DAYS.map(id => ({ id: id as string, label: t(id) }))}
						value={form.choices.days}
						onChange={value => form.choose('days', value)}
						chipClassName='min-w-11 justify-center'
					/>
				</Field>
				<Field label={t('start')} className='w-30'>
					<input
						className={`${inputClass} font-mono`}
						{...form.field('workStart')}
					/>
				</Field>
				<Field label={t('end')} className='w-30'>
					<input
						className={`${inputClass} font-mono`}
						{...form.field('workEnd')}
					/>
				</Field>
			</div>
		</FormSection>
	)
}
