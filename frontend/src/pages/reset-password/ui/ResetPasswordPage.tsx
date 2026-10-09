'use client'

import Link from 'next/link'

import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { AuthField, AuthHeading, AuthStack } from '@/widgets/auth-panel'

import { ROUTES } from '@/shared/routes'
import { Button, buttonClass } from '@/shared/ui/button'
import { PasswordInput } from '@/shared/ui/password-input'

import { useResetPassword } from '../model/useResetPassword'
import { PasswordStrength } from './PasswordStrength'

export function ResetPasswordPage() {
	const t = useTranslations('ResetPassword')
	const reset = useResetPassword()

	if (reset.done) {
		return (
			<AuthStack>
				<AuthHeading
					icon={<Check size={26} aria-hidden='true' />}
					iconTone='ok'
					title={t('passwordUpdated')}
					subtitle={t('signInWithYour')}
				/>
				<Link
					href={ROUTES.login}
					className={buttonClass({
						variant: 'primary',
						size: 'lg',
						block: true,
					})}
				>
					{t('goToSignIn')}
				</Link>
			</AuthStack>
		)
	}

	return (
		<AuthStack>
			<AuthHeading
				title={t('createANewPassword')}
				subtitle={t('forAigerimKasymovasAccount')}
			/>
			<form
				noValidate
				onSubmit={reset.onSubmit}
				className='flex flex-col gap-4'
			>
				<AuthField
					id='password'
					label={t('newPassword')}
					error={reset.passwordError}
				>
					<PasswordInput
						id='password'
						autoComplete='new-password'
						placeholder={t('atLeast10Characters')}
						{...reset.passwordProps}
					/>
				</AuthField>
				<PasswordStrength
					meter={reset.meter}
					strength={reset.strength}
					rules={reset.rules}
				/>
				<AuthField
					id='confirm'
					label={t('repeatPassword')}
					error={reset.confirmError}
				>
					<PasswordInput
						id='confirm'
						autoComplete='new-password'
						{...reset.confirmProps}
					/>
				</AuthField>
				<label className='inline-flex cursor-pointer items-start gap-2.5 text-sm leading-5'>
					<input
						type='checkbox'
						className='mt-px size-4.5 shrink-0 accent-brand'
						{...reset.signOutProps}
					/>
					{t('signOutOfAll')}
				</label>
				<Button type='submit' variant='primary' size='lg' block>
					{t('savePassword')}
				</Button>
			</form>
		</AuthStack>
	)
}
