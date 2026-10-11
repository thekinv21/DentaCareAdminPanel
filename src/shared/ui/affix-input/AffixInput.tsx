import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/cn'
import { inputClass } from '@/shared/ui/field'

type TAffixInputProps = ComponentProps<'input'> & {
	prefix?: string
	suffix?: string
}

/**
 * Input with a fixed text before (+996) or after (%) the value
 */
export function AffixInput(props: TAffixInputProps) {
	const { prefix, suffix, className, ...rest } = props

	return (
		<span className='relative flex items-center'>
			{prefix && (
				<span className='pointer-events-none absolute left-3 font-mono text-[13px] text-ink-muted'>
					{prefix}
				</span>
			)}
			<input
				className={cn(
					inputClass,
					'font-mono',
					prefix && 'pl-13',
					suffix && 'pr-8.5',
					className,
				)}
				{...rest}
			/>
			{suffix && (
				<span className='pointer-events-none absolute right-3 font-mono text-[13px] text-ink-muted'>
					{suffix}
				</span>
			)}
		</span>
	)
}
