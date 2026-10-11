import { z } from 'zod'

import type { TInvoice, TPaymentMethodId } from '@/entities/invoice'

export const paymentFormSchema = z.object({
	amount: z.coerce.number<string>().int().min(1, 'enterAmount'),
	method: z.custom<TPaymentMethodId>(),
})

export type TPaymentFormInput = z.input<typeof paymentFormSchema>
export type TPaymentFormValues = z.output<typeof paymentFormSchema>

/**
 * Collect the open balance (or the full amount of a paid invoice) via MBank
 */
export const paymentDefaults = (invoice: TInvoice): TPaymentFormInput => ({
	amount: String(invoice.balance || invoice.amount),
	method: 'mbank',
})
