import { cn } from '@/shared/lib/cn'

import type { DentalChartModel } from '../model/use-dental-chart'
import { ToothSvg } from './ToothSvg'

interface ToothArchProps {
	chart: DentalChartModel
	teeth: number[]
	upper: boolean
}

/**
 * One jaw: a row of tooth buttons, numbers on the occlusal side
 */
export function ToothArch({ chart, teeth, upper }: ToothArchProps) {
	return (
		<div
			className={cn('grid gap-0.5', upper ? 'items-end' : 'items-start')}
			style={{ gridTemplateColumns: `repeat(${teeth.length}, minmax(0, 1fr))` }}
		>
			{teeth.map(n => {
				const selected = chart.selected === n
				const number = (
					<span
						className={cn(
							'font-mono text-[11.5px] leading-[14px] font-semibold',
							selected ? 'text-brand-strong' : 'text-ink-muted',
						)}
					>
						{n}
					</span>
				)
				return (
					<button
						key={n}
						type='button'
						onClick={() => chart.pickTooth(n)}
						aria-pressed={selected}
						aria-label={chart.toothLabel(n)}
						className={cn(
							'flex min-w-0 flex-col items-center gap-[3px] rounded-xl border-0 px-px py-1 transition-[background-color,box-shadow] duration-150',
							selected
								? 'bg-brand-soft shadow-[0_0_0_2px_var(--brand)]'
								: 'bg-transparent hover:bg-raised',
						)}
					>
						{!upper && number}
						<ToothSvg
							n={n}
							upper={upper}
							state={chart.stateOf(n)}
							surfaceTitle={(surface, name) =>
								chart.surfaceTitle(n, surface, name)
							}
							onPickSurface={surface => chart.pickSurface(n, surface)}
						/>
						{upper && number}
					</button>
				)
			})}
		</div>
	)
}
