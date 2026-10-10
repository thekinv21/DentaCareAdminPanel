'use client'

import { useTranslations } from 'next-intl'

import { useFieldProps } from '@/shared/lib/form'
import { FormField, inputClass } from '@/shared/ui/field'

import type { TInvoiceFormInput } from '../model/InvoiceFormSchema'

export function InvoiceDueDateField() {
	const t = useTranslations('InvoiceForm')
	const inputProps = useFieldProps<TInvoiceFormInput>()

	return (
		<FormField name='dueDate' label={t('dueDate')}>
			<input className={`${inputClass} font-mono`} {...inputProps('dueDate')} />
		</FormField>
	)
}
