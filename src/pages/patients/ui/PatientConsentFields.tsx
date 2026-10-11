'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { FieldError, formGrid2 } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { SwitchCardField } from '@/shared/ui/switch-card'

import type { TPatientFormValues } from '../model/PatientFormSchema'

export function PatientConsentFields() {
	const t = useTranslations('PatientForm')
	const { control } = useFormContext<TPatientFormValues>()

	return (
		<FormSection title={t('consents')}>
			<div className={formGrid2}>
				<div className='flex flex-col gap-1.5'>
					<SwitchCardField
						control={control}
						name='consent'
						label={t('dataConsent')}
						hint={t('dataConsentHint')}
					/>
					<FieldError name='consent' />
				</div>
				<SwitchCardField
					control={control}
					name='smsReminders'
					label={t('smsReminders')}
					hint={t('smsRemindersHint')}
				/>
			</div>
		</FormSection>
	)
}
