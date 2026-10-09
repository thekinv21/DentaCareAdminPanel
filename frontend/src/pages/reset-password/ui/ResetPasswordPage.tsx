import type { Metadata } from 'next'

import { ResetPasswordFlow } from './ResetPasswordFlow'

export const metadata: Metadata = { title: 'Новый пароль' }

export function ResetPasswordPage() {
	return <ResetPasswordFlow />
}
