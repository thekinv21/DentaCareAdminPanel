'use client'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'

import type { ResetPasswordModel } from '../model/use-reset-password'

type PasswordStrengthProps = Pick<
	ResetPasswordModel,
	'meter' | 'strength' | 'rules'
>

export function PasswordStrength({
	meter,
	strength,
	rules,
}: PasswordStrengthProps) {
	const { t } = useI18n()
	return (
		<>
			<div className='-mt-2 flex flex-col gap-1.5'>
				<div aria-hidden='true' className='grid grid-cols-4 gap-1'>
					{meter.map((color, i) => (
						<span key={i} className={cn('h-1 rounded-full', color)} />
					))}
				</div>
				<span
					id='password-strength'
					role='status'
					className='text-[12.5px] leading-[18px] text-ink-muted'
				>
					{t('Надёжность')}:{' '}
					<strong className={strength.textClass}>{strength.label}</strong>
				</span>
			</div>
			<ul className='grid grid-cols-2 gap-x-3 gap-y-1.5 text-[13px]'>
				{rules.map(rule => (
					<li
						key={rule.label}
						className={cn(
							'flex items-center gap-1.5',
							rule.ok ? 'font-semibold text-success' : 'text-ink-muted',
						)}
					>
						<span aria-hidden='true' className='w-4 text-center'>
							{rule.ok ? '✓' : '○'}
						</span>
						{rule.label}
					</li>
				))}
			</ul>
		</>
	)
}
