'use client'

import { useState } from 'react'

import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'

import { AuthField, AuthHeading, AuthStack } from '@/widgets/auth-panel'

import { cn } from '@/shared/lib/cn'
import { PASSWORD_RULES } from '@/shared/lib/validation'
import { ROUTES } from '@/shared/routes'
import { Button, buttonClass } from '@/shared/ui/button'
import { PasswordInput } from '@/shared/ui/password-input'

import { resetSchema, type ResetValues, STRENGTH } from '../model/schema'

export function ResetPasswordFlow() {
	const [done, setDone] = useState(false)
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ResetValues>({
		resolver: zodResolver(resetSchema),
		defaultValues: { password: '', confirm: '', signOutOthers: true },
	})

	const password = useWatch({ control, name: 'password' })
	const score = PASSWORD_RULES.filter(rule => rule.test(password)).length
	const strength = STRENGTH[score]

	if (done) {
		return (
			<AuthStack>
				<div className='flex animate-fade flex-col gap-[22px]'>
					<AuthHeading
						icon={<Check size={26} aria-hidden='true' />}
						iconTone='ok'
						title='Пароль обновлён'
						subtitle='Теперь войдите с новым паролем. Другие сеансы завершены.'
					/>
					<Link
						href={ROUTES.login}
						className={buttonClass({
							variant: 'primary',
							size: 'lg',
							block: true,
						})}
					>
						Перейти ко входу
					</Link>
				</div>
			</AuthStack>
		)
	}

	return (
		<AuthStack>
			<AuthHeading
				title='Придумайте новый пароль'
				subtitle='Для аккаунта Айгерим Касымовой · +996 555 ••• 441'
			/>
			<form
				noValidate
				onSubmit={handleSubmit(() => setDone(true))}
				className='flex flex-col gap-4'
			>
				<AuthField
					id='password'
					label='Новый пароль'
					error={errors.password?.message}
				>
					<PasswordInput
						id='password'
						autoComplete='new-password'
						placeholder='Минимум 10 символов'
						aria-invalid={!!errors.password}
						aria-describedby='password-strength'
						{...register('password')}
					/>
				</AuthField>
				<div className='-mt-2 flex flex-col gap-1.5'>
					<div aria-hidden='true' className='grid grid-cols-4 gap-1'>
						{[0, 1, 2, 3].map(i => (
							<span
								key={i}
								className={cn(
									'h-1 rounded-full',
									i < score ? strength.color : 'bg-line',
								)}
							/>
						))}
					</div>
					<span
						id='password-strength'
						role='status'
						className='text-[12.5px] leading-[18px] text-ink-muted'
					>
						Надёжность:{' '}
						<strong className={strength.text}>{strength.label}</strong>
					</span>
				</div>
				<ul className='grid grid-cols-2 gap-x-3 gap-y-1.5 text-[13px]'>
					{PASSWORD_RULES.map(rule => {
						const ok = rule.test(password)
						return (
							<li
								key={rule.label}
								className={cn(
									'flex items-center gap-1.5',
									ok ? 'font-semibold text-success' : 'text-ink-muted',
								)}
							>
								<span aria-hidden='true' className='w-4 text-center'>
									{ok ? '✓' : '○'}
								</span>
								{rule.label}
							</li>
						)
					})}
				</ul>
				<AuthField
					id='confirm'
					label='Повторите пароль'
					error={errors.confirm?.message}
				>
					<PasswordInput
						id='confirm'
						autoComplete='new-password'
						aria-invalid={!!errors.confirm}
						aria-describedby={errors.confirm ? 'confirm-error' : undefined}
						{...register('confirm')}
					/>
				</AuthField>
				<label className='inline-flex cursor-pointer items-start gap-2.5 text-sm leading-5'>
					<input
						type='checkbox'
						className='mt-px size-[18px] shrink-0 accent-brand'
						{...register('signOutOthers')}
					/>
					Выйти на всех других устройствах
				</label>
				<Button type='submit' variant='primary' size='lg' block>
					Сохранить пароль
				</Button>
			</form>
		</AuthStack>
	)
}
