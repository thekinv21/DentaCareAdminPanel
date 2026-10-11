import { cn } from '@/shared/lib/cn'

import type { TDentalChartModel } from '../model/useDentalChart'
import { QuadrantLabels } from './QuadrantLabels'
import { ToothArch } from './ToothArch'

const PERMANENT_QUADRANTS = [1, 2, 3, 4]
const PRIMARY_QUADRANTS = [5, 6, 7, 8]

type TToothBoardProps = { chartModel: TDentalChartModel }

export function ToothBoard({ chartModel }: TToothBoardProps) {
	const { isPermanent } = chartModel
	const quadrants = isPermanent ? PERMANENT_QUADRANTS : PRIMARY_QUADRANTS
	const archProps = {
		dentitionChart: chartModel.dentitionChart,
		selectedTooth: chartModel.selectedTooth,
		onPickTooth: chartModel.pickTooth,
		onPickSurface: chartModel.pickSurface,
	}

	return (
		<div className='min-w-0 flex-[1_1_640px] overflow-x-auto'>
			<div
				className={cn(
					'mx-auto rounded-[18px] border border-line bg-raised px-2 py-3',
					isPermanent ? 'min-w-160' : 'max-w-140 min-w-105',
				)}
			>
				<QuadrantLabels quadrants={quadrants} position='upper' />
				<ToothArch {...archProps} teeth={chartModel.upperTeeth} isUpper />
				<div className='mx-1 my-1.5 h-px bg-line-strong opacity-60' />
				<ToothArch
					{...archProps}
					teeth={chartModel.lowerTeeth}
					isUpper={false}
				/>
				<QuadrantLabels quadrants={quadrants} position='lower' />
			</div>
		</div>
	)
}
