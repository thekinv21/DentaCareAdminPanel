'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { mockRequest } from '@/shared/api'
import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { useConfirm } from '@/shared/ui/confirm-dialog'

import type { TreatmentPlan } from './Plans'

/**
 * Deleting a treatment plan; completed stages stay in the patient's history
 */
export function usePlanRemoval() {
	const t = useTranslations('TreatmentPlans')
	const format = useFormat()
	const confirm = useConfirm()
	const [removedKeys, setRemovedKeys] = useState<Set<string>>(new Set())

	const remove = (plan: TreatmentPlan, onDone?: () => void) => {
		const name = format.name(plan.patientName)
		confirm({
			tone: 'danger',
			title: t('deletePlanQuestion'),
			description: t('deletePlanDescription'),
			subject: {
				title: name,
				subtitle: t(plan.title),
				initials: getInitials(name),
			},
			confirmText: t('deletePlan'),
			pendingText: t('deleting'),
			successText: t('planDeleted'),
			onConfirm: () =>
				mockRequest().then(() => {
					setRemovedKeys(current => new Set([...current, plan.patientId]))
					onDone?.()
				}),
		})
	}

	return { removedKeys, remove }
}
