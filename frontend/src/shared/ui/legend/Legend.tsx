import type { CSSProperties } from 'react'

import { cn } from '@/shared/lib/cn'

export interface LegendItem {
	label: string
	/**
	 * Classes for the swatch (background/border)
	 */
	swatch: string
	swatchStyle?: CSSProperties
}

export function Legend({
	items,
	className,
}: {
	items: LegendItem[]
	className?: string
}) {
	return (
		<ul
			className={cn(
				'flex flex-wrap gap-x-3.5 gap-y-1.5 text-xs text-ink-muted',
				className,
			)}
		>
			{items.map(item => (
				<li key={item.label} className='inline-flex items-center gap-1.5'>
					<span
						className={cn('size-2.75 rounded-[3px]', item.swatch)}
						style={item.swatchStyle}
					/>
					{item.label}
				</li>
			))}
		</ul>
	)
}
