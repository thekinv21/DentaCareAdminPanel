'use client'

import Link from 'next/link'

import { Plus } from 'lucide-react'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { useI18n } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { buttonClass } from '@/shared/ui/button'

import { ChairTimeline } from './ChairTimeline'
import { DashboardKpis } from './DashboardKpis'
import { NextPatientCard } from './NextPatientCard'
import { TodaySchedule } from './TodaySchedule'

export function DashboardPage() {
	const { t } = useI18n()
	return (
		<>
			<PageHeader
				crumb={t('Пятница, 9 октября 2026')}
				title={t('Главная')}
				actions={
					<Link
						href={ROUTES.appointments}
						className={buttonClass({ variant: 'primary' })}
					>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						{t('Новая запись')}
					</Link>
				}
			/>
			<PageContent>
				<DashboardKpis />
				<section className='flex flex-wrap items-stretch gap-4'>
					<TodaySchedule />
					<NextPatientCard />
				</section>
				<ChairTimeline />
			</PageContent>
		</>
	)
}
