'use client'

import { Plus } from 'lucide-react'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { useI18n } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'

import { AppointmentsCalendar } from './AppointmentsCalendar'

export function AppointmentsPage() {
	const { t } = useI18n()
	return (
		<>
			<PageHeader
				crumb={t('Неделя 41 · сегодня пятница, 9 октября')}
				title={t('Записи')}
				actions={
					<Button variant='primary'>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						{t('Новая запись')}
					</Button>
				}
			/>
			<PageContent>
				<AppointmentsCalendar />
			</PageContent>
		</>
	)
}
