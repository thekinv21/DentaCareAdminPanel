'use client'

import { useTranslations } from 'next-intl'

import { DOCTORS } from '@/entities/employee'

import { mockRequest } from '@/shared/api'
import { useFormat } from '@/shared/lib/i18n'
import { useConfirm } from '@/shared/ui/confirm-dialog'

import { endTime } from './AppointmentFormSchema'
import type { TAppointmentFormModel } from './useAppointmentForm'

type TAppointmentActionsOptions = {
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
}: TAppointmentActionsOptions) {
	const t = useTranslations('AppointmentForm')
	const format = useFormat()
	const confirm = useConfirm()
	const event = form.item

	const confirmSubject = (subtitle: string) => ({
		title: form.patient?.name ?? '',
		initials: form.patient?.initials,
		tone: form.patient?.tone,
		subtitle,
	})
	const removeAndClose = () => {
		if (event) onRemove(event.key)
		form.close()
	}
	const readFormSummary = () => {
		const { start, duration, chair, doctor } = form.methods.getValues()
		return {
			start,
			end: endTime(start, duration),
			chair: t('chairN', { n: chair }),
			doctor: format.name(DOCTORS[doctor].shortName),
		}
	}

	return {
		remove: () => {
			if (!event) return
			const { start, end, chair, doctor } = readFormSummary()
			confirm({
				tone: 'danger',
				title: t('deleteAppointmentQuestion'),
				description: t('deleteAppointmentDescription'),
				subject: confirmSubject(`${start}–${end} · ${chair} · ${doctor}`),
				confirmText: t('deleteAppointment'),
				pendingText: t('deleting'),
				successText: t('appointmentDeleted'),
				undo: {
					onUndo: () => onRestore(event.key),
					text: t('appointmentRestored'),
				},
				onConfirm: () => mockRequest().then(removeAndClose),
			})
		},
		cancelVisit: () => {
			const { start, doctor } = readFormSummary()
			confirm({
				tone: 'warning',
				title: t('cancelVisitQuestion'),
				description: t('cancelVisitDescription'),
				subject: confirmSubject(`${start} · ${doctor}`),
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
				onConfirm: () => mockRequest().then(removeAndClose),
			})
		},
	}
}
