import type { ReactNode } from 'react'

import { TONE_CLASS } from '@/shared/ui/badge'

interface AuthHeadingProps {
	title: string
	subtitle: ReactNode
	icon?: ReactNode
	iconTone?: 'brand' | 'ok'
}

export function AuthHeading({
	title,
	subtitle,
	icon,
	iconTone = 'brand',
}: AuthHeadingProps) {
	return (
		<>
			{icon && (
				<span
					className={`flex size-14 items-center justify-center rounded-[18px] ${TONE_CLASS[iconTone]}`}
				>
					{icon}
				</span>
			)}
			<div className='flex flex-col gap-1.5'>
				<h1 className='font-display text-[30px] leading-9.5 font-extrabold tracking-tight max-[900px]:text-[26px] max-[900px]:leading-8'>
					{title}
				</h1>
				<p className='text-sm leading-5.5 text-ink-muted'>{subtitle}</p>
			</div>
		</>
	)
}

/**
 * Vertical stack used by every auth screen
 */
export function AuthStack({ children }: { children: ReactNode }) {
	return <div className='flex animate-rise flex-col gap-5.5'>{children}</div>
}

/**
 * "Label + error" wrapper for auth form fields
 */
export function AuthField({
	id,
	label,
	error,
	hint,
	aside,
	children,
}: {
	id: string
	label: string
	error?: string
	hint?: string
	aside?: ReactNode
	children: ReactNode
}) {
	return (
		<div className='flex flex-col gap-1.5'>
			<div className='flex items-baseline justify-between'>
				<label htmlFor={id} className='text-[13px] leading-4.5 font-semibold'>
					{label}
				</label>
				{aside}
			</div>
			{children}
			{error ? (
				<span
					id={`${id}-error`}
					className='text-[12.5px] leading-4.5 text-danger'
				>
					{error}
				</span>
			) : (
				hint && (
					<span className='text-[12.5px] leading-4.5 text-ink-muted'>
						{hint}
					</span>
				)
			)}
		</div>
	)
}
