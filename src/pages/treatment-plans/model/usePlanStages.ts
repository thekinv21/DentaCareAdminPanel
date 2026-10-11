'use client'

import { useTranslations } from 'next-intl'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'

import { useFormat } from '@/shared/lib/i18n'

import { planTotals } from '../lib/PlanTotals'
import { NEW_STAGE, type TPlanFormInput } from './PlanFormSchema'

/**
 * Editable stage rows of the plan form with their line sums
 */
export function usePlanStages() {
	const t = useTranslations('PlanForm')
	const format = useFormat()
	const { control } = useFormContext<TPlanFormInput>()
	const stages = useFieldArray({ control, name: 'stages' })
	const values = useWatch({ control, name: 'stages' })
	const { lines } = planTotals(values)

	return {
		rows: stages.fields.map((field, index) => ({
			key: field.id,
			index,
			sum: format.som(lines[index]?.net ?? 0),
			remove: () => stages.remove(index),
		})),
		add: () => stages.append({ ...NEW_STAGE, service: t(NEW_STAGE.service) }),
	}
}
export type TPlanStageRow = ReturnType<typeof usePlanStages>['rows'][number]
