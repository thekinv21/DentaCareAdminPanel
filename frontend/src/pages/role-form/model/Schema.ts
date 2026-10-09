import { z } from 'zod'

export const roleFormSchema = z.object({
	name: z.string().trim().min(2, 'enterRoleName'),
	description: z.string().trim(),
})

export type TRoleFormValues = z.infer<typeof roleFormSchema>
