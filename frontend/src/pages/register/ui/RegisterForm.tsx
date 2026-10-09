'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronRight } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { AuthField } from '@/widgets/auth-panel'

import { cn } from '@/shared/lib/cn'
import { ROUTES } from '@/shared/routes'
import { Button } from '@/shared/ui/button'
import { inputLgClass } from '@/shared/ui/field'
import { PasswordInput } from '@/shared/ui/password-input'
import { PhoneInput } from '@/shared/ui/phone-input'

import {
	CITIES,
	CLINIC_FIELDS,
	type RegisterInput,
	registerSchema,
	type RegisterValues,
} from '../model/schema'

const STEPS = ['Клиника', 'Администратор']

export function RegisterForm() {
	const router = useRouter()
	const [step, setStep] = useState<1 | 2>(1)
	const {
		register,
		handleSubmit,
		trigger,
		formState: { errors },
	} = useForm<RegisterInput, unknown, RegisterValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			clinicName: '',
			city: 'Бишкек',
			chairs: '4',
			clinicPhone: '',
			fullName: '',
			mobile: '',
			password: '',
		},
	})

	const next = async () => {
		if (await trigger(CLINIC_FIELDS)) setStep(2)
	}

	// No backend yet: a valid form continues to the SMS code step
	const onSubmit = () => router.push(ROUTES.verify)

	const invalid = (name: keyof RegisterInput) => ({
		'aria-invalid': !!errors[name],
		'aria-describedby': errors[name] ? `${name}-error` : undefined,
	})

	return (
		<>
			<ol
				aria-label='Шаги регистрации'
				className='m-0 flex list-none gap-2 p-0'
			>
				{STEPS.map((label, index) => {
					const n = index + 1
					return (
						<li
							key={label}
							aria-current={n === step ? 'step' : undefined}
							className='flex flex-1 flex-col gap-2'
						>
							<span
								className={cn(
									'block h-1 rounded-full',
									n <= step ? 'bg-brand' : 'bg-line',
								)}
							/>
							<span
								className={cn(
									'text-[13px] font-semibold',
									n === step ? 'text-ink' : 'text-ink-muted',
								)}
							>
								<span className='font-mono'>0{n}</span> · {label}
							</span>
						</li>
					)
				})}
			</ol>

			<form
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-4'
			>
				{step === 1 ? (
					<div className='flex animate-fade flex-col gap-4'>
						<AuthField
							id='clinicName'
							label='Название клиники'
							error={errors.clinicName?.message}
						>
							<input
								id='clinicName'
								className={inputLgClass}
								placeholder='Например, Denta · Ала-Тоо'
								{...invalid('clinicName')}
								{...register('clinicName')}
							/>
						</AuthField>
						<div className='grid grid-cols-[1fr_140px] gap-3'>
							<AuthField id='city' label='Город'>
								<select
									id='city'
									className={inputLgClass}
									{...register('city')}
								>
									{CITIES.map(city => (
										<option key={city}>{city}</option>
									))}
								</select>
							</AuthField>
							<AuthField
								id='chairs'
								label='Кресел'
								error={errors.chairs?.message}
							>
								<input
									id='chairs'
									type='number'
									min={1}
									className={cn(inputLgClass, 'font-mono')}
									{...invalid('chairs')}
									{...register('chairs')}
								/>
							</AuthField>
						</div>
						<AuthField
							id='clinicPhone'
							label='Телефон клиники'
							error={errors.clinicPhone?.message}
						>
							<PhoneInput
								id='clinicPhone'
								placeholder='312 90 41 41'
								{...invalid('clinicPhone')}
								{...register('clinicPhone')}
							/>
						</AuthField>
						<Button variant='primary' size='lg' block onClick={next}>
							Продолжить
							<ChevronRight size={18} aria-hidden='true' />
						</Button>
					</div>
				) : (
					<div className='flex animate-fade flex-col gap-4'>
						<AuthField
							id='fullName'
							label='Имя и фамилия'
							error={errors.fullName?.message}
						>
							<input
								id='fullName'
								autoComplete='name'
								className={inputLgClass}
								{...invalid('fullName')}
								{...register('fullName')}
							/>
						</AuthField>
						<AuthField
							id='mobile'
							label='Мобильный телефон'
							error={errors.mobile?.message}
							hint='Отправим SMS-код для подтверждения'
						>
							<PhoneInput
								id='mobile'
								placeholder='555 123 456'
								{...invalid('mobile')}
								{...register('mobile')}
							/>
						</AuthField>
						<AuthField
							id='password'
							label='Пароль'
							error={errors.password?.message}
						>
							<PasswordInput
								id='password'
								autoComplete='new-password'
								placeholder='Минимум 10 символов'
								{...invalid('password')}
								{...register('password')}
							/>
						</AuthField>
						<div className='flex flex-col gap-1.5'>
							<label className='inline-flex cursor-pointer items-start gap-2.5 text-sm leading-5'>
								<input
									type='checkbox'
									className='mt-px size-[18px] shrink-0 accent-brand'
									{...invalid('agree')}
									{...register('agree')}
								/>
								<span>
									Принимаю{' '}
									<a
										href='#'
										className='font-semibold text-brand no-underline hover:underline'
									>
										Условия
									</a>{' '}
									·{' '}
									<a
										href='#'
										className='font-semibold text-brand no-underline hover:underline'
									>
										Конфиденциальность
									</a>
								</span>
							</label>
							{errors.agree && (
								<span id='agree-error' className='text-[12.5px] text-danger'>
									{errors.agree.message}
								</span>
							)}
						</div>
						<div className='flex gap-2.5'>
							<Button size='lg' onClick={() => setStep(1)}>
								Назад
							</Button>
							<Button
								type='submit'
								variant='primary'
								size='lg'
								className='flex-1'
							>
								Создать аккаунт
							</Button>
						</div>
					</div>
				)}
			</form>

			<p className='text-center text-sm leading-[22px] text-ink-muted'>
				Уже есть аккаунт?{' '}
				<Link
					href={ROUTES.login}
					className='font-semibold text-brand no-underline hover:underline'
				>
					Войти
				</Link>
			</p>
		</>
	)
}
