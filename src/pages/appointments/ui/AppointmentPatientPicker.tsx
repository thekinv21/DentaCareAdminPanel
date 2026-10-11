'use client'

import { useTranslations } from 'next-intl'
import { useController, useFormContext } from 'react-hook-form'

import { FormField } from '@/shared/ui/field'

import type { TAppointmentFormValues } from '../model/AppointmentFormSchema'
import type { TAppointmentFormModel } from '../model/useAppointmentForm'
import { PatientSearch } from './PatientSearch'
import { SelectedPatientCard } from './SelectedPatientCard'

type TAppointmentPatientPickerProps = {
	patient: TAppointmentFormModel['patient']
}

/**
 * The chosen patient, or a search to pick one
 */
export function AppointmentPatientPicker({
	patient,
}: TAppointmentPatientPickerProps) {
	const t = useTranslations('AppointmentForm')
	const { control } = useFormContext<TAppointmentFormValues>()
	const { field } = useController({ control, name: 'patientId' })

	return (
		<FormField name='patientId' as='div' label={t('patient')} required>
			{patient ? (
				<SelectedPatientCard
					patient={patient}
					onChange={() => field.onChange('')}
				/>
			) : (
				<PatientSearch onPick={field.onChange} />
			)}
		</FormField>
	)
}
