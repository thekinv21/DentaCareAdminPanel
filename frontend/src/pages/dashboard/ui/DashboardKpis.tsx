'use client'

import type { ReactNode } from 'react'

import Link from 'next/link'

import { CalendarDays, ChartColumn, Clock, CreditCard } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ROUTES } from '@/shared/routes'
import { type Tone, TONE_CLASS } from '@/shared/ui/badge'
import { ProgressBar } from '@/shared/ui/progress'
import { Delta, StatCard, StatGrid } from '@/shared/ui/stat-card'

type TKpiIconProps = { tone: Tone; children: ReactNode }

function KpiIcon({ tone, children }: TKpiIconProps) {
	return (
		<span
			className={`flex size-8.5 shrink-0 items-center justify-center rounded-[10px] ${TONE_CLASS[tone]}`}
		>
			{children}
		</span>
	)
}

export function DashboardKpis() {
	const t = useTranslations('Dashboard')
	return (
		<StatGrid label={t('dailySummary')}>
			<StatCard
				label={t('appointmentsToday')}
				value='28'
				icon={
					<KpiIcon tone='brand'>
						<CalendarDays size={17} aria-hidden='true' />
					</KpiIcon>
				}
				footer={
					<>
						<Delta>+4</Delta> {t('vsLastFriday9')}
					</>
				}
			/>
			<StatCard
				label={t('chairUtilization')}
				value='86%'
				delay={50}
				icon={
					<KpiIcon tone='info'>
						<ChartColumn size={17} aria-hidden='true' />
					</KpiIcon>
				}
			>
				<ProgressBar value={86} label={t('chairUtilization')} />
			</StatCard>
			<StatCard
				label={t('revenueToday')}
				value='142 500'
				unit={t('som')}
				delay={100}
				icon={
					<KpiIcon tone='ok'>
						<CreditCard size={17} aria-hidden='true' />
					</KpiIcon>
				}
				footer={
					<>
						<Delta>+12%</Delta> {t('vsDailyAverage')}
					</>
				}
			/>
			<StatCard
				label={t('awaitingPayment')}
				value='18 400'
				unit={t('som')}
				delay={150}
				icon={
					<KpiIcon tone='warning'>
						<Clock size={17} aria-hidden='true' />
					</KpiIcon>
				}
				footer={
					<>
						{t('n3Patients')}{' '}
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
