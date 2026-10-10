'use client'

import { useTranslations } from 'next-intl'

import { mockRequest } from '@/shared/api'
import { type TConfirmSubject, useConfirm } from '@/shared/ui/confirm-dialog'

type TDeactivateRequest = {
	subject: TConfirmSubject
	description: string
	onDeactivated: () => void
}

/**
 * The deactivation dialog shared by the users list and the user form
 */
export function useDeactivateConfirm() {
	const t = useTranslations('Users')

	const confirm = useConfirm()

	const confirmDeactivate = (request: TDeactivateRequest) => {
		const { subject, description, onDeactivated } = request

		confirm({
			tone: 'warning',
			title: t('deactivateQuestion'),
			description,
			subject,
			options: [
				{
					id: 'logout',
					label: t('endSessions'),
					hint: t('endSessionsHint'),
					checked: true,
				},
				{
					id: 'move',
					label: t('moveAppointments'),
					hint: t('moveAppointmentsHint'),
				},
				{ id: 'notify', label: t('notifyBySms') },
			],
			confirmText: t('deactivate'),
			pendingText: t('disabling'),
			successText: t('userDeactivated'),
			onConfirm: () => mockRequest().then(onDeactivated),
		})
	}

	return { confirmDeactivate }
}
