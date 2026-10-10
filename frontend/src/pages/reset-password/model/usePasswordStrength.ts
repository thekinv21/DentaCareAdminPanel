'use client'

import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import { PASSWORD_RULES } from '@/shared/lib/validation'

import { STRENGTH, type TResetValues } from './Schema'

/**
 * Live strength meter and rule checklist of the new password
 */
export function usePasswordStrength() {
	const tValidation = useTranslations('Validation')
	const { control } = useFormContext<TResetValues>()
	const password = useWatch({ control, name: 'password' })
	const score = PASSWORD_RULES.filter(rule => rule.test(password)).length
	const strength = STRENGTH[score]

	return {
		meter: [0, 1, 2, 3].map(i => (i < score ? strength.color : 'bg-line')),
		strength: { label: tValidation(strength.label), textClass: strength.text },
		rules: PASSWORD_RULES.map(rule => ({
			label: tValidation(rule.label),
			ok: rule.test(password),
		})),
	}
}
