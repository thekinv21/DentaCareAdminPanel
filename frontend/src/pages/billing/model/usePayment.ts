'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { INVOICES, type TInvoice } from '@/entities/invoice'

import { mockRequest } from '@/shared/api'

import {
	paymentDefaults,
	paymentFormSchema,
	type TPaymentFormInput,
	type TPaymentFormValues,
} from './PaymentFormSchema'

/**
 * Invoice the payment panel is collecting and its payment form
 */
export function usePayment() {
	const [invoiceIndex, setInvoiceIndex] = useState(0)
	const invoice = INVOICES[invoiceIndex]
	const methods = useForm<TPaymentFormInput, unknown, TPaymentFormValues>({
		resolver: zodResolver(paymentFormSchema),
		defaultValues: paymentDefaults(invoice),
	})

	return {
		methods,
		invoice,
		invoiceIndex,
		done: methods.formState.isSubmitSuccessful,
		saving: methods.formState.isSubmitting,
		start: (next: TInvoice) => {
			setInvoiceIndex(INVOICES.indexOf(next))
			methods.reset(paymentDefaults(next))
		},
		submit: methods.handleSubmit(() => mockRequest()),
		restart: () => methods.reset(paymentDefaults(invoice)),
	}
}

export type TPaymentModel = ReturnType<typeof usePayment>
