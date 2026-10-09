import { cn } from '@/shared/lib/cn'

import type { TDentalChartModel } from '../model/useDentalChart'
import { QuadrantLabels } from './QuadrantLabels'
import { ToothArch } from './ToothArch'

const PERMANENT_QUADRANTS: number[] = [1, 2, 3, 4]
const PRIMARY_QUADRANTS: number[] = [5, 6, 7, 8]

type TToothBoardProps = { chart: TDentalChartModel }

export function ToothBoard({ chart }: TToothBoardProps) {
	const { permanent } = chart
	const quadrants = permanent ? PERMANENT_QUADRANTS : PRIMARY_QUADRANTS

	return (
		<div className='min-w-0 flex-[1_1_640px] overflow-x-auto'>
			<div
				className={cn(
					'mx-auto rounded-[18px] border border-line bg-raised px-2 py-3',
					permanent ? 'min-w-160' : 'max-w-140 min-w-105',
				)}
			>
				<QuadrantLabels quadrants={quadrants} position='upper' />
				<ToothArch chart={chart} teeth={chart.upper} upper />
				<div className='mx-1 my-1.5 h-px bg-line-strong opacity-60' />
				<ToothArch chart={chart} teeth={chart.lower} upper={false} />
				<QuadrantLabels quadrants={quadrants} position='lower' />
			</div>
		</div>
	)
}
