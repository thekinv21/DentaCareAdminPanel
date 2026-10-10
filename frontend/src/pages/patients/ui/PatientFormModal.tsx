'use client'

import { Trash2, UserRoundPlus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { Modal } from '@/shared/ui/modal'
import { Spinner } from '@/shared/ui/spinner'

import type { TPatientFormModel } from '../model/usePatientForm'
import { PatientMedicalFields } from './PatientMedicalFields'
import { PatientPersonalFields } from './PatientPersonalFields'

type TPatientFormModalProps = { form: TPatientFormModel }

export function PatientFormModal({ form }: TPatientFormModalProps) {
	const t = useTranslations('PatientForm')
	const tCommon = useTranslations('Common')

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
					<>
						{form.isEdit && (
							<Button variant='dangerGhost' onClick={form.remove}>
								<Trash2 size={16} aria-hidden='true' />
								{t('deletePatient')}
							</Button>
						)}
						<span className='flex-1' />
						<Button onClick={form.close}>{tCommon('cancel')}</Button>
						<Button type='submit' variant='primary' aria-busy={form.saving}>
							{form.saving && <Spinner />}
							{form.saving
								? tCommon('saving')
								: form.isEdit
									? t('saveChanges')
									: t('createRecord')}
						</Button>
					</>
				}
			>
				<PatientPersonalFields duplicateError={form.duplicateError} />
				<PatientMedicalFields />
			</Modal>
		</FormProvider>
	)
}
