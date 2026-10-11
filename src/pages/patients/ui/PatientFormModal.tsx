'use client'

import { UserRoundPlus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { Modal, ModalDeleteButton, ModalFooter } from '@/shared/ui/modal'

import type { TPatientFormModel } from '../model/usePatientForm'
import { PatientConsentFields } from './PatientConsentFields'
import { PatientMedicalFields } from './PatientMedicalFields'
import { PatientPersonalFields } from './PatientPersonalFields'

type TPatientFormModalProps = { form: TPatientFormModel }

export function PatientFormModal({ form }: TPatientFormModalProps) {
	const t = useTranslations('PatientForm')

	return (
		<FormProvider {...form.methods}>
			<Modal
				open={form.open}
				onClose={form.close}
				onSubmit={form.submit}
				busy={form.saving}
				wide
				icon={<UserRoundPlus size={20} aria-hidden='true' />}
				title={form.title}
				subtitle={form.subtitle}
				footer={
					<ModalFooter
						onCancel={form.close}
						saving={form.saving}
						submitLabel={form.isEdit ? t('saveChanges') : t('createRecord')}
						leading={
							form.isEdit && (
								<ModalDeleteButton onClick={form.remove}>
									{t('deletePatient')}
								</ModalDeleteButton>
							)
						}
					/>
				}
			>
				<PatientPersonalFields duplicateError={form.duplicateError} />
				<PatientMedicalFields />
				<PatientConsentFields />
			</Modal>
		</FormProvider>
	)
}
