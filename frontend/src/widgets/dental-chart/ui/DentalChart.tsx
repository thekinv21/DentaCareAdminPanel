'use client'

import { useTranslations } from 'next-intl'

import { Card, CardHeader } from '@/shared/ui/card'

import { useDentalChart } from '../model/useDentalChart'
import { ChartSummary } from './ChartSummary'
import { ChartToolbar } from './ChartToolbar'
import { DentitionSwitch } from './DentitionSwitch'
import { SelectedToothPanel } from './SelectedToothPanel'
import { ToothBoard } from './ToothBoard'

export function DentalChart() {
	const t = useTranslations('DentalChart')
	const chart = useDentalChart()

	return (
		<Card as='section' aria-label={t('toothChart')} className='animate-fade'>
			<CardHeader
				title={t('toothChart')}
				description={t('fdiNotationUpdated12')}
				actions={
					<DentitionSwitch
						value={chart.dentition}
						onChange={chart.switchDentition}
					/>
				}
			/>

			<ChartToolbar tool={chart.tool} onChange={chart.setTool} />

			<div className='flex flex-wrap items-start gap-4'>
				<ToothBoard chart={chart} />
				<SelectedToothPanel chart={chart} />
			</div>

			<ChartSummary counts={chart.counts} />
		</Card>
	)
}
