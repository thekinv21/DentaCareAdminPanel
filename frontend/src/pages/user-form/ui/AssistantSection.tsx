'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { useFormat } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'
import { ToggleChips } from '@/shared/ui/choice-chips'
import { Field, formGrid2, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'

import { ASSISTANT_DOCTORS, CHAIRS, QUALIFICATIONS } from '../model/Options'
import type { TUserFormValues } from '../model/Schema'
import { UserSwitch } from './UserSwitch'

export function AssistantSection() {
	const t = useTranslations('UserForm')
	const format = useFormat()
	const { control, register } = useFormContext<TUserFormValues>()

	return (
		<FormSection
			className='animate-fade'
			title={t('workingWithDoctors')}
			aside={<Badge tone='info'>{t('assistantFields')}</Badge>}
		>
			<Field
				as='div'
				label={t('assignedDoctors')}
				required
				hint={t('assignedDoctorsHint')}
			>
				<Controller
					control={control}
					name='doctors'
					render={({ field }) => (
						<ToggleChips
							aria-label={t('assignedDoctors')}
							options={ASSISTANT_DOCTORS.map(doc => ({
								id: doc.id as string,
								label: format.name(doc.name),
							}))}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</Field>
			<div className={formGrid2}>
				<Field label={t('mainChair')}>
					<select className={inputClass} {...register('chair')}>
						{CHAIRS.slice(0, 3).map(chair => (
							<option key={chair} value={chair}>
								{t(chair)}
							</option>
						))}
					</select>
				</Field>
				<Field label={t('qualification')}>
					<select className={inputClass} {...register('qualification')}>
						{QUALIFICATIONS.map(item => (
							<option key={item} value={item}>
								{t(item)}
							</option>
						))}
					</select>
				</Field>
				<UserSwitch
					name='stock'
					label={t('writeOffMaterials')}
					hint={t('writeOffMaterialsHint')}
					ariaLabel={t('writeOffMaterialsShort')}
				/>
				<UserSwitch
					name='chart'
					label={t('markDentalChart')}
					hint={t('markDentalChartHint')}
				/>
			</div>
		</FormSection>
	)
}
