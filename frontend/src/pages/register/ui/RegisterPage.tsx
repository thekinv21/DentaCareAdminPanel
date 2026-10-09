'use client'

import Link from 'next/link'

import { AuthHeading, AuthStack } from '@/widgets/auth-panel'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'

import { useRegisterForm } from '../model/use-register-form'
import { AdminStep } from './AdminStep'
import { ClinicStep } from './ClinicStep'

export function RegisterPage() {
	const { t } = useI18n()
	const form = useRegisterForm()

	return (
		<AuthStack>
			<AuthHeading
				title={t('Подключить клинику')}
				subtitle={t(
					'Две минуты — и расписание, пациенты и оплаты в одном месте.',
				)}
			/>
			<ol
				aria-label={t('Шаги регистрации')}
				className='m-0 flex list-none gap-2 p-0'
			>
				{form.steps.map(step => (
					<li
						key={step.number}
						aria-current={step.current ? 'step' : undefined}
						className='flex flex-1 flex-col gap-2'
					>
						<span
							className={cn(
								'block h-1 rounded-full',
								step.done ? 'bg-brand' : 'bg-line',
							)}
						/>
						<span
							className={cn(
								'text-[13px] font-semibold',
								step.current ? 'text-ink' : 'text-ink-muted',
							)}
						>
							<span className='font-mono'>{step.number}</span> · {step.label}
						</span>
					</li>
				))}
			</ol>
			<form noValidate onSubmit={form.onSubmit} className='flex flex-col gap-4'>
				{form.step === 1 ? (
					<ClinicStep form={form} />
				) : (
					<AdminStep form={form} />
				)}
			</form>
			<p className='text-center text-sm leading-[22px] text-ink-muted'>
				{t('Уже есть аккаунт?')}{' '}
				<Link
					href={ROUTES.login}
					className='font-semibold text-brand no-underline hover:underline'
				>
					{t('Войти')}
				</Link>
			</p>
		</AuthStack>
	)
}
