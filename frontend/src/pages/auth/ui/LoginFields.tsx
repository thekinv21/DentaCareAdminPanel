'use client'

import Link from 'next/link'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { AuthField } from '@/widgets/auth-panel'

import { useFieldProps } from '@/shared/lib/form'
import { ROUTES } from '@/shared/routes'
import { CheckboxLabel } from '@/shared/ui/checkbox'
import { inputLgClass } from '@/shared/ui/field'
import { PasswordInput } from '@/shared/ui/password-input'
import { PhoneInput } from '@/shared/ui/phone-input'

import type { TLoginValues } from '../model/LoginSchema'

type TLoginFieldsProps = { method: TLoginValues['method'] }

export function LoginFields({ method }: TLoginFieldsProps) {
	const t = useTranslations('Login')

	const { register } = useFormContext<TLoginValues>()

	const inputProps = useFieldProps<TLoginValues>()

	return (
		<>
			{method === 'phone' ? (
				<AuthField name='phone' label={t('phoneNumber')}>
					<PhoneInput
						id='phone'
						autoComplete='tel'
						placeholder='555 123 456'
						{...inputProps('phone')}
					/>
				</AuthField>
			) : (
				<AuthField name='email' label={t('workEmail')}>
					<input
						id='email'
						type='email'
						autoComplete='email'
						placeholder='name@clinic.kg'
						className={inputLgClass}
						{...inputProps('email')}
					/>
				</AuthField>
			)}

			<AuthField
				name='password'
				label={t('password')}
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
					{...inputProps('password')}
				/>
			</AuthField>

			<CheckboxLabel {...register('remember')}>
				{t('rememberThisDeviceFor')}
			</CheckboxLabel>
		</>
	)
}
