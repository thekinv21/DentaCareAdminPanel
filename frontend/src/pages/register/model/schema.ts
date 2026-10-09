import { z } from 'zod'

import { kgPhoneSchema } from '@/shared/lib/validation'

export const CITIES = ['Бишкек', 'Ош', 'Джалал-Абад', 'Каракол']

export const clinicStepSchema = z.object({
	clinicName: z.string().trim().min(2, 'Укажите название клиники'),
	city: z.enum(CITIES),
	chairs: z.coerce
		.number<string>()
		.int()
		.min(1, 'Минимум 1 кресло')
		.max(50, 'Не больше 50'),
	clinicPhone: kgPhoneSchema,
})

export const adminStepSchema = z.object({
	fullName: z.string().trim().min(3, 'Укажите имя и фамилию'),
	mobile: kgPhoneSchema,
	password: z.string().min(10, 'Минимум 10 символов'),
	agree: z.literal(true, 'Нужно принять условия'),
})

export const registerSchema = clinicStepSchema.extend(adminStepSchema.shape)

export type RegisterInput = z.input<typeof registerSchema>
export type RegisterValues = z.output<typeof registerSchema>

export const CLINIC_FIELDS = Object.keys(
	clinicStepSchema.shape,
) as (keyof RegisterInput)[]
