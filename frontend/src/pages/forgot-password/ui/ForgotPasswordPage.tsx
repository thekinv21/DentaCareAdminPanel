import type { Metadata } from 'next'

import { ForgotPasswordFlow } from './ForgotPasswordFlow'

export const metadata: Metadata = { title: 'Восстановление пароля' }

export function ForgotPasswordPage() {
	return <ForgotPasswordFlow />
}
