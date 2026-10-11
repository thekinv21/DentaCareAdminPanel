import { z } from 'zod'

import { toMinutes } from '@/entities/appointment'

import { timeSchema } from '@/shared/lib/validation'

export const SHIFT_TYPES = ['work', 'off', 'leave', 'sick', 'cover'] as const
export const SHIFT_REPEATS = ['once', 'week', 'twoWeeks'] as const

export const shiftFormSchema = z
	.object({
		type: z.enum(SHIFT_TYPES),
		from: timeSchema,
		to: timeSchema,
		chair: z.number(),
		repeat: z.enum(SHIFT_REPEATS),
	})
	.refine(
		shift =>
			shift.type !== 'work' || toMinutes(shift.to) > toMinutes(shift.from),
		{ path: ['to'], message: 'endAfterStart' },
	)

export type TShiftFormValues = z.infer<typeof shiftFormSchema>
