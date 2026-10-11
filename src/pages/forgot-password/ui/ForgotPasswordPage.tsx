'use client'

import { useTranslations } from 'next-intl'

import { AuthStack, AuthSwitchLink } from '@/widgets/auth-panel'

import { ROUTES } from '@/shared/routes'

import { useForgotPassword } from '../model/useForgotPassword'
import { ForgotPasswordRequest } from './ForgotPasswordRequest'
import { ForgotPasswordSent } from './ForgotPasswordSent'

export function ForgotPasswordPage() {
	const t = useTranslations('ForgotPassword')
	const flow = useForgotPassword()

	return (
		<AuthStack>
			{flow.isSent ? (
				<ForgotPasswordSent
					maskedPhone={flow.maskedPhone}
					onChangeNumber={flow.changeNumber}
				/>
			) : (
				<ForgotPasswordRequest flow={flow} />
			)}
			<AuthSwitchLink
				question={t('rememberedIt')}
				href={ROUTES.login}
				linkLabel={t('signIn')}
			/>
		</AuthStack>
	)
}
