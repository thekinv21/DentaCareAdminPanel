'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { useFieldProps } from '@/shared/lib/form'
import { useFormat } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'
import { ToggleChipsField } from '@/shared/ui/choice-chips'
import { Field, FormField, formGrid2 } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { Select } from '@/shared/ui/select'
import { SwitchCardField } from '@/shared/ui/switch-card'

import {
	ASSISTANT_DOCTORS,
	CHAIR_NUMBERS,
	QUALIFICATIONS,
} from '../model/Options'
import type { TUserFormValues } from '../model/UserFormSchema'

/**
 * Chair 4 is the hygiene room, assistants work at 1–3
 */
const ASSISTANT_CHAIRS = CHAIR_NUMBERS.slice(0, 3)

export function AssistantSection() {
	const t = useTranslations('UserForm')

	const format = useFormat()

	const { control, register } = useFormContext<TUserFormValues>()

	const inputProps = useFieldProps<TUserFormValues>()

	return (
		<FormSection
			className='animate-fade'
			title={t('workingWithDoctors')}
			aside={<Badge tone='info'>{t('assistantFields')}</Badge>}
		>
			<FormField
				name='doctors'
				as='div'
				label={t('assignedDoctors')}
				required
				hint={t('assignedDoctorsHint')}
			>
				<ToggleChipsField
					control={control}
					name='doctors'
					aria-label={t('assignedDoctors')}
					options={ASSISTANT_DOCTORS.map(doctor => ({
						id: doctor.id,
						label: format.name(doctor.name),
					}))}
				/>
			</FormField>
			<div className={formGrid2}>
				<Field label={t('mainChair')}>
					<Select {...register('chair', { valueAsNumber: true })}>
						{ASSISTANT_CHAIRS.map(chair => (
							<option key={chair} value={chair}>
								{t(`chair${chair}`)}
							</option>
						))}
					</Select>
				</Field>
				<Field label={t('qualification')}>
					<Select {...inputProps('qualification')}>
						{QUALIFICATIONS.map(qualification => (
							<option key={qualification} value={qualification}>
								{t(qualification)}
							</option>
						))}
					</Select>
				</Field>
				<SwitchCardField
					control={control}
					name='switches.writeOffMaterials'
					label={t('writeOffMaterials')}
					hint={t('writeOffMaterialsHint')}
					aria-label={t('writeOffMaterialsShort')}
				/>
				<SwitchCardField
					control={control}
					name='switches.markDentalChart'
					label={t('markDentalChart')}
					hint={t('markDentalChartHint')}
				/>
			</div>
		</FormSection>
	)
}
