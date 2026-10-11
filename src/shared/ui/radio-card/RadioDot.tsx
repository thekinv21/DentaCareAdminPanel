import { cn } from '@/shared/lib/cn'

type TRadioDotProps = { checked: boolean; className?: string }

/**
 * The round mark of a custom radio option
 */
export function RadioDot({ checked, className }: TRadioDotProps) {
	return (
		<span
			className={cn(
				'size-4.5 shrink-0 rounded-full bg-surface',
				checked ? 'border-[5px] border-brand' : 'border-2 border-line-strong',
				className,
			)}
		/>
	)
}
