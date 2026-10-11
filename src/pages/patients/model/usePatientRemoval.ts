'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { patientAvatarTone, type TPatient } from '@/entities/patient'

import { mockRequest } from '@/shared/api'
import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { useConfirm } from '@/shared/ui/confirm-dialog'

/**
 * Deleting one patient record (typed code) or several at once (with progress)
 */
export function usePatientRemoval() {
	const t = useTranslations('Patients')
	const format = useFormat()
	const confirm = useConfirm()
	const [removedIds, setRemovedIds] = useState<Set<string>>(new Set())

	const markRemoved = (ids: string[]) =>
		setRemovedIds(current => new Set([...current, ...ids]))

	const remove = (patient: TPatient, onDone?: () => void) => {
		const name = format.name(patient.fullName)
		confirm({
			tone: 'critical',
			title: t('deleteRecordQuestion'),
			description: t('deleteRecordDescription'),
			impact: [
				{ tone: 'danger', n: 14, text: t('impactVisitsInHistory') },
				{ tone: 'danger', n: 1, text: t('impactActivePlan') },
				{ tone: 'warning', n: 2, text: t('impactAppointmentsCancelled') },
				{ tone: 'neutral', n: 6, text: t('impactInvoicesKept') },
			],
			typeToConfirm: patient.id,
			subject: {
				title: name,
				subtitle: `${patient.id} · ${patient.phone}`,
				initials: getInitials(name),
			},
			confirmText: t('deleteRecord'),
			pendingText: t('deleting'),
			successText: t('recordDeleted'),
			onConfirm: () =>
				mockRequest().then(() => {
					markRemoved([patient.id])
					onDone?.()
				}),
		})
	}

	const bulkRemove = (patients: TPatient[], onDone: () => void) => {
		const failOnce = new Set(patients.length > 2 ? [patients[1].id] : [])
		confirm({
			tone: 'danger',
			title: t('deleteNPatientsQuestion', { n: patients.length }),
			description: t('bulkDeleteDescription'),
			confirmText: t('deleteN', { n: patients.length }),
			pendingText: t('deleting'),
			progressText: t('deleted'),
			successText: t('patientsDeleted'),
			bulk: {
				items: patients.map(patient => ({
					id: patient.id,
					name: format.name(patient.fullName),
					tone: patientAvatarTone(patient.id),
				})),
				run: item => {
					const failureReason = failOnce.delete(item.id)
						? t('hasOpenInvoice')
						: undefined
					return mockRequest(undefined, { delay: 160, fail: failureReason })
				},
				onDone: ids => {
					markRemoved(ids)
					onDone()
				},
			},
		})
	}

	return { removedIds, remove, bulkRemove }
}
