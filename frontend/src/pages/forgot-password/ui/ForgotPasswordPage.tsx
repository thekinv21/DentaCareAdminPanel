'use client'

import Link from 'next/link'

import { Check, LockKeyhole } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { AuthField, AuthHeading, AuthStack } from '@/widgets/auth-panel'

import { ROUTES } from '@/shared/routes'
import { Alert } from '@/shared/ui/alert'
import { Button, buttonClass } from '@/shared/ui/button'
import { PhoneInput } from '@/shared/ui/phone-input'

import { useForgotPassword } from '../model/useForgotPassword'

export function ForgotPasswordPage() {
	const t = useTranslations('ForgotPassword')
	const flow = useForgotPassword()

	return (
		<AuthStack>
			{flow.sent ? (
				<div className='flex animate-fade flex-col gap-5.5'>
					<AuthHeading
						icon={<Check size={26} aria-hidden='true' />}
						iconTone='ok'
						title={t('checkYourSms')}
						subtitle={
							<>
								{t('weSentAPassword')}{' '}
								<span className='font-mono font-semibold text-ink'>
									{flow.maskedPhone}
								</span>
								.
							</>
						}
					/>
					<Alert tone='info'>{t('theLinkIsValid')}</Alert>
					<Link
						href={ROUTES.resetPassword}
						className={buttonClass({
							variant: 'primary',
							size: 'lg',
							block: true,
						})}
					>
						{t('openLink')}
					</Link>
					<Button size='lg' block onClick={flow.changeNumber}>
						{t('useADifferentNumber')}
					</Button>
				</div>
			) : (
				<div className='flex animate-fade flex-col gap-5.5'>
					<AuthHeading
						icon={<LockKeyhole size={26} aria-hidden='true' />}
						title={t('resetYourPassword')}
						subtitle={t('enterThePhoneNumber')}
					/>
					<form
						noValidate
						onSubmit={flow.onSubmit}
						className='flex flex-col gap-4'
					>
						<AuthField
							id='phone'
							label={t('phoneNumber')}
							error={flow.phoneError}
							hint={t('ifYouSignIn')}
						>
							<PhoneInput
								id='phone'
								autoComplete='tel'
								placeholder='555 123 456'
								{...flow.phoneProps}
							/>
						</AuthField>
						<Button type='submit' variant='primary' size='lg' block>
							{t('sendResetLink')}
						</Button>
					</form>
				</div>
			)}
			<p className='text-center text-sm leading-5.5 text-ink-muted'>
				{t('rememberedIt')}{' '}
				<Link
					href={ROUTES.login}
					className='font-semibold text-brand no-underline hover:underline'
				>
					{t('signIn')}
				</Link>
			</p>
		</AuthStack>
	)
}
