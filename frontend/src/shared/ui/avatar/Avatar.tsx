import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'
import { type Tone, TONE_CLASS } from '@/shared/ui/badge'

interface AvatarProps {
	initials: string
	tone?: Tone
	size?: number
	className?: string
	children?: ReactNode
}

/**
 * Initials in a tinted circle; children render on top (e.g. a status dot)
 */
export function Avatar({
	initials,
	tone = 'brand',
	size = 32,
	className,
	children,
}: AvatarProps) {
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

const AVATAR_TONES: Tone[] = ['brand', 'accent', 'info', 'ok', 'warning']

/**
 * Stable tint for list rows by index
 */
export function avatarTone(index: number): Tone {
	return AVATAR_TONES[index % AVATAR_TONES.length]
}
