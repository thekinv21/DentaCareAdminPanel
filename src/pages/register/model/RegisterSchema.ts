import { z } from 'zod'

import { kgPhoneSchema } from '@/shared/lib/validation'

export const CITIES = ['bishkek', 'osh', 'jalalAbad', 'karakol'] as const

const clinicStepSchema = z.object({
	clinicName: z.string().trim().min(2, 'enterTheClinicName'),
	city: z.enum(CITIES),
	chairs: z.coerce
		.number<string>()
		.int()
		.min(1, 'atLeast1Chair')
		.max(50, 'noMoreThan50'),
	clinicPhone: kgPhoneSchema,
})

const adminStepSchema = z.object({
	fullName: z.string().trim().min(3, 'enterYourFullName'),
	mobile: kgPhoneSchema,
	password: z.string().min(10, 'atLeast10Characters'),
	agree: z.literal(true, 'youNeedToAccept'),
})

export const registerSchema = clinicStepSchema.extend(adminStepSchema.shape)

export type TRegisterInput = z.input<typeof registerSchema>
export type TRegisterValues = z.output<typeof registerSchema>

export const CLINIC_FIELDS = Object.keys(
	clinicStepSchema.shape,
) as (keyof TRegisterInput)[]
