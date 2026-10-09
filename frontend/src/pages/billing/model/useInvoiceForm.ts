'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'

import type { Invoice } from '@/entities/invoice'

import { mockRequest } from '@/shared/api'
import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { useToast } from '@/shared/ui/toast'

import {
	DEFAULT_ITEMS,
	FOMS_SHARE,
	invoiceFormSchema,
	NEW_ITEM,
	type TInvoiceFormInput,
	type TInvoiceFormValues,
} from './InvoiceFormSchema'

const NEW_INVOICE_PATIENT = { name: 'Айгуль Тойчубекова', id: 'DN-20418' }

/**
 * New/edit invoice: items, discount, ФОМС share and the amount due
 */
export function useInvoiceForm() {
	const t = useTranslations('InvoiceForm')
	const tValidation = useTranslations('Validation')
	const format = useFormat()
	const toast = useToast()
	const [open, setOpen] = useState(false)
	const [invoice, setInvoice] = useState<Invoice | null>(null)

	const form = useForm<TInvoiceFormInput, unknown, TInvoiceFormValues>({
		resolver: zodResolver(invoiceFormSchema),
	})
	const items = useFieldArray({ control: form.control, name: 'items' })
	const watched = useWatch({ control: form.control })
	const { errors, isSubmitting } = form.formState

	const prices = (watched.items ?? []).map(item => Number(item?.price) || 0)
	const sum = prices.reduce((a, b) => a + b, 0)
	const discount = Math.round((sum * (Number(watched.discount) || 0)) / 100)
	const foms =
		watched.foms === 'yes' ? Math.round((sum - discount) * FOMS_SHARE) : 0

	const translated = (list: typeof DEFAULT_ITEMS) =>
		list.map(item => ({ ...item, name: t(item.name) }))

	const openWith = (next: Invoice | null) => {
		setInvoice(next)
		form.reset({
			basis: 'plan',
			dueDate: '16.10.2026',
			items: translated(DEFAULT_ITEMS),
			discount: '5',
			foms: 'no',
			sms: true,
		})
		setOpen(true)
	}
	const close = () => setOpen(false)
	const patientName = format.name(
		invoice?.patientName ?? NEW_INVOICE_PATIENT.name,
	)

	const submit = (message: string) =>
		form.handleSubmit(async () => {
			await mockRequest()
			close()
			toast.show(message)
		})

	return {
		open,
		isEdit: !!invoice,
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
		basis: watched.basis ?? 'plan',
		setBasis: (value: 'plan' | 'visit' | 'none') =>
			form.setValue('basis', value),
		foms: watched.foms ?? 'no',
		setFoms: (value: 'no' | 'yes') => form.setValue('foms', value),
		sms: !!watched.sms,
		setSms: (value: boolean) => form.setValue('sms', value),
		register: form.register,
		items: items.fields.map((field, index) => ({
			key: field.id,
			index,
			sum: format.som(prices[index] ?? 0),
			invalid: (name: 'name' | 'price') => !!errors.items?.[index]?.[name],
			remove: () => items.remove(index),
		})),
		addItem: () => items.append(translated([NEW_ITEM])[0]),
		errorOf: (message?: string) => (message ? tValidation(message) : undefined),
		errors: {
			dueDate: errors.dueDate?.message,
			discount: errors.discount?.message,
			items: errors.items?.root?.message ?? errors.items?.message,
		},
		totals: {
			sum: format.som(sum),
			discount: `−${format.som(discount)}`,
			foms: foms ? `−${format.som(foms)}` : '—',
			total: format.som(sum - discount - foms),
		},
		close,
		openCreate: () => openWith(null),
		openEdit: (next: Invoice) => openWith(next),
		saving: isSubmitting,
		saveOnly: submit(
			invoice
				? t('invoiceUpdated')
				: t('invoiceCreated', { number: 'INV-26-0419' }),
		),
		save: submit(invoice ? t('invoiceUpdated') : t('invoiceCreatedPickMethod')),
	}
}

export type TInvoiceFormModel = ReturnType<typeof useInvoiceForm>
