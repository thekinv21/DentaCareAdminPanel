'use client'

import Link from 'next/link'

import { AuthHeading, AuthStack } from '@/widgets/auth-panel'

import { useI18n } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'

import { LoginForm } from './LoginForm'

export function LoginPage() {
	const { t } = useI18n()
	return (
		<AuthStack>
			<AuthHeading
				title={t('С возвращением')}
				subtitle={t('Войдите, чтобы открыть расписание клиники.')}
			/>
			<LoginForm />
			<p className='text-center text-sm leading-[22px] text-ink-muted'>
				{t('Клиника ещё не подключена?')}{' '}
				<Link
					href={ROUTES.register}
					className='font-semibold text-brand no-underline hover:underline'
				>
					{t('Зарегистрировать')}
				</Link>
			</p>
		</AuthStack>
	)
}
