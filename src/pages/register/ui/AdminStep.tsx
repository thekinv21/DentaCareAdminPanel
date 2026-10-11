'use client'

import { useTranslations } from 'next-intl'

import { AuthField } from '@/widgets/auth-panel'

import { useFieldError, useFieldProps } from '@/shared/lib/form'
import { Button } from '@/shared/ui/button'
import { CheckboxLabel } from '@/shared/ui/checkbox'
import { inputLgClass } from '@/shared/ui/field'
import { PasswordInput } from '@/shared/ui/password-input'
import { PhoneInput } from '@/shared/ui/phone-input'

import type { TRegisterInput } from '../model/RegisterSchema'

// terms and privacy pages don't exist yet, so these are plain text for now
const linkClass = 'font-semibold text-brand'

type TAdminStepProps = { onBack: () => void }

export function AdminStep({ onBack }: TAdminStepProps) {
	const t = useTranslations('Register')
	const inputProps = useFieldProps<TRegisterInput>()
	const agreeError = useFieldError('agree')

	return (
		<div className='flex animate-fade flex-col gap-4'>
			<AuthField name='fullName' label={t('fullName')}>
				<input
					id='fullName'
					autoComplete='name'
					className={inputLgClass}
					{...inputProps('fullName')}
				/>
			</AuthField>
			<AuthField
				name='mobile'
				label={t('mobilePhone')}
				hint={t('wellTextYouA')}
			>
				<PhoneInput
					id='mobile'
					placeholder='555 123 456'
					{...inputProps('mobile')}
				/>
			</AuthField>
			<AuthField name='password' label={t('password')}>
				<PasswordInput
					id='password'
					autoComplete='new-password'
					placeholder={t('atLeast10Characters')}
					{...inputProps('password')}
				/>
			</AuthField>
			<div className='flex flex-col gap-1.5'>
				<CheckboxLabel {...inputProps('agree')}>
					{t('iAcceptThe')} <span className={linkClass}>{t('terms')}</span> ·{' '}
					<span className={linkClass}>{t('privacy')}</span>
				</CheckboxLabel>
				{agreeError && (
					<span id='agree-error' className='text-[12.5px] text-danger'>
						{agreeError}
					</span>
				)}
			</div>
			<div className='flex gap-2.5'>
				<Button size='lg' onClick={onBack}>
					{t('back')}
				</Button>
				<Button type='submit' variant='primary' size='lg' className='flex-1'>
					{t('createAccount')}
				</Button>
			</div>
		</div>
	)
}
