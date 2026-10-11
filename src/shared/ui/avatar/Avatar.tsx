import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'
import { TONE_CLASS, type TTone } from '@/shared/ui/badge'

type TAvatarProps = {
	initials: string
	tone?: TTone
	size?: number
	className?: string
	children?: ReactNode
}

/**
 * Initials in a tinted circle; children render on top (e.g. a status dot)
 */
export function Avatar(props: TAvatarProps) {
	const { initials, tone = 'brand', size = 32, className, children } = props

	return (
		<span
			aria-hidden='true'
			className={cn(
				'relative inline-flex shrink-0 items-center justify-center rounded-full font-bold',
				TONE_CLASS[tone],
				className,
			)}
			style={{
				width: size,
				height: size,
				fontSize: Math.max(12, Math.round(size * 0.36)),
			}}
		>
			{initials}
			{children}
		</span>
	)
}

const AVATAR_TONES: TTone[] = ['brand', 'accent', 'info', 'ok', 'warning']

/**
 * Stable tint for list rows by index
 */
export function avatarTone(index: number): TTone {
	return AVATAR_TONES[index % AVATAR_TONES.length]
}
