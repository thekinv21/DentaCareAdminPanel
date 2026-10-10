'use client'

import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { SegmentedField } from '@/shared/ui/segmented'

import { useLoginForm } from '../model/useLoginForm'
import { LoginFields } from './LoginFields'

export function LoginForm() {
	const t = useTranslations('Login')
	const form = useLoginForm()

	return (
		<FormProvider {...form.methods}>
			<form noValidate onSubmit={form.submit} className='flex flex-col gap-4'>
				<SegmentedField
					control={form.methods.control}
					name='method'
					aria-label={t('signInMethod')}
					options={[
						{ id: 'phone' as const, label: t('phone') },
						{ id: 'email' as const, label: t('email') },
					]}
					className='[&>button]:min-h-9.5 [&>button]:flex-1 [&>button]:justify-center [&>button]:text-sm'
				/>
				<LoginFields method={form.method} />
				<Button type='submit' variant='primary' size='lg' block>
					{t('signIn')}
				</Button>
			</form>
		</FormProvider>
	)
}
