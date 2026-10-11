'use client'

import { useTranslations } from 'next-intl'

import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'

import type { TDentalChartModel } from '../model/useDentalChart'
import { SelectedToothHeader } from './SelectedToothHeader'
import { SurfacePicker } from './SurfacePicker'

type TSelectedToothPanelProps = { chartModel: TDentalChartModel }

export function SelectedToothPanel({ chartModel }: TSelectedToothPanelProps) {
	const t = useTranslations('DentalChart')

	return (
		<aside
			aria-label={t('selectedTooth')}
			className='flex max-w-90 min-w-0 flex-[1_1_280px] flex-col gap-3 rounded-[18px] border border-line bg-raised p-4 max-mobile:max-w-none'
		>
			<SelectedToothHeader
				toothNumber={chartModel.selectedTooth}
				toothName={chartModel.selectedName}
			/>

			<div className='flex flex-wrap gap-1.5'>
				{chartModel.selectedTags.map(tag => (
					<Badge key={tag.label} tone={tag.tone}>
						{tag.label}
					</Badge>
				))}
			</div>

			<SurfacePicker chartModel={chartModel} />

			<p className='rounded-xl border border-line bg-surface px-3 py-2.5 text-[13px] leading-4.75'>
				{chartModel.selectedNote}
			</p>

			<div className='mt-auto flex gap-2'>
				<Button size='sm' className='flex-1' onClick={chartModel.clearSelected}>
					{t('clear')}
				</Button>
				<Button size='sm' variant='primary' className='flex-1' disabled>
					{t('addToTreatmentPlan')}
				</Button>
			</div>
		</aside>
	)
}
