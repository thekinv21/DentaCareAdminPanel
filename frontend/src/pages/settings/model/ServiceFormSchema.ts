import { z } from 'zod'

export const SERVICE_CATEGORIES = [
	'diag',
	'ther',
	'hyg',
	'surg',
	'orth',
] as const
export const SERVICE_DURATIONS = [30, 45, 60, 90, 120] as const
export const SERVICE_MATERIALS = [
	'comp',
	'bond',
	'etch',
	'anes',
	'glov',
] as const

export const serviceFormSchema = z.object({
	name: z.string().trim().min(2, 'enterServiceName'),
	code: z.string().trim(),
	category: z.enum(SERVICE_CATEGORIES),
	price: z.coerce.number<string>().int().min(1, 'enterPrice'),
	minutes: z.number(),
	materials: z.array(z.string()),
	foms: z.boolean(),
	online: z.boolean(),
})

export type TServiceFormInput = z.input<typeof serviceFormSchema>
export type TServiceFormValues = z.output<typeof serviceFormSchema>
