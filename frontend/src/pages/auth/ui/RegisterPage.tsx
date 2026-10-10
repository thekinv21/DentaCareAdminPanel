'use client'

import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { AuthHeading, AuthStack, AuthSwitchLink } from '@/widgets/auth-panel'

import { cn } from '@/shared/lib/cn'
import { ROUTES } from '@/shared/routes'

import { useRegisterForm } from '../model/useRegisterForm'
import { AdminStep } from './AdminStep'
import { ClinicStep } from './ClinicStep'

export function RegisterPage() {
	const t = useTranslations('Register')

	const { form, step, steps, onNext, onKeyDown, onBack, onSubmit } =
		useRegisterForm()

	return (
		<AuthStack>
			<AuthHeading
				title={t('connectYourClinic')}
				subtitle={t('twoMinutesAndSchedule')}
			/>
			<ol
				aria-label={t('registrationSteps')}
				className='m-0 flex list-none gap-2 p-0'
			>
				{steps.map(item => (
					<li
						key={item.number}
						aria-current={item.isCurrent ? 'step' : undefined}
						className='flex flex-1 flex-col gap-2'
					>
						<span
							className={cn(
								'block h-1 rounded-full',
								item.isDone ? 'bg-brand' : 'bg-line',
							)}
						/>
						<span
							className={cn(
								'text-[13px] font-semibold',
								item.isCurrent ? 'text-ink' : 'text-ink-muted',
							)}
						>
							<span className='font-mono'>{item.number}</span> · {item.label}
						</span>
					</li>
				))}
			</ol>
			<FormProvider {...form}>
				<form
					noValidate
					onSubmit={onSubmit}
					onKeyDown={onKeyDown}
					className='flex flex-col gap-4'
				>
					{step === 1 ? (
						<ClinicStep onNext={onNext} />
					) : (
						<AdminStep onBack={onBack} />
					)}
				</form>
			</FormProvider>
			<AuthSwitchLink
				question={t('alreadyHaveAnAccount')}
				href={ROUTES.login}
				linkLabel={t('signIn')}
			/>
		</AuthStack>
	)
}
