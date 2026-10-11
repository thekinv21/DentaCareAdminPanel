import { z } from 'zod'

export const roleFormSchema = z.object({
	name: z.string().trim().min(2, 'enterRoleName'),
	description: z.string().trim(),
	color: z.string(),
	permissions: z.record(
		z.string(),
		z.array(z.enum(['view', 'create', 'edit', 'delete'])),
	),
})

export type TRoleFormValues = z.infer<typeof roleFormSchema>
