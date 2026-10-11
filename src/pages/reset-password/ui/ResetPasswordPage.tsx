'use client'

import Link from 'next/link'

import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { AuthHeading, AuthStack } from '@/widgets/auth-panel'

import { ROUTES } from '@/shared/routes'
import { Button, buttonClass } from '@/shared/ui/button'

import { useResetPassword } from '../model/useResetPassword'
import { ResetPasswordFields } from './ResetPasswordFields'

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
			<FormProvider {...reset.methods}>
				<form
					noValidate
					onSubmit={reset.submit}
					className='flex flex-col gap-4'
				>
					<ResetPasswordFields />
					<Button type='submit' variant='primary' size='lg' block>
						{t('savePassword')}
					</Button>
				</form>
			</FormProvider>
		</AuthStack>
	)
}
