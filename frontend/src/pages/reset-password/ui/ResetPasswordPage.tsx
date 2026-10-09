'use client'

import Link from 'next/link'

import { Check } from 'lucide-react'

import { AuthField, AuthHeading, AuthStack } from '@/widgets/auth-panel'

import { useI18n } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { Button, buttonClass } from '@/shared/ui/button'
import { PasswordInput } from '@/shared/ui/password-input'

import { useResetPassword } from '../model/use-reset-password'
import { PasswordStrength } from './PasswordStrength'

export function ResetPasswordPage() {
	const { t } = useI18n()
	const reset = useResetPassword()

	if (reset.done) {
		return (
			<AuthStack>
				<AuthHeading
					icon={<Check size={26} aria-hidden='true' />}
					iconTone='ok'
					title={t('Пароль обновлён')}
					subtitle={t(
						'Теперь войдите с новым паролем. Другие сеансы завершены.',
					)}
				/>
				<Link
					href={ROUTES.login}
					className={buttonClass({
						variant: 'primary',
						size: 'lg',
						block: true,
					})}
				>
					{t('Перейти ко входу')}
				</Link>
			</AuthStack>
		)
	}

	return (
		<AuthStack>
			<AuthHeading
				title={t('Придумайте новый пароль')}
				subtitle={t('Для аккаунта Айгерим Касымовой · +996 555 ••• 441')}
			/>
			<form
				noValidate
				onSubmit={reset.onSubmit}
				className='flex flex-col gap-4'
			>
				<AuthField
					id='password'
					label={t('Новый пароль')}
					error={reset.passwordError}
				>
					<PasswordInput
						id='password'
						autoComplete='new-password'
						placeholder={t('Минимум 10 символов')}
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
					label={t('Повторите пароль')}
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
						className='mt-px size-[18px] shrink-0 accent-brand'
						{...reset.signOutProps}
					/>
					{t('Выйти на всех других устройствах')}
				</label>
				<Button type='submit' variant='primary' size='lg' block>
					{t('Сохранить пароль')}
				</Button>
			</form>
		</AuthStack>
	)
}
