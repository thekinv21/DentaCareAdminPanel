import { cn } from '@/shared/lib/cn'

import { ToothIcon } from './ToothIcon'

type TLogoMarkProps = {
	size?: number
	className?: string
}

/**
 * Glossy brand tile with the tooth mark
 */
export function LogoMark({ size = 36, className }: TLogoMarkProps) {
	return (
		<span
			className={cn(
				'flex shrink-0 items-center justify-center rounded-[11px] bg-brand text-on-brand shadow-brand',
				className,
			)}
			style={{ width: size, height: size }}
		>
			<ToothIcon size={Math.round(size * 0.56)} />
		</span>
	)
}
