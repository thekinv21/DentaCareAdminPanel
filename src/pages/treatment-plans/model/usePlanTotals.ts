'use client'

import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import { useFormat } from '@/shared/lib/i18n'

import { planTotals } from '../lib/PlanTotals'
import { INSTALLMENT_MONTHS, type TPlanFormInput } from './PlanFormSchema'

/**
 * Live totals of the plan form: sum, discount, ФОМС share and installments
 */
export function usePlanTotals() {
	const t = useTranslations('PlanForm')
	const format = useFormat()
	const { control } = useFormContext<TPlanFormInput>()
	const [stages, payment] = useWatch({ control, name: ['stages', 'payment'] })
	const { sum, discount, foms, total } = planTotals(stages)

	return {
		sum: format.som(sum),
		discount: discount ? `−${format.som(discount)}` : '—',
		foms: foms ? `−${format.som(foms)}` : '—',
		total: format.som(total),
		installment:
			payment === 'inst'
				? t('installmentLine', {
						months: INSTALLMENT_MONTHS,
						amount: format.som(Math.round(total / INSTALLMENT_MONTHS)),
					})
				: undefined,
	}
}
