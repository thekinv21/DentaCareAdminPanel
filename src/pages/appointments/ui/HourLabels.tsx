import { cn } from '@/shared/lib/cn'

import { GRID_HEIGHT, GRID_HOURS, HOUR_HEIGHT } from '../lib/Layout'

const LAST_HOUR_INDEX = GRID_HOURS.length - 1

const labelShift = (index: number) => {
	if (index === 0) return ''
	return index === LAST_HOUR_INDEX ? '-translate-y-full' : '-translate-y-1/2'
}

/**
 * Hour captions on the left edge of the time grid
 */
export function HourLabels() {
	return (
		<div className='relative' style={{ height: GRID_HEIGHT }}>
			{GRID_HOURS.map((hour, index) => (
				<span
					key={hour}
					className={cn(
						'absolute right-1.5 font-mono text-[11px] leading-3.5 text-ink-subtle',
						labelShift(index),
					)}
					style={{ top: index * HOUR_HEIGHT }}
				>
					{hour}
				</span>
			))}
		</div>
	)
}
