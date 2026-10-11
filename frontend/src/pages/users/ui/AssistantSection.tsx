'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { useFormat } from '@/shared/lib/i18n'
import { ToggleChipsField } from '@/shared/ui/choice-chips'
import { FormField } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'

import { ASSISTANT_DOCTORS } from '../model/Options'
import type { TUserFormValues } from '../model/UserFormSchema'

export function AssistantSection() {
	const t = useTranslations('UserForm')

	const format = useFormat()

	const { control } = useFormContext<TUserFormValues>()

	return (
		<FormSection className='animate-fade' title={t('workingWithDoctors')}>
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
		</FormSection>
	)
}
