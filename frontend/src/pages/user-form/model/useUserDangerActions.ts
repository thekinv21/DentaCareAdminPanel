'use client'

import { useTranslations } from 'next-intl'

import { mockRequest } from '@/shared/api'
import type { Tone } from '@/shared/ui/badge'
import { useConfirm } from '@/shared/ui/confirm-dialog'

type TDangerActionsOptions = {
	subject: { title: string; subtitle: string; initials: string; tone?: Tone }
	phone: string
	onDeactivated: () => void
	onDeleted: () => void
}

/**
 * Password reset, deactivation and deletion of an existing user
 */
export function useUserDangerActions(options: TDangerActionsOptions) {
	const { subject, phone, onDeactivated, onDeleted } = options

	const t = useTranslations('UserForm')
	const tUsers = useTranslations('Users')
	const confirm = useConfirm()

	return {
		resetPassword: () =>
			confirm({
				tone: 'warning',
				title: t('resetPasswordQuestion'),
				description: t('resetPasswordDescription'),
				confirmText: t('resetAndSendSms'),
				pendingText: t('sending'),
				successText: t('linkSentTo', { phone }),
				onConfirm: () => mockRequest(),
			}),
		deactivate: () =>
			confirm({
				tone: 'warning',
				title: tUsers('deactivateQuestion'),
				description: t('deactivateShortDescription'),
				subject,
				options: [
					{
						id: 'logout',
						label: tUsers('endSessions'),
						hint: tUsers('endSessionsHint'),
						checked: true,
					},
					{
						id: 'move',
						label: tUsers('moveAppointments'),
						hint: tUsers('moveAppointmentsHint'),
					},
					{ id: 'notify', label: tUsers('notifyBySms') },
				],
				confirmText: tUsers('deactivate'),
				pendingText: tUsers('disabling'),
				successText: tUsers('userDeactivated'),
				onConfirm: () => mockRequest().then(onDeactivated),
			}),
		remove: () =>
			confirm({
				tone: 'critical',
				title: tUsers('deleteUserQuestion'),
				description: t('deleteForeverDescription'),
				subject,
				typeToConfirm: t('deleteWord'),
				impact: [
					{ tone: 'danger', n: 1, text: t('impactAccount') },
					{ tone: 'warning', n: 6, text: t('impactFutureAppointments') },
					{ tone: 'neutral', n: 412, text: t('impactVisitsKept') },
				],
				confirmText: t('deleteForever'),
				pendingText: tUsers('deleting'),
				successText: tUsers('userDeleted'),
				onConfirm: () => mockRequest().then(onDeleted),
			}),
	}
}
