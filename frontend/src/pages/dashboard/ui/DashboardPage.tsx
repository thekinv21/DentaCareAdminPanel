'use client'

import Link from 'next/link'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { ROUTES } from '@/shared/routes'
import { buttonClass } from '@/shared/ui/button'

import { ChairTimeline } from './ChairTimeline'
import { DashboardKpis } from './DashboardKpis'
import { NextPatientCard } from './NextPatientCard'
import { TodaySchedule } from './TodaySchedule'

export function DashboardPage() {
	const t = useTranslations('Dashboard')
	return (
		<>
			<PageHeader
				crumb={t('friday9October2026')}
				title={t('dashboard')}
				actions={
					<Link
						href={ROUTES.appointments}
						className={buttonClass({ variant: 'primary' })}
					>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						{t('newAppointment')}
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
