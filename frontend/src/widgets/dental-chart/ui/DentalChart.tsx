'use client'

import { useTranslations } from 'next-intl'

import { Card, CardHeader } from '@/shared/ui/card'

import { CHART_UPDATED_ON } from '../api/Mock'
import { useDentalChart } from '../model/useDentalChart'
import { ChartSummary } from './ChartSummary'
import { ChartToolbar } from './ChartToolbar'
import { DentitionSwitch } from './DentitionSwitch'
import { SelectedToothPanel } from './SelectedToothPanel'
import { ToothBoard } from './ToothBoard'

export function DentalChart() {
	const t = useTranslations('DentalChart')
	const chartModel = useDentalChart()

	return (
		<Card as='section' aria-label={t('toothChart')} className='animate-fade'>
			<CardHeader
				title={t('toothChart')}
				description={t('chartUpdatedOn', { date: CHART_UPDATED_ON })}
				actions={
					<DentitionSwitch
						value={chartModel.dentition}
						onChange={chartModel.switchDentition}
					/>
				}
			/>

			<ChartToolbar tool={chartModel.tool} onChange={chartModel.setTool} />

			<div className='flex flex-wrap items-start gap-4'>
				<ToothBoard chartModel={chartModel} />
				<SelectedToothPanel chartModel={chartModel} />
			</div>

			<ChartSummary counts={chartModel.counts} />
		</Card>
	)
}
