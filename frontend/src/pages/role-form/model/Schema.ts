import { z } from 'zod'

import type { TPermissions, TRolePreset } from '@/entities/role'

export type TScope = 'all' | 'own'

export const roleFormSchema = z.object({
	name: z.string().trim().min(2, 'enterRoleName'),
	description: z.string().trim(),
	color: z.string(),
	preset: z.custom<TRolePreset>(),
	permissions: z.custom<TPermissions>(),
	/**
	 * Modules limited to the user's own records
	 */
	scope: z.record(z.string(), z.enum(['all', 'own'])),
})

export type TRoleFormValues = z.infer<typeof roleFormSchema>
