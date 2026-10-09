'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'

import { AppointmentsCalendar } from './AppointmentsCalendar'

export function AppointmentsPage() {
	const t = useTranslations('Appointments')
	return (
		<>
			<PageHeader
				crumb={t('week41TodayIs')}
				title={t('appointments')}
				actions={
					<Button variant='primary'>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						{t('newAppointment')}
					</Button>
				}
			/>
			<PageContent>
				<AppointmentsCalendar />
			</PageContent>
		</>
	)
}
