'use client'

import type { ReactNode } from 'react'

import Link from 'next/link'

import { CalendarDays, ChartColumn, Clock, CreditCard } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { ROUTES } from '@/shared/routes'
import { TONE_CLASS, type TTone } from '@/shared/ui/badge'
import { ProgressBar } from '@/shared/ui/progress'
import { StatCard, StatDelta, StatGrid } from '@/shared/ui/stat-card'

import { useDashboardKpis } from '../model/useDashboardKpis'

type TKpiIconProps = { tone: TTone; children: ReactNode }

function KpiIcon({ tone, children }: TKpiIconProps) {
	return (
		<span
			className={cn(
				'flex size-8.5 shrink-0 items-center justify-center rounded-[10px]',
				TONE_CLASS[tone],
			)}
		>
			{children}
		</span>
	)
}

export function DashboardKpis() {
	const t = useTranslations('Dashboard')
	const kpis = useDashboardKpis()

	return (
		<StatGrid label={t('dailySummary')}>
			<StatCard
				label={t('appointmentsToday')}
				value={kpis.appointments}
				icon={
					<KpiIcon tone='brand'>
						<CalendarDays size={17} aria-hidden='true' />
					</KpiIcon>
				}
				footer={
					<>
						<StatDelta>{kpis.appointmentsChange}</StatDelta>{' '}
						{kpis.appointmentsComparison}
					</>
				}
			/>
			<StatCard
				label={t('chairUtilization')}
				value={kpis.utilization}
				delay={50}
				icon={
					<KpiIcon tone='info'>
						<ChartColumn size={17} aria-hidden='true' />
					</KpiIcon>
				}
			>
				<ProgressBar
					value={kpis.utilizationPercent}
					label={t('chairUtilization')}
				/>
			</StatCard>
			<StatCard
				label={t('revenueToday')}
				value={kpis.revenue}
				unit={t('som')}
				delay={100}
				icon={
					<KpiIcon tone='ok'>
						<CreditCard size={17} aria-hidden='true' />
					</KpiIcon>
				}
				footer={
					<>
						<StatDelta>{kpis.revenueChange}</StatDelta> {t('vsDailyAverage')}
					</>
				}
			/>
			<StatCard
				label={t('awaitingPayment')}
				value={kpis.awaitingPayment}
				unit={t('som')}
				delay={150}
				icon={
					<KpiIcon tone='warning'>
						<Clock size={17} aria-hidden='true' />
					</KpiIcon>
				}
				footer={
					<>
						{kpis.debtors}{' '}
						<Link
							href={ROUTES.billing}
							className='font-semibold text-brand no-underline hover:underline'
						>
							{t('open')}
						</Link>
					</>
				}
			/>
		</StatGrid>
	)
}
