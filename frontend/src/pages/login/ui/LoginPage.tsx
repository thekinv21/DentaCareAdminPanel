'use client'

import Link from 'next/link'

import { useTranslations } from 'next-intl'

import { AuthHeading, AuthStack } from '@/widgets/auth-panel'

import { ROUTES } from '@/shared/routes'

import { LoginForm } from './LoginForm'

export function LoginPage() {
	const t = useTranslations('Login')
	return (
		<AuthStack>
			<AuthHeading title={t('welcomeBack')} subtitle={t('signInToOpen')} />
			<LoginForm />
			<p className='text-center text-sm leading-5.5 text-ink-muted'>
				{t('clinicNotOnDenta')}{' '}
				<Link
					href={ROUTES.register}
					className='font-semibold text-brand no-underline hover:underline'
				>
					{t('register')}
				</Link>
			</p>
		</AuthStack>
	)
}
