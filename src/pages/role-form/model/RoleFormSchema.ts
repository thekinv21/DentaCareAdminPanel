import { z } from 'zod'

import type { TRolePreset } from '@/entities/role'

export type TScope = 'all' | 'own'

const ROLE_PRESET_IDS = [
	'blank',
	'doctor',
	'reception',
	'assistant',
	'finance',
] as const satisfies TRolePreset[]

export const roleFormSchema = z.object({
	name: z.string().trim().min(2, 'enterRoleName'),
	description: z.string().trim(),
	color: z.string(),
	preset: z.enum(ROLE_PRESET_IDS),
	/**
	 * Granted actions per permission module
	 */
	permissions: z.record(
		z.string(),
		z.array(z.enum(['view', 'create', 'edit', 'delete'])),
	),
	/**
	 * Modules limited to the user's own records
	 */
	scope: z.record(z.string(), z.enum(['all', 'own'])),
})

export type TRoleFormValues = z.infer<typeof roleFormSchema>
