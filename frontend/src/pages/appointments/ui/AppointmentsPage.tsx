import type { Metadata } from 'next'

import { Plus } from 'lucide-react'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'

import { AppointmentsCalendar } from './AppointmentsCalendar'

export const metadata: Metadata = { title: 'Записи' }

export function AppointmentsPage() {
	return (
		<>
			<PageHeader
				crumb='Неделя 41 · сегодня пятница, 9 октября'
				title='Записи'
				actions={
					<Button variant='primary'>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						Новая запись
					</Button>
				}
			/>
			<PageContent>
				<AppointmentsCalendar />
			</PageContent>
		</>
	)
}
