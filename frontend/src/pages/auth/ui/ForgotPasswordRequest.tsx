'use client'

import { LockKeyhole } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { AuthHeading } from '@/widgets/auth-panel'

import { Button } from '@/shared/ui/button'

import type { TForgotPasswordModel } from '../model/useForgotPassword'
import { ForgotPasswordField } from './ForgotPasswordField'

type TForgotPasswordRequestProps = {
	form: TForgotPasswordModel['form']
	onSubmit: TForgotPasswordModel['onSubmit']
}

export function ForgotPasswordRequest({
	form,
	onSubmit,
}: TForgotPasswordRequestProps) {
	const t = useTranslations('ForgotPassword')

	return (
		<div className='flex animate-fade flex-col gap-5.5'>
			<AuthHeading
				icon={<LockKeyhole size={26} aria-hidden='true' />}
				title={t('resetYourPassword')}
				subtitle={t('enterThePhoneNumber')}
			/>
			<FormProvider {...form}>
				<form noValidate onSubmit={onSubmit} className='flex flex-col gap-4'>
					<ForgotPasswordField />
					<Button type='submit' variant='primary' size='lg' block>
						{t('sendResetLink')}
					</Button>
				</form>
			</FormProvider>
		</div>
	)
}
