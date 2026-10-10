'use client'

import { useTranslations } from 'next-intl'

import { AuthStack, AuthSwitchLink } from '@/widgets/auth-panel'

import { ROUTES } from '@/shared/routes'

import { useForgotPassword } from '../model/useForgotPassword'
import { ForgotPasswordRequest } from './ForgotPasswordRequest'
import { ForgotPasswordSent } from './ForgotPasswordSent'

export function ForgotPasswordPage() {
	const t = useTranslations('ForgotPassword')

	const { form, isSent, maskedPhone, onSubmit, onChangeNumber } =
		useForgotPassword()

	return (
		<AuthStack>
			{isSent ? (
				<ForgotPasswordSent
					maskedPhone={maskedPhone}
					onChangeNumber={onChangeNumber}
				/>
			) : (
				<ForgotPasswordRequest form={form} onSubmit={onSubmit} />
			)}
			<AuthSwitchLink
				question={t('rememberedIt')}
				href={ROUTES.login}
				linkLabel={t('signIn')}
			/>
		</AuthStack>
	)
}
