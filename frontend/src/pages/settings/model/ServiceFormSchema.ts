import { z } from 'zod'

import { SERVICE_CATEGORIES } from './Services'

export const SERVICE_MATERIALS = [
	'composite',
	'adhesive',
	'etchant',
	'anesthetic',
	'gloves',
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
