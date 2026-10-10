import { z } from 'zod'

export const CODE_LENGTH = 6

export const verifySchema = z.object({
	code: z.array(z.string().regex(/^\d$/)).length(CODE_LENGTH),
	rememberDevice: z.boolean(),
})

export type TVerifyValues = z.infer<typeof verifySchema>
