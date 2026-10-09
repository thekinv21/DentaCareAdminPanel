'use client'

import type { ReactNode } from 'react'

import Link from 'next/link'

import { CalendarDays, ChartColumn, Clock, CreditCard } from 'lucide-react'

import { useI18n } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { type Tone, TONE_CLASS } from '@/shared/ui/badge'
import { ProgressBar } from '@/shared/ui/progress'
import { Delta, StatCard, StatGrid } from '@/shared/ui/stat-card'

function KpiIcon({ tone, children }: { tone: Tone; children: ReactNode }) {
	return (
		<span
			className={`flex size-[34px] shrink-0 items-center justify-center rounded-[10px] ${TONE_CLASS[tone]}`}
		>
			{children}
		</span>
	)
}

export function DashboardKpis() {
	const { t } = useI18n()
	return (
		<StatGrid label={t('Сводка за день')}>
			<StatCard
				label={t('Записей сегодня')}
				value='28'
				icon={
					<KpiIcon tone='brand'>
						<CalendarDays size={17} aria-hidden='true' />
					</KpiIcon>
				}
				footer={
					<>
						<Delta>+4</Delta> {t('к прошлой пятнице · 9 завершено')}
					</>
				}
			/>
			<StatCard
				label={t('Загрузка кресел')}
				value='86%'
				delay={50}
				icon={
					<KpiIcon tone='info'>
						<ChartColumn size={17} aria-hidden='true' />
					</KpiIcon>
				}
			>
				<ProgressBar value={86} label={t('Загрузка кресел')} />
			</StatCard>
			<StatCard
				label={t('Выручка сегодня')}
				value='142 500'
				unit={t('сом')}
				delay={100}
				icon={
					<KpiIcon tone='ok'>
						<CreditCard size={17} aria-hidden='true' />
					</KpiIcon>
				}
				footer={
					<>
						<Delta>+12%</Delta> {t('к среднему за день')}
					</>
				}
			/>
			<StatCard
				label={t('Ожидает оплаты')}
				value='18 400'
				unit={t('сом')}
				delay={150}
				icon={
					<KpiIcon tone='warning'>
						<Clock size={17} aria-hidden='true' />
					</KpiIcon>
				}
				footer={
					<>
						{t('3 пациента ·')}{' '}
						<Link
							href={ROUTES.billing}
							className='font-semibold text-brand no-underline hover:underline'
						>
							{t('Открыть')}
						</Link>
					</>
				}
			/>
		</StatGrid>
	)
}
