'use client'

import { useState } from 'react'

import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check, LockKeyhole } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { AuthField, AuthHeading, AuthStack } from '@/widgets/auth-panel'

import { ROUTES } from '@/shared/routes'
import { Alert } from '@/shared/ui/alert'
import { Button, buttonClass } from '@/shared/ui/button'
import { PhoneInput } from '@/shared/ui/phone-input'

import { forgotSchema, type ForgotValues } from '../model/schema'

function maskPhone(phone: string) {
	const digits = phone.replace(/\D/g, '')
	return `+996 ${digits.slice(0, 3)} ••• ${digits.slice(-3)}`
}

export function ForgotPasswordFlow() {
	const [sentTo, setSentTo] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotValues>({
		resolver: zodResolver(forgotSchema),
		defaultValues: { phone: '' },
	})

	return (
		<AuthStack>
			{sentTo ? (
				<div className='flex animate-fade flex-col gap-[22px]'>
					<AuthHeading
						icon={<Check size={26} aria-hidden='true' />}
						iconTone='ok'
						title='Проверьте SMS'
						subtitle={
							<>
								Мы отправили ссылку для сброса пароля на номер{' '}
								<span className='font-mono font-semibold text-ink'>
									{maskPhone(sentTo)}
								</span>
								.
							</>
						}
					/>
					<Alert tone='info'>
						Ссылка действует 30 минут. Не пришло SMS? Повторная отправка через
						0:42.
					</Alert>
					<Link
						href={ROUTES.resetPassword}
						className={buttonClass({
							variant: 'primary',
							size: 'lg',
							block: true,
						})}
					>
						Открыть ссылку
					</Link>
					<Button size='lg' block onClick={() => setSentTo(null)}>
						Указать другой номер
					</Button>
				</div>
			) : (
				<div className='flex animate-fade flex-col gap-[22px]'>
					<AuthHeading
						icon={<LockKeyhole size={26} aria-hidden='true' />}
						title='Восстановить пароль'
						subtitle='Укажите номер, привязанный к аккаунту. Мы пришлём ссылку для сброса пароля.'
					/>
					<form
						noValidate
						onSubmit={handleSubmit(values => setSentTo(values.phone))}
						className='flex flex-col gap-4'
					>
						<AuthField
							id='phone'
							label='Номер телефона'
							error={errors.phone?.message}
							hint='Если вы входите по email, ссылка придёт и на него.'
						>
							<PhoneInput
								id='phone'
								autoComplete='tel'
								placeholder='555 123 456'
								aria-invalid={!!errors.phone}
								aria-describedby={errors.phone ? 'phone-error' : undefined}
								{...register('phone')}
							/>
						</AuthField>
						<Button type='submit' variant='primary' size='lg' block>
							Отправить ссылку
						</Button>
					</form>
				</div>
			)}
			<p className='text-center text-sm leading-[22px] text-ink-muted'>
				Вспомнили пароль?{' '}
				<Link
					href={ROUTES.login}
					className='font-semibold text-brand no-underline hover:underline'
				>
					Войти
				</Link>
			</p>
		</AuthStack>
	)
}
