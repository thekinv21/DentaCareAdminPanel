'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { Card, CardHeader } from '@/shared/ui/card'
import { Segmented } from '@/shared/ui/segmented'

import { useDentalChart } from '../model/useDentalChart'
import { ChartSummary } from './ChartSummary'
import { ChartToolbar } from './ChartToolbar'
import { SelectedToothPanel } from './SelectedToothPanel'
import { ToothArch } from './ToothArch'

const quadrantRow =
	'flex justify-between px-1.5 text-[11px] leading-3.5 font-semibold tracking-[0.06em] text-ink-muted uppercase'

export function DentalChart() {
	const t = useTranslations('DentalChart')
	const chart = useDentalChart()
	const { permanent } = chart
	const q = permanent ? [1, 2, 3, 4] : [5, 6, 7, 8]

	return (
		<Card as='section' aria-label={t('toothChart')} className='animate-fade'>
			<CardHeader
				title={t('toothChart')}
				description={t('fdiNotationUpdated12')}
				actions={
					<Segmented
						aria-label={t('bite')}
						options={[
							{ id: 'permanent', label: t('permanent') },
							{ id: 'primary', label: t('primary') },
						]}
						value={chart.dentition}
						onChange={chart.switchDentition}
					/>
				}
			/>

			<ChartToolbar tool={chart.tool} onChange={chart.setTool} />

			<div className='flex flex-wrap items-start gap-4'>
				<div className='min-w-0 flex-[1_1_640px] overflow-x-auto'>
					<div
						className={cn(
							'mx-auto rounded-[18px] border border-line bg-raised px-2 py-3',
							permanent ? 'min-w-160' : 'max-w-140 min-w-105',
						)}
					>
						<div className={cn(quadrantRow, 'pb-1.5')}>
							<span>{`${t('upperRight')} · ${q[0]}`}</span>
							<span>{`${q[1]} · ${t('upperLeft')}`}</span>
						</div>
						<ToothArch chart={chart} teeth={chart.upper} upper />
						<div className='mx-1 my-1.5 h-px bg-line-strong opacity-60' />
						<ToothArch chart={chart} teeth={chart.lower} upper={false} />
						<div className={cn(quadrantRow, 'pt-1.5')}>
							<span>{`${t('lowerRight')} · ${q[3]}`}</span>
							<span>{`${q[2]} · ${t('lowerLeft')}`}</span>
						</div>
					</div>
				</div>
				<SelectedToothPanel chart={chart} />
			</div>

			<ChartSummary counts={chart.counts} />
		</Card>
	)
}
