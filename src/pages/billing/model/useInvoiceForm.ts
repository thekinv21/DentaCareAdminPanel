'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { type TInvoice, useInvoiceLabels } from '@/entities/invoice'
import { PATIENTS } from '@/entities/patient'

import { mockRequest } from '@/shared/api'
import { useFormModal } from '@/shared/lib/form'
import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { useToast } from '@/shared/ui/toast'

import {
	invoiceFormSchema,
	type TInvoiceFormInput,
	type TInvoiceFormValues,
} from './InvoiceFormSchema'
import { newInvoiceValues, valuesFromInvoice } from './InvoiceFormValues'

/**
 * Patient a new invoice is created for (mock: the patient in the chair)
 */
const NEW_INVOICE_PATIENT =
	PATIENTS.find(patient => patient.id === 'DN-20418') ?? PATIENTS[0]

/**
 * New/edit invoice in a modal
 */
export function useInvoiceForm() {
	const t = useTranslations('InvoiceForm')
	const format = useFormat()
	const toast = useToast()
	const invoiceLabels = useInvoiceLabels()

	const methods = useForm<TInvoiceFormInput, unknown, TInvoiceFormValues>({
		resolver: zodResolver(invoiceFormSchema),
	})
	const modal = useFormModal<TInvoice>(invoice =>
		methods.reset(
			invoice
				? valuesFromInvoice(invoice, invoiceLabels.service(invoice))
				: newInvoiceValues(t),
		),
	)
	const invoice = modal.item
	const patientName = format.name(
		invoice?.patientName ?? NEW_INVOICE_PATIENT.fullName,
	)
	const patientId = invoice?.patientId ?? NEW_INVOICE_PATIENT.id
	const patientBalance = invoice?.balance ?? NEW_INVOICE_PATIENT.balance

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
			meta: `${patientId} · ${t('debt', { amount: format.som(patientBalance) })}`,
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
