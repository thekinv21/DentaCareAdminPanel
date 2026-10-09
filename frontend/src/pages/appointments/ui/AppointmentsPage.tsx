'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'

import { useAppointmentActions } from '../model/useAppointmentActions'
import { useAppointmentForm } from '../model/useAppointmentForm'
import { useCalendar } from '../model/useCalendar'
import { useRemovedAppointments } from '../model/useRemovedAppointments'
import { AppointmentFormModal } from './AppointmentFormModal'
import { AppointmentsCalendar } from './AppointmentsCalendar'

export function AppointmentsPage() {
	const t = useTranslations('Appointments')
	const removed = useRemovedAppointments()
	const form = useAppointmentForm()
	const actions = useAppointmentActions({
		form,
		onRemove: removed.remove,
		onRestore: removed.restore,
	})
	const calendar = useCalendar({
		removedKeys: removed.removedKeys,
		onOpenEvent: form.openEdit,
	})

	return (
		<>
			<PageHeader
				crumb={t('week41TodayIs')}
				title={t('appointments')}
				actions={
					<Button variant='primary' onClick={form.openCreate}>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						{t('newAppointment')}
					</Button>
				}
			/>
			<PageContent>
				<AppointmentsCalendar calendar={calendar} />
			</PageContent>
			<AppointmentFormModal
				form={form}
				onDelete={actions.remove}
				onCancelVisit={actions.cancelVisit}
			/>
		</>
	)
}
