'use client'

import { useTranslations } from 'next-intl'
import { Controller, FormProvider } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { Segmented } from '@/shared/ui/segmented'

import { useLoginForm } from '../model/useLoginForm'
import { LoginFields } from './LoginFields'

export function LoginForm() {
	const t = useTranslations('Login')
	const form = useLoginForm()

	return (
		<FormProvider {...form.methods}>
			<form noValidate onSubmit={form.submit} className='flex flex-col gap-4'>
				<Controller
					control={form.methods.control}
					name='method'
					render={({ field }) => (
						<Segmented
							aria-label={t('signInMethod')}
							options={[
								{ id: 'phone' as const, label: t('phone') },
								{ id: 'email' as const, label: t('email') },
							]}
							value={field.value}
							onChange={field.onChange}
							className='[&>button]:min-h-9.5 [&>button]:flex-1 [&>button]:justify-center [&>button]:text-sm'
						/>
					)}
				/>
				<LoginFields method={form.method} />
				<Button
					type='submit'
					variant='primary'
					size='lg'
					block
					disabled={form.submitting}
				>
					{t('signIn')}
				</Button>
			</form>
		</FormProvider>
	)
}
