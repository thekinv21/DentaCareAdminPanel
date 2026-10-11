import { z } from 'zod'

import { DOCTOR_IDS } from '@/entities/employee'

import { requiredNumberSchema } from '@/shared/lib/validation'

export const PLAN_PAYMENTS = ['full', 'stage', 'inst'] as const

export const planFormSchema = z.object({
	doctor: z.enum(DOCTOR_IDS),
	name: z.string().trim().min(2, 'enterPlanName'),
	stages: z
		.array(
			z.object({
				service: z.string().trim().min(1, 'enterService'),
				tooth: z.string().trim(),
				qty: z.coerce.number<string>().int().min(1, 'enterAmount'),
				price: requiredNumberSchema,
				discount: z.coerce.number<string>().min(0).max(100, 'discountUpTo100'),
				foms: z.boolean(),
			}),
		)
		.min(1, 'addAtLeastOneStage'),
	payment: z.enum(PLAN_PAYMENTS),
	note: z.string().trim(),
})

export type TPlanFormInput = z.input<typeof planFormSchema>
export type TPlanFormValues = z.output<typeof planFormSchema>

/**
 * Share of a stage covered by the state insurance (ФОМС)
 */
export const FOMS_SHARE = 0.3
export const INSTALLMENT_MONTHS = 6

export const DEFAULT_STAGES: TPlanFormInput['stages'] = [
	{
		service: 'stageRootCanal3',
		tooth: '46',
		qty: '1',
		price: '18000',
		discount: '0',
		foms: true,
	},
	{
		service: 'stageZirconiaCrown',
		tooth: '46',
		qty: '1',
		price: '28000',
		discount: '10',
		foms: false,
	},
	{
		service: 'stageLightCuredFilling',
		tooth: '26',
		qty: '1',
		price: '6000',
		discount: '0',
		foms: false,
	},
	{
		service: 'stageWisdomExtraction',
		tooth: '38',
		qty: '1',
		price: '9000',
		discount: '0',
		foms: true,
	},
]

export const NEW_STAGE: TPlanFormInput['stages'][number] = {
	service: 'stageAirFlow',
	tooth: '—',
	qty: '1',
	price: '4500',
	discount: '0',
	foms: false,
}
