'use client'

import Link from 'next/link'

import { useTranslations } from 'next-intl'

import { AuthField } from '@/widgets/auth-panel'

import { ROUTES } from '@/shared/routes'
import { Button } from '@/shared/ui/button'
import { inputLgClass } from '@/shared/ui/field'
import { PasswordInput } from '@/shared/ui/password-input'
import { PhoneInput } from '@/shared/ui/phone-input'
import { Segmented } from '@/shared/ui/segmented'

import { useLoginForm } from '../model/useLoginForm'

export function LoginForm() {
	const t = useTranslations('Login')
	const form = useLoginForm()

	return (
		<form noValidate onSubmit={form.onSubmit} className='flex flex-col gap-4'>
			<Segmented
				aria-label={t('signInMethod')}
				options={form.methods}
				value={form.method}
				onChange={form.setMethod}
				className='[&>button]:min-h-9.5 [&>button]:flex-1 [&>button]:justify-center [&>button]:text-sm'
			/>

			{form.method === 'phone' ? (
				<AuthField
					id='phone'
					label={t('phoneNumber')}
					error={form.errorOf('phone')}
				>
					<PhoneInput
						id='phone'
						autoComplete='tel'
						placeholder='555 123 456'
						{...form.fieldProps('phone')}
					/>
				</AuthField>
			) : (
				<AuthField
					id='email'
					label={t('workEmail')}
					error={form.errorOf('email')}
				>
					<input
						id='email'
						type='email'
						autoComplete='email'
						placeholder='name@clinic.kg'
						className={inputLgClass}
						{...form.fieldProps('email')}
					/>
				</AuthField>
			)}

			<AuthField
				id='password'
				label={t('password')}
				error={form.errorOf('password')}
				aside={
					<Link
						href={ROUTES.forgotPassword}
						className='text-[13px] font-semibold text-brand no-underline hover:underline'
					>
						{t('forgotPassword')}
					</Link>
				}
			>
				<PasswordInput
					id='password'
					autoComplete='current-password'
					placeholder={t('yourPassword')}
					{...form.fieldProps('password')}
				/>
			</AuthField>

			<label className='inline-flex min-h-6 cursor-pointer items-start gap-2.5 text-sm leading-5'>
				<input
					type='checkbox'
					className='mt-px size-4.5 shrink-0 accent-brand'
					{...form.rememberProps}
				/>
				{t('rememberThisDeviceFor')}
			</label>

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
	)
}
