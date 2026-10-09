'use client'

import Link from 'next/link'

import { Check, LockKeyhole } from 'lucide-react'

import { AuthField, AuthHeading, AuthStack } from '@/widgets/auth-panel'

import { useI18n } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { Alert } from '@/shared/ui/alert'
import { Button, buttonClass } from '@/shared/ui/button'
import { PhoneInput } from '@/shared/ui/phone-input'

import { useForgotPassword } from '../model/use-forgot-password'

export function ForgotPasswordPage() {
	const { t } = useI18n()
	const flow = useForgotPassword()

	return (
		<AuthStack>
			{flow.sent ? (
				<div className='flex animate-fade flex-col gap-[22px]'>
					<AuthHeading
						icon={<Check size={26} aria-hidden='true' />}
						iconTone='ok'
						title={t('Проверьте SMS')}
						subtitle={
							<>
								{t('Мы отправили ссылку для сброса пароля на номер')}{' '}
								<span className='font-mono font-semibold text-ink'>
									{flow.maskedPhone}
								</span>
								.
							</>
						}
					/>
					<Alert tone='info'>
						{t(
							'Ссылка действует 30 минут. Не пришло SMS? Повторная отправка через 0:42.',
						)}
					</Alert>
					<Link
						href={ROUTES.resetPassword}
						className={buttonClass({
							variant: 'primary',
							size: 'lg',
							block: true,
						})}
					>
						{t('Открыть ссылку')}
					</Link>
					<Button size='lg' block onClick={flow.changeNumber}>
						{t('Указать другой номер')}
					</Button>
				</div>
			) : (
				<div className='flex animate-fade flex-col gap-[22px]'>
					<AuthHeading
						icon={<LockKeyhole size={26} aria-hidden='true' />}
						title={t('Восстановить пароль')}
						subtitle={t(
							'Укажите номер, привязанный к аккаунту. Мы пришлём ссылку для сброса пароля.',
						)}
					/>
					<form
						noValidate
						onSubmit={flow.onSubmit}
						className='flex flex-col gap-4'
					>
						<AuthField
							id='phone'
							label={t('Номер телефона')}
							error={flow.phoneError}
							hint={t('Если вы входите по email, ссылка придёт и на него.')}
						>
							<PhoneInput
								id='phone'
								autoComplete='tel'
								placeholder='555 123 456'
								{...flow.phoneProps}
							/>
						</AuthField>
						<Button type='submit' variant='primary' size='lg' block>
							{t('Отправить ссылку')}
						</Button>
					</form>
				</div>
			)}
			<p className='text-center text-sm leading-[22px] text-ink-muted'>
				{t('Вспомнили пароль?')}{' '}
				<Link
					href={ROUTES.login}
					className='font-semibold text-brand no-underline hover:underline'
				>
					{t('Войти')}
				</Link>
			</p>
		</AuthStack>
	)
}
