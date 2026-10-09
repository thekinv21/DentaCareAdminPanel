'use client'

import { useState } from 'react'

import { Download } from 'lucide-react'

import { PageContent, PageHeader } from '@/widgets/page-header'

import {
	PAYMENT_METHODS,
	PaymentMethodTile,
	REVENUE_BY_METHOD,
} from '@/entities/invoice'

import { Avatar } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Card, CardHeader } from '@/shared/ui/card'
import { Legend } from '@/shared/ui/legend'
import { ProgressBar } from '@/shared/ui/progress'
import { Segmented } from '@/shared/ui/segmented'
import { Delta, StatCard, StatGrid } from '@/shared/ui/stat-card'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import {
	DOCTOR_PERFORMANCE,
	MONTHLY_REVENUE,
	RANGE_KPI,
	RANGE_LABEL,
	type ReportRange,
} from '../model/report'
import { RevenueChart } from './RevenueChart'

const RANGES: { id: ReportRange; label: string }[] = [
	{ id: 'half', label: '6 месяцев' },
	{ id: 'year', label: '12 месяцев' },
]

const TOP_SHARE = Math.max(...REVENUE_BY_METHOD.map(item => item.percent))

export function ReportsView() {
	const [range, setRange] = useState<ReportRange>('year')
	const data = range === 'year' ? MONTHLY_REVENUE : MONTHLY_REVENUE.slice(6)
	const total = data.reduce((sum, d) => sum + d.value, 0)
	const kpi = RANGE_KPI[range]

	return (
		<>
			<PageHeader
				crumb={RANGE_LABEL[range]}
				title='Отчёты'
				search={false}
				tools={
					<Segmented
						aria-label='Период'
						options={RANGES}
						value={range}
						onChange={setRange}
					/>
				}
				actions={
					<Button variant='primary'>
						<Download size={17} aria-hidden='true' />
						Экспорт PDF
					</Button>
				}
			/>
			<PageContent>
				<StatGrid label='Показатели'>
					<StatCard
						label='Выручка'
						value={`${(total / 1000).toFixed(1).replace('.', ',')} млн сом`}
						footer={
							<>
								<Delta>{kpi.revenueDelta}</Delta> к прошлому периоду
							</>
						}
					/>
					<StatCard
						label='Новые пациенты'
						value={kpi.newPatients}
						delay={50}
						footer={
							<>
								<Delta>{kpi.newPatientsDelta}</Delta> к прошлому периоду
							</>
						}
					/>
					<StatCard
						label='Средний чек'
						value='4 850'
						unit='сом'
						delay={100}
						footer={
							<>
								<Delta>+4%</Delta> к прошлому периоду
							</>
						}
					/>
					<StatCard
						label='Неявки'
						value='4,8%'
						delay={150}
						footer={
							<>
								<Delta>−1,1 п.п.</Delta> после SMS-напоминаний
							</>
						}
					/>
				</StatGrid>

				<section className='flex flex-wrap items-stretch gap-4'>
					<Card
						className='flex-[2_1_560px] animate-rise'
						style={{ animationDelay: '200ms' }}
					>
						<CardHeader
							title='Выручка по месяцам'
							description='Тыс. сом · поступившие оплаты'
							actions={
								<Legend
									items={[
										{ label: 'Выше цели', swatch: 'bg-brand' },
										{ label: 'Ниже цели', swatch: 'bg-info' },
										{
											label: 'Цель 2 000',
											swatch:
												'h-0 w-3.5 rounded-none border-t-2 border-dashed border-accent',
										},
									]}
								/>
							}
						/>
						<RevenueChart data={data} />
					</Card>

					<Card
						className='flex-[1_1_280px] animate-rise'
						style={{ animationDelay: '250ms' }}
					>
						<CardHeader
							title='По способам оплаты'
							description='Доля от выручки'
						/>
						<ul className='flex flex-col gap-3.5'>
							{REVENUE_BY_METHOD.map((item, index) => {
								const method = PAYMENT_METHODS[item.method]
								return (
									<li key={item.method}>
										<div className='flex items-center justify-between gap-2'>
											<span className='inline-flex items-center gap-2'>
												<PaymentMethodTile method={item.method} size='sm' />
												{method.name}
											</span>
											<span className='font-mono font-semibold'>
												{item.percent}%
											</span>
										</div>
										<ProgressBar
											value={(item.percent / TOP_SHARE) * 100}
											fillClass={method.barClass}
											delay={index * 60}
											className='mt-1.5'
										/>
									</li>
								)
							})}
						</ul>
					</Card>
				</section>

				<Card
					as='section'
					className='animate-rise'
					style={{ animationDelay: '300ms' }}
				>
					<CardHeader
						title='Эффективность врачей'
						description={RANGE_LABEL[range]}
					/>
					<TableScroll>
						<Table className='min-w-[680px]'>
							<thead>
								<tr>
									<Th>Врач</Th>
									<Th align='right'>Приёмы</Th>
									<Th align='right'>Выручка</Th>
									<Th align='right'>Согласие на планы</Th>
									<Th className='w-[200px]'>Загрузка кресла</Th>
								</tr>
							</thead>
							<tbody>
								{DOCTOR_PERFORMANCE.map((doctor, index) => (
									<tr key={doctor.name}>
										<Td>
											<div className='flex items-center gap-2.5'>
												<Avatar initials={doctor.initials} tone={doctor.tone} />
												<div>
													<div className='font-semibold'>{doctor.name}</div>
													<div className='text-[12.5px] leading-[18px] text-ink-muted'>
														{doctor.specialty}
													</div>
												</div>
											</div>
										</Td>
										<Td mono align='right'>
											{doctor.visits[range]}
										</Td>
										<Td mono align='right' className='font-semibold'>
											{doctor.revenue[range]}
										</Td>
										<Td mono align='right'>
											{doctor.planConsent}%
										</Td>
										<Td>
											<div className='flex items-center gap-2'>
												<ProgressBar
													value={doctor.chairLoad}
													delay={index * 60}
													className='flex-grow'
												/>
												<span className='font-mono text-xs'>
													{doctor.chairLoad}%
												</span>
											</div>
										</Td>
									</tr>
								))}
							</tbody>
						</Table>
					</TableScroll>
				</Card>
			</PageContent>
		</>
	)
}
