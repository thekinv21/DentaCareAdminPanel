'use client'

import { useTranslations } from 'next-intl'
import { useFormState } from 'react-hook-form'

import { errorKeyOf } from './ErrorKey'

/**
 * Translated validation error of a field in the surrounding `FormProvider`
 */
export function useFieldError(name: string) {
	const t = useTranslations('Validation')
	const { errors } = useFormState({ name })
	const message = errorKeyOf(errors, name)
	return message ? t(message) : undefined
}
