'use client'

import { useTranslations } from 'next-intl'

import { PaymentMethodTile } from '@/entities/invoice'

import { Card, CardHeader } from '@/shared/ui/card'
import { Legend } from '@/shared/ui/legend'
import { ProgressBar } from '@/shared/ui/progress'

import type { TReportModel } from '../model/useReport'
import { RevenueChart } from './RevenueChart'

type TReportChartsProps = { report: TReportModel }

export function ReportCharts({ report }: TReportChartsProps) {
	const t = useTranslations('Reports')
	return (
		<section className='flex flex-wrap items-stretch gap-4'>
			<Card
				className='flex-[2_1_560px] animate-rise'
				style={{ animationDelay: '200ms' }}
			>
				<CardHeader
					title={t('revenueByMonth')}
					description={t('kSomPaymentsReceived')}
					actions={
						<Legend
							items={[
								{ label: t('aboveTarget'), swatch: 'bg-brand' },
								{ label: t('belowTarget'), swatch: 'bg-info' },
								{
									label: t('goal2000'),
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
					title={t('byPaymentMethod')}
					description={t('shareOfRevenue')}
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
