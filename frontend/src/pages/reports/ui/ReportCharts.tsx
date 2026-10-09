'use client'

import { PaymentMethodTile } from '@/entities/invoice'

import { useI18n } from '@/shared/lib/i18n'
import { Card, CardHeader } from '@/shared/ui/card'
import { Legend } from '@/shared/ui/legend'
import { ProgressBar } from '@/shared/ui/progress'

import type { ReportModel } from '../model/use-report'
import { RevenueChart } from './RevenueChart'

export function ReportCharts({ report }: { report: ReportModel }) {
	const { t } = useI18n()
	return (
		<section className='flex flex-wrap items-stretch gap-4'>
			<Card
				className='flex-[2_1_560px] animate-rise'
				style={{ animationDelay: '200ms' }}
			>
				<CardHeader
					title={t('Выручка по месяцам')}
					description={t('Тыс. сом · поступившие оплаты')}
					actions={
						<Legend
							items={[
								{ label: t('Выше цели'), swatch: 'bg-brand' },
								{ label: t('Ниже цели'), swatch: 'bg-info' },
								{
									label: t('Цель 2 000'),
									swatch:
										'h-0 w-3.5 rounded-none border-t-2 border-dashed border-accent',
								},
							]}
						/>
					}
				/>
				<RevenueChart bars={report.bars} label={report.chartLabel} />
			</Card>

			<Card
				className='flex-[1_1_280px] animate-rise'
				style={{ animationDelay: '250ms' }}
			>
				<CardHeader
					title={t('По способам оплаты')}
					description={t('Доля от выручки')}
				/>
				<ul className='flex flex-col gap-3.5'>
					{report.methods.map((method, index) => (
						<li key={method.id}>
							<div className='flex items-center justify-between gap-2'>
								<span className='inline-flex items-center gap-2'>
									<PaymentMethodTile method={method.id} size='sm' />
									{method.name}
								</span>
								<span className='font-mono font-semibold'>
									{method.percent}%
								</span>
							</div>
							<ProgressBar
								value={method.bar}
								fillClass={method.barClass}
								delay={index * 60}
								className='mt-1.5'
							/>
						</li>
					))}
				</ul>
			</Card>
		</section>
	)
}
