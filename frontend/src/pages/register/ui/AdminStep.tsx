'use client'

import { useTranslations } from 'next-intl'

import { AuthField } from '@/widgets/auth-panel'

import { useFieldError, useFieldProps } from '@/shared/lib/form'
import { Button } from '@/shared/ui/button'
import { inputLgClass } from '@/shared/ui/field'
import { PasswordInput } from '@/shared/ui/password-input'
import { PhoneInput } from '@/shared/ui/phone-input'

import type { TRegisterInput } from '../model/Schema'

const linkClass = 'font-semibold text-brand no-underline hover:underline'

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
				<label className='inline-flex cursor-pointer items-start gap-2.5 text-sm leading-5'>
					<input
						type='checkbox'
						className='mt-px size-4.5 shrink-0 accent-brand'
						{...inputProps('agree')}
					/>
					<span>
						{t('iAcceptThe')}{' '}
						<a href='#' className={linkClass}>
							{t('terms')}
						</a>{' '}
						·{' '}
						<a href='#' className={linkClass}>
							{t('privacy')}
						</a>
					</span>
				</label>
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
