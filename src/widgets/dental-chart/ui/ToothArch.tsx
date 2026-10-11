import { cn } from '@/shared/lib/cn'

import { HEALTHY_TOOTH, type TChartMap, type TSurface } from '../model/Teeth'
import { ToothButton } from './ToothButton'

type TToothArchProps = {
	teeth: number[]
	isUpper: boolean
	dentitionChart: TChartMap
	selectedTooth: number
	onPickTooth: (toothNumber: number) => void
	onPickSurface: (toothNumber: number, surface: TSurface) => void
}

/**
 * One jaw: a row of teeth
 */
export function ToothArch(props: TToothArchProps) {
	const {
		teeth,
		isUpper,
		dentitionChart,
		selectedTooth,
		onPickTooth,
		onPickSurface,
	} = props

	return (
		<div
			className={cn('grid gap-0.5', isUpper ? 'items-end' : 'items-start')}
			style={{ gridTemplateColumns: `repeat(${teeth.length}, minmax(0, 1fr))` }}
		>
			{teeth.map(toothNumber => (
				<ToothButton
					key={toothNumber}
					toothNumber={toothNumber}
					isUpper={isUpper}
					isSelected={toothNumber === selectedTooth}
					toothState={dentitionChart[toothNumber] ?? HEALTHY_TOOTH}
					onPickTooth={onPickTooth}
					onPickSurface={onPickSurface}
				/>
			))}
		</div>
	)
}
