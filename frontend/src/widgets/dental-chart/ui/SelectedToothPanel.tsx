'use client'

import { useTranslations } from 'next-intl'

import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'

import type { TDentalChartModel } from '../model/useDentalChart'
import { SelectedToothHeader } from './SelectedToothHeader'
import { SurfacePicker } from './SurfacePicker'

type TSelectedToothPanelProps = { chart: TDentalChartModel }

export function SelectedToothPanel({ chart }: TSelectedToothPanelProps) {
	const t = useTranslations('DentalChart')

	return (
		<aside
			aria-label={t('selectedTooth')}
			className='flex max-w-90 min-w-0 flex-[1_1_280px] flex-col gap-3 rounded-[18px] border border-line bg-raised p-4 max-[720px]:max-w-none'
		>
			<SelectedToothHeader
				number={chart.selected}
				name={chart.toothName(chart.selected)}
			/>

			<div className='flex flex-wrap gap-1.5'>
				{chart.tags.map(tag => (
					<Badge key={tag.label} tone={tag.tone}>
						{tag.label}
					</Badge>
				))}
			</div>

			<SurfacePicker chart={chart} />

			<p className='rounded-xl border border-line bg-surface px-3 py-2.5 text-[13px] leading-4.75'>
				{chart.note}
			</p>

			<div className='mt-auto flex gap-2'>
				<Button size='sm' className='flex-1' onClick={chart.clearSelected}>
					{t('clear')}
				</Button>
				<Button size='sm' variant='primary' className='flex-1'>
					{t('addToTreatmentPlan')}
				</Button>
			</div>
		</aside>
	)
}
