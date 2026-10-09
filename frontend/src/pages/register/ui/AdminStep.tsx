'use client'

import { AuthField } from '@/widgets/auth-panel'

import { useI18n } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'
import { inputLgClass } from '@/shared/ui/field'
import { PasswordInput } from '@/shared/ui/password-input'
import { PhoneInput } from '@/shared/ui/phone-input'

import type { RegisterFormModel } from '../model/use-register-form'

const linkClass = 'font-semibold text-brand no-underline hover:underline'

export function AdminStep({ form }: { form: RegisterFormModel }) {
	const { t } = useI18n()
	const agreeError = form.errorOf('agree')

	return (
		<div className='flex animate-fade flex-col gap-4'>
			<AuthField
				id='fullName'
				label={t('Имя и фамилия')}
				error={form.errorOf('fullName')}
			>
				<input
					id='fullName'
					autoComplete='name'
					className={inputLgClass}
					{...form.fieldProps('fullName')}
				/>
			</AuthField>
			<AuthField
				id='mobile'
				label={t('Мобильный телефон')}
				error={form.errorOf('mobile')}
				hint={t('Отправим SMS-код для подтверждения')}
			>
				<PhoneInput
					id='mobile'
					placeholder='555 123 456'
					{...form.fieldProps('mobile')}
				/>
			</AuthField>
			<AuthField
				id='password'
				label={t('Пароль')}
				error={form.errorOf('password')}
			>
				<PasswordInput
					id='password'
					autoComplete='new-password'
					placeholder={t('Минимум 10 символов')}
					{...form.fieldProps('password')}
				/>
			</AuthField>
			<div className='flex flex-col gap-1.5'>
				<label className='inline-flex cursor-pointer items-start gap-2.5 text-sm leading-5'>
					<input
						type='checkbox'
						className='mt-px size-[18px] shrink-0 accent-brand'
						{...form.fieldProps('agree')}
					/>
					<span>
						{t('Принимаю')}{' '}
						<a href='#' className={linkClass}>
							{t('Условия')}
						</a>{' '}
						·{' '}
						<a href='#' className={linkClass}>
							{t('Конфиденциальность')}
						</a>
					</span>
				</label>
				{agreeError && (
					<span id='agree-error' className='text-[12.5px] text-danger'>
						{agreeError}
					</span>
				)}
			</div>
			<div className='flex gap-2.5'>
				<Button size='lg' onClick={form.back}>
					{t('Назад')}
				</Button>
				<Button type='submit' variant='primary' size='lg' className='flex-1'>
					{t('Создать аккаунт')}
				</Button>
			</div>
		</div>
	)
}
