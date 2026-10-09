import { cn } from '@/shared/lib/cn'

import type { TDentalChartModel } from '../model/useDentalChart'
import { ToothSvg } from './ToothSvg'

type TToothButtonProps = {
	chart: TDentalChartModel
	n: number
	upper: boolean
}

export function ToothButton({ chart, n, upper }: TToothButtonProps) {
	const selected = chart.selected === n
	const number = (
		<span
			className={cn(
				'font-mono text-[11.5px] leading-3.5 font-semibold',
				selected ? 'text-brand-strong' : 'text-ink-muted',
			)}
		>
			{n}
		</span>
	)

	return (
		<button
			type='button'
			onClick={() => chart.pickTooth(n)}
			aria-pressed={selected}
			aria-label={chart.toothLabel(n)}
			className={cn(
				'flex min-w-0 flex-col items-center gap-0.75 rounded-xl border-0 px-px py-1 transition-[background-color,box-shadow] duration-150',
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
				surfaceTitle={(surface, name) => chart.surfaceTitle(n, surface, name)}
				onPickSurface={surface => chart.pickSurface(n, surface)}
			/>
			{upper && number}
		</button>
	)
}
