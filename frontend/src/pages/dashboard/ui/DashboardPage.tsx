import type { Metadata } from 'next'
import Link from 'next/link'

import {
	CalendarDays,
	ChartColumn,
	Clock,
	CreditCard,
	Plus,
} from 'lucide-react'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { ROUTES } from '@/shared/routes'
import { type Tone, TONE_CLASS } from '@/shared/ui/badge'
import { buttonClass } from '@/shared/ui/button'
import { ProgressBar } from '@/shared/ui/progress'
import { Delta, StatCard, StatGrid } from '@/shared/ui/stat-card'

import { ChairTimeline } from './ChairTimeline'
import { NextPatientCard } from './NextPatientCard'
import { TodaySchedule } from './TodaySchedule'

export const metadata: Metadata = { title: 'Главная' }

function KpiIcon({
	tone,
	children,
}: {
	tone: Tone
	children: React.ReactNode
}) {
	return (
		<span
			className={`flex size-[34px] shrink-0 items-center justify-center rounded-[10px] ${TONE_CLASS[tone]}`}
		>
			{children}
		</span>
	)
}

export function DashboardPage() {
	return (
		<>
			<PageHeader
				crumb='Пятница, 9 октября 2026'
				title='Главная'
				actions={
					<Link
						href={ROUTES.appointments}
						className={buttonClass({ variant: 'primary' })}
					>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						Новая запись
					</Link>
				}
			/>
			<PageContent>
				<StatGrid label='Сводка за день'>
					<StatCard
						label='Записей сегодня'
						value='28'
						icon={
							<KpiIcon tone='brand'>
								<CalendarDays size={17} aria-hidden='true' />
							</KpiIcon>
						}
						footer={
							<>
								<Delta>+4</Delta> к прошлой пятнице · 9 завершено
							</>
						}
					/>
					<StatCard
						label='Загрузка кресел'
						value='86%'
						delay={50}
						icon={
							<KpiIcon tone='info'>
								<ChartColumn size={17} aria-hidden='true' />
							</KpiIcon>
						}
					>
						<ProgressBar value={86} label='Загрузка кресел' />
					</StatCard>
					<StatCard
						label='Выручка сегодня'
						value='142 500'
						unit='сом'
						delay={100}
						icon={
							<KpiIcon tone='ok'>
								<CreditCard size={17} aria-hidden='true' />
							</KpiIcon>
						}
						footer={
							<>
								<Delta>+12%</Delta> к среднему за день
							</>
						}
					/>
					<StatCard
						label='Ожидает оплаты'
						value='18 400'
						unit='сом'
						delay={150}
						icon={
							<KpiIcon tone='warning'>
								<Clock size={17} aria-hidden='true' />
							</KpiIcon>
						}
						footer={
							<>
								3 пациента ·{' '}
								<Link
									href={ROUTES.billing}
									className='font-semibold text-brand no-underline hover:underline'
								>
									Открыть
								</Link>
							</>
						}
					/>
				</StatGrid>

				<section className='flex flex-wrap items-stretch gap-4'>
					<TodaySchedule />
					<NextPatientCard />
				</section>

				<ChairTimeline />
			</PageContent>
		</>
	)
}
