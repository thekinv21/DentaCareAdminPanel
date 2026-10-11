'use client'

import { useTranslations } from 'next-intl'

import { mockRequest } from '@/shared/api'
import { useConfirm } from '@/shared/ui/confirm-dialog'

/**
 * Turning a bank on is instant; turning it off asks first (countdown + impact)
 */
export function useBankSwitch() {
	const t = useTranslations('ServiceForm')
	const confirm = useConfirm()

	return (name: string, next: boolean, apply: (next: boolean) => void) => {
		if (next) {
			apply(true)
			return
		}
		confirm({
			tone: 'warning',
			title: t('disableBankQuestion', { name }),
			description: t('disableBankDescription', { name }),
			impact: [
				{ tone: 'warning', n: '38%', text: t('impactBankShare') },
				{ tone: 'info', n: 3, text: t('impactMethodsLeft') },
			],
			countdown: 3,
			confirmText: t('disable'),
			pendingText: t('disabling'),
			successText: t('bankDisabled', { name }),
			onConfirm: () => mockRequest().then(() => apply(false)),
		})
	}
}
