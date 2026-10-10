import { useTranslations } from 'next-intl'

import { AuthHeading, AuthStack, AuthSwitchLink } from '@/widgets/auth-panel'

import { ROUTES } from '@/shared/routes'

import { LoginForm } from './LoginForm'

export function LoginPage() {
	const t = useTranslations('Login')

	return (
		<AuthStack>
			<AuthHeading title={t('welcomeBack')} subtitle={t('signInToOpen')} />
			<LoginForm />
			<AuthSwitchLink
				question={t('clinicNotOnDenta')}
				href={ROUTES.register}
				linkLabel={t('register')}
			/>
		</AuthStack>
	)
}
