import { z } from 'zod'

export const INVOICE_BASES = ['plan', 'visit', 'none'] as const
export const FOMS_OPTIONS = ['no', 'yes'] as const

export const invoiceFormSchema = z.object({
	basis: z.enum(INVOICE_BASES),
	dueDate: z
		.string()
		.trim()
		.regex(/^\d{2}\.\d{2}\.\d{4}$/, 'enterDateDdMmYyyy'),
	items: z
		.array(
			z.object({
				name: z.string().trim().min(1, 'enterService'),
				tooth: z.string().trim(),
				price: z.coerce.number<string>().int().min(0, 'enterAmount'),
			}),
		)
		.min(1, 'addAtLeastOneItem'),
	discount: z.coerce.number<string>().min(0).max(100, 'discountUpTo100'),
	foms: z.enum(FOMS_OPTIONS),
	sms: z.boolean(),
})

export type TInvoiceFormInput = z.input<typeof invoiceFormSchema>
export type TInvoiceFormValues = z.output<typeof invoiceFormSchema>

export const FOMS_SHARE = 0.3

export const DEFAULT_ITEMS = [
	{ name: 'itemRootCanal', tooth: '46', price: '9000' },
	{ name: 'itemXRay', tooth: '46', price: '600' },
]

export const NEW_ITEM = { name: 'itemConsultation', tooth: '—', price: '1000' }
