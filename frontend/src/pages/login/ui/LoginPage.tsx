import type { Metadata } from 'next'
import Link from 'next/link'

import { AuthHeading, AuthStack } from '@/widgets/auth-panel'

import { ROUTES } from '@/shared/routes'

import { LoginForm } from './LoginForm'

export const metadata: Metadata = { title: 'Вход' }

export function LoginPage() {
	return (
		<AuthStack>
			<AuthHeading
				title='С возвращением'
				subtitle='Войдите, чтобы открыть расписание клиники.'
			/>
			<LoginForm />
			<p className='text-center text-sm leading-[22px] text-ink-muted'>
				Клиника ещё не подключена?{' '}
				<Link
					href={ROUTES.register}
					className='font-semibold text-brand no-underline hover:underline'
				>
					Зарегистрировать
				</Link>
			</p>
		</AuthStack>
	)
}
