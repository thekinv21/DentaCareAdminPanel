import { cn } from '@/shared/lib/cn'

import type { TDentalChartModel } from '../model/useDentalChart'
import { ToothButton } from './ToothButton'

type TToothArchProps = {
	chart: TDentalChartModel
	teeth: number[]
	upper: boolean
}

export function ToothArch({ chart, teeth, upper }: TToothArchProps) {
	return (
		<div
			className={cn('grid gap-0.5', upper ? 'items-end' : 'items-start')}
			style={{ gridTemplateColumns: `repeat(${teeth.length}, minmax(0, 1fr))` }}
		>
			{teeth.map(n => (
				<ToothButton key={n} chart={chart} n={n} upper={upper} />
			))}
		</div>
	)
}
