'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { AuthField } from '@/widgets/auth-panel'

import { useFieldProps } from '@/shared/lib/form'
import { CheckboxLabel } from '@/shared/ui/checkbox'
import { PasswordInput } from '@/shared/ui/password-input'

import type { TResetValues } from '../model/ResetPasswordSchema'
import { PASSWORD_STRENGTH_ID, PasswordStrength } from './PasswordStrength'

export function ResetPasswordFields() {
	const t = useTranslations('ResetPassword')
	const { register } = useFormContext<TResetValues>()
	const inputProps = useFieldProps<TResetValues>()
	const passwordProps = inputProps('password')
	// the input is described by both its error and the live strength meter
	const passwordDescription = [
		passwordProps['aria-describedby'],
		PASSWORD_STRENGTH_ID,
	]
		.filter(Boolean)
		.join(' ')

	return (
		<>
			<AuthField name='password' label={t('newPassword')}>
				<PasswordInput
					id='password'
					autoComplete='new-password'
					placeholder={t('atLeast10Characters')}
					{...passwordProps}
					aria-describedby={passwordDescription}
				/>
			</AuthField>
			<PasswordStrength />
			<AuthField name='confirmPassword' label={t('repeatPassword')}>
				<PasswordInput
					id='confirmPassword'
					autoComplete='new-password'
					{...inputProps('confirmPassword')}
				/>
			</AuthField>
			<CheckboxLabel {...register('signOutOthers')}>
				{t('signOutOfAll')}
			</CheckboxLabel>
		</>
	)
}
