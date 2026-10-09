'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { AuthField } from '@/widgets/auth-panel'

import { ROUTES } from '@/shared/routes'
import { Button } from '@/shared/ui/button'
import { inputLgClass } from '@/shared/ui/field'
import { PasswordInput } from '@/shared/ui/password-input'
import { PhoneInput } from '@/shared/ui/phone-input'
import { Segmented } from '@/shared/ui/segmented'

import { loginSchema, type LoginValues } from '../model/schema'

const METHODS: { id: LoginValues['method']; label: string }[] = [
	{ id: 'phone', label: 'Телефон' },
	{ id: 'email', label: 'Email' },
]

export function LoginForm() {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<LoginValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { method: 'phone', phone: '', password: '', remember: true },
	})

	const method = useWatch({ control, name: 'method' })
	const fieldErrors = errors as Partial<
		Record<'phone' | 'email' | 'password', { message?: string }>
	>

	// No backend yet: a valid form continues to the SMS code step
	const onSubmit = () => router.push(ROUTES.verify)

	return (
		<form
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-4'
		>
			<Segmented
				aria-label='Способ входа'
				options={METHODS}
				value={method}
				onChange={next => setValue('method', next, { shouldValidate: false })}
				className='[&>button]:min-h-[38px] [&>button]:flex-1 [&>button]:justify-center [&>button]:text-sm'
			/>

			{method === 'phone' ? (
				<AuthField
					id='phone'
					label='Номер телефона'
					error={fieldErrors.phone?.message}
				>
					<PhoneInput
						id='phone'
						autoComplete='tel'
						placeholder='555 123 456'
						aria-invalid={!!fieldErrors.phone}
						aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
						{...register('phone')}
					/>
				</AuthField>
			) : (
				<AuthField
					id='email'
					label='Рабочий email'
					error={fieldErrors.email?.message}
				>
					<input
						id='email'
						type='email'
						autoComplete='email'
						placeholder='name@clinic.kg'
						className={inputLgClass}
						aria-invalid={!!fieldErrors.email}
						aria-describedby={fieldErrors.email ? 'email-error' : undefined}
						{...register('email')}
					/>
				</AuthField>
			)}

			<AuthField
				id='password'
				label='Пароль'
				error={fieldErrors.password?.message}
				aside={
					<Link
						href={ROUTES.forgotPassword}
						className='text-[13px] font-semibold text-brand no-underline hover:underline'
					>
						Забыли пароль?
					</Link>
				}
			>
				<PasswordInput
					id='password'
					autoComplete='current-password'
					placeholder='Ваш пароль'
					aria-invalid={!!fieldErrors.password}
					aria-describedby={fieldErrors.password ? 'password-error' : undefined}
					{...register('password')}
				/>
			</AuthField>

			<label className='inline-flex min-h-6 cursor-pointer items-start gap-2.5 text-sm leading-5'>
				<input
					type='checkbox'
					className='mt-px size-[18px] shrink-0 accent-brand'
					{...register('remember')}
				/>
				Запомнить это устройство на 30 дней
			</label>

			<Button
				type='submit'
				variant='primary'
				size='lg'
				block
				disabled={isSubmitting}
			>
				Войти
			</Button>
		</form>
	)
}
