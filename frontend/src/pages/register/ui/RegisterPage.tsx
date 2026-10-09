import type { Metadata } from 'next'

import { AuthHeading, AuthStack } from '@/widgets/auth-panel'

import { RegisterForm } from './RegisterForm'

export const metadata: Metadata = { title: 'Регистрация' }

export function RegisterPage() {
	return (
		<AuthStack>
			<AuthHeading
				title='Подключить клинику'
				subtitle='Две минуты — и расписание, пациенты и оплаты в одном месте.'
			/>
			<RegisterForm />
		</AuthStack>
	)
}
