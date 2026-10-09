'use client'

import { useTranslations } from 'next-intl'

import { mockRequest } from '@/shared/api'
import { useConfirm } from '@/shared/ui/confirm-dialog'

import type { TAppointmentFormModel } from './useAppointmentForm'

type TActionsOptions = {
	form: TAppointmentFormModel
	onRemove: (key: string) => void
	onRestore: (key: string) => void
}

/**
 * Delete (with undo) and cancel-with-reason for the appointment being edited
 */
export function useAppointmentActions({
	form,
	onRemove,
	onRestore,
}: TActionsOptions) {
	const t = useTranslations('AppointmentForm')
	const confirm = useConfirm()
	const { event, patient, values } = form
	if (!event) return { remove: () => {}, cancelVisit: () => {} }

	const subject = {
		title: patient?.name ?? '',
		initials: patient?.initials,
		tone: patient?.tone,
	}
	const done = () => {
		onRemove(event.key)
		form.close()
	}

	return {
		remove: () =>
			confirm({
				tone: 'danger',
				title: t('deleteAppointmentQuestion'),
				description: t('deleteAppointmentDescription'),
				subject: {
					...subject,
					subtitle: `${values.start}–${form.end} · ${form.summary.chair} · ${form.summary.doctor}`,
				},
				confirmText: t('deleteAppointment'),
				pendingText: t('deleting'),
				successText: t('appointmentDeleted'),
				undo: {
					onUndo: () => onRestore(event.key),
					text: t('appointmentRestored'),
				},
				onConfirm: () => mockRequest().then(done),
			}),
		cancelVisit: () =>
			confirm({
				tone: 'warning',
				title: t('cancelVisitQuestion'),
				description: t('cancelVisitDescription'),
				subject: {
					...subject,
					subtitle: `${values.start} · ${form.summary.doctor}`,
				},
				reasons: [
					t('reasonPatientAsked'),
					t('reasonDoctorSick'),
					t('reasonNoShow'),
					t('reasonMoved'),
				],
				reasonRequired: true,
				options: [
					{
						id: 'sms',
						label: t('sendCancelSms'),
						hint: t('inPatientLanguage'),
						checked: true,
					},
					{
						id: 'wait',
						label: t('addToWaitlist'),
						hint: t('offerNearestSlot'),
					},
				],
				cancelText: t('dontCancel'),
				confirmText: t('cancelVisit'),
				pendingText: t('cancelling'),
				successText: t('visitCancelled'),
				onConfirm: () => mockRequest().then(done),
			}),
	}
}
