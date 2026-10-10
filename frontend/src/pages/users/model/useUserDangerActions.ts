'use client'

import { useTranslations } from 'next-intl'

import { mockRequest } from '@/shared/api'
import { type TConfirmSubject, useConfirm } from '@/shared/ui/confirm-dialog'

import { useDeactivateConfirm } from './useDeactivateConfirm'

type TDangerActionsOptions = {
	subject: TConfirmSubject
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

	const { confirmDeactivate } = useDeactivateConfirm()

	const onResetPassword = () =>
		confirm({
			tone: 'warning',
			title: t('resetPasswordQuestion'),
			description: t('resetPasswordDescription'),
			confirmText: t('resetAndSendSms'),
			pendingText: t('sending'),
			successText: t('linkSentTo', { phone }),
			onConfirm: () => mockRequest(),
		})

	const onDeactivate = () =>
		confirmDeactivate({
			subject,
			description: t('deactivateShortDescription'),
			onDeactivated,
		})

	const onDelete = () =>
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
		})

	return { onResetPassword, onDeactivate, onDelete }
}
