'use client'

import { useTranslations } from 'next-intl'

import { AuthField } from '@/widgets/auth-panel'

import { useFieldProps } from '@/shared/lib/form'
import { PhoneInput } from '@/shared/ui/phone-input'

import type { TForgotValues } from '../model/ForgotPasswordSchema'

export function ForgotPasswordField() {
	const t = useTranslations('ForgotPassword')
	const inputProps = useFieldProps<TForgotValues>()

	return (
		<AuthField name='phone' label={t('phoneNumber')} hint={t('ifYouSignIn')}>
			<PhoneInput
				id='phone'
				autoComplete='tel'
				placeholder='555 123 456'
				{...inputProps('phone')}
			/>
		</AuthField>
	)
}
