import { z } from 'zod'

export const SHIFT_TYPES = ['work', 'off', 'leave', 'sick', 'cover'] as const
export const SHIFT_REPEATS = ['once', 'week', '2w'] as const
export const SHIFT_CHAIRS = [1, 2, 3, 4] as const

export const shiftFormSchema = z.object({
	type: z.enum(SHIFT_TYPES),
	from: z.string().trim(),
	to: z.string().trim(),
	chair: z.number(),
	repeat: z.enum(SHIFT_REPEATS),
})

export type TShiftFormValues = z.infer<typeof shiftFormSchema>
