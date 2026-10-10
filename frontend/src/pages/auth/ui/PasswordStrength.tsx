'use client'

import { Check, Circle } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'

import { usePasswordStrength } from '../model/usePasswordStrength'

export const PASSWORD_STRENGTH_ID = 'password-strength'

export function PasswordStrength() {
	const t = useTranslations('ResetPassword')

	const { meter, strength, rules } = usePasswordStrength()

	return (
		<>
			<div className='-mt-2 flex flex-col gap-1.5'>
				<div
					aria-hidden='true'
					className='grid gap-1'
					style={{ gridTemplateColumns: `repeat(${meter.length}, 1fr)` }}
				>
					{meter.map((colorClass, segmentIndex) => (
						<span
							key={segmentIndex}
							className={cn('h-1 rounded-full', colorClass)}
						/>
					))}
				</div>
				<span
					id={PASSWORD_STRENGTH_ID}
					role='status'
					className='text-[12.5px] leading-4.5 text-ink-muted'
				>
					{t('strength')}:{' '}
					<strong className={strength.textClass}>{strength.label}</strong>
				</span>
			</div>
			<ul className='grid grid-cols-2 gap-x-3 gap-y-1.5 text-[13px]'>
				{rules.map(rule => (
					<li
						key={rule.label}
						className={cn(
							'flex items-center gap-1.5',
							rule.isMet ? 'font-semibold text-success' : 'text-ink-muted',
						)}
					>
						{rule.isMet ? (
							<Check size={14} strokeWidth={2.6} aria-hidden='true' />
						) : (
							<Circle size={12} aria-hidden='true' className='mx-px' />
						)}
						{rule.label}
					</li>
				))}
			</ul>
		</>
	)
}
