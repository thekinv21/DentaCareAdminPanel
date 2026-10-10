'use client'

import { useTranslations } from 'next-intl'

/**
 * "Move the staff of the deleted role to…" choice of the delete-role dialog
 */
export function useRoleTransferChoice() {
	const t = useTranslations('RoleTransfer')

	return {
		label: t('transferStaffTo'),
		value: 'assistant',
		items: [
			{ id: 'assistant', label: t('assistant'), hint: t('noFinanceAccess') },
			{ id: 'admin', label: t('admin'), hint: t('scheduleAndPatients') },
			{ id: 'none', label: t('leaveWithoutRole'), hint: t('cantSignIn') },
		],
	}
}
