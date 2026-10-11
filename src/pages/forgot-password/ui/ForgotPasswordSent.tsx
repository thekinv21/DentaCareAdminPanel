'use client'

import Link from 'next/link'

import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { AuthHeading } from '@/widgets/auth-panel'

import { ROUTES } from '@/shared/routes'
import { Alert } from '@/shared/ui/alert'
import { Button, buttonClass } from '@/shared/ui/button'

type TForgotPasswordSentProps = {
	maskedPhone: string
	onChangeNumber: () => void
}

/**
 * "Check your SMS" state after the reset link was sent
 */
export function ForgotPasswordSent({
	maskedPhone,
	onChangeNumber,
}: TForgotPasswordSentProps) {
	const t = useTranslations('ForgotPassword')

	return (
		<div className='flex animate-fade flex-col gap-5.5'>
			<AuthHeading
				icon={<Check size={26} aria-hidden='true' />}
				iconTone='ok'
				title={t('checkYourSms')}
				subtitle={
					<>
						{t('weSentAPassword')}{' '}
						<span className='font-mono font-semibold text-ink'>
							{maskedPhone}
						</span>
						.
					</>
				}
			/>
			<Alert tone='info'>{t('theLinkIsValid')}</Alert>
			<Link
				href={ROUTES.resetPassword}
				className={buttonClass({ variant: 'primary', size: 'lg', block: true })}
			>
				{t('openLink')}
			</Link>
			<Button size='lg' block onClick={onChangeNumber}>
				{t('useADifferentNumber')}
			</Button>
		</div>
	)
}
