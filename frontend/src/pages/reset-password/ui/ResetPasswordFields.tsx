'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { AuthField } from '@/widgets/auth-panel'

import { useFieldProps } from '@/shared/lib/form'
import { PasswordInput } from '@/shared/ui/password-input'

import type { TResetValues } from '../model/Schema'
import { PasswordStrength } from './PasswordStrength'

export function ResetPasswordFields() {
	const t = useTranslations('ResetPassword')
	const { register } = useFormContext<TResetValues>()
	const inputProps = useFieldProps<TResetValues>()

	return (
		<>
			<AuthField name='password' label={t('newPassword')}>
				<PasswordInput
					id='password'
					autoComplete='new-password'
					placeholder={t('atLeast10Characters')}
					{...inputProps('password')}
					aria-describedby='password-strength'
				/>
			</AuthField>
			<PasswordStrength />
			<AuthField name='confirm' label={t('repeatPassword')}>
				<PasswordInput
					id='confirm'
					autoComplete='new-password'
					{...inputProps('confirm')}
				/>
			</AuthField>
			<label className='inline-flex cursor-pointer items-start gap-2.5 text-sm leading-5'>
				<input
					type='checkbox'
					className='mt-px size-4.5 shrink-0 accent-brand'
					{...register('signOutOthers')}
				/>
				{t('signOutOfAll')}
			</label>
		</>
	)
}
