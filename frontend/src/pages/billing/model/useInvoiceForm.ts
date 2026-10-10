'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import type { TInvoice } from '@/entities/invoice'

import { mockRequest } from '@/shared/api'
import { useFormModal } from '@/shared/lib/form'
import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { useToast } from '@/shared/ui/toast'

import {
	DEFAULT_ITEMS,
	invoiceFormSchema,
	type TInvoiceFormInput,
	type TInvoiceFormValues,
} from './InvoiceFormSchema'

const NEW_INVOICE_PATIENT = { name: 'Айгуль Тойчубекова', id: 'DN-20418' }

/**
 * New/edit invoice in a modal
 */
export function useInvoiceForm() {
	const t = useTranslations('InvoiceForm')
	const format = useFormat()
	const toast = useToast()

	const methods = useForm<TInvoiceFormInput, unknown, TInvoiceFormValues>({
		resolver: zodResolver(invoiceFormSchema),
	})
	const modal = useFormModal<TInvoice>(() =>
		methods.reset({
			basis: 'plan',
			dueDate: '16.10.2026',
			items: DEFAULT_ITEMS.map(item => ({ ...item, name: t(item.name) })),
			discount: '5',
			foms: 'no',
			sms: true,
		}),
	)
	const invoice = modal.item
	const patientName = format.name(
		invoice?.patientName ?? NEW_INVOICE_PATIENT.name,
	)

	const submitWith = (message: string) =>
		methods.handleSubmit(async () => {
			await mockRequest()
			modal.close()
			toast.show(message)
		})

	return {
		...modal,
		methods,
		title: invoice
			? t('invoiceNumber', { number: invoice.number })
			: t('newInvoice'),
		subtitle: invoice
			? t('editSubtitle', { name: patientName })
			: t('createSubtitle'),
		patient: {
			name: patientName,
			meta: invoice
				? `${invoice.patientId} · ${t('debt', { amount: format.som(invoice.balance) })}`
				: t('newInvoicePatientMeta'),
			initials: getInitials(patientName),
		},
		saving: methods.formState.isSubmitting,
		/**
		 * Creates the invoice without moving on to payment
		 */
		submitOnly: submitWith(
			invoice
				? t('invoiceUpdated')
				: t('invoiceCreated', { number: 'INV-26-0419' }),
		),
		submit: submitWith(
			invoice ? t('invoiceUpdated') : t('invoiceCreatedPickMethod'),
		),
	}
}

export type TInvoiceFormModel = ReturnType<typeof useInvoiceForm>
