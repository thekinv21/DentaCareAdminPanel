'use client'

import { useFormContext, useWatch } from 'react-hook-form'

import {
	PERMISSION_MODULES,
	PERMISSIONS_TOTAL,
	useRoleLabels,
} from '@/entities/role'

import { countGranted } from '../lib/GrantedCount'
import type { TRoleFormValues } from './RoleFormSchema'

const SUMMARY_ROWS = 8

/**
 * Live preview of the role being edited: name, color and granted permissions
 */
export function useRoleSummary(fallbackName: string) {
	const labels = useRoleLabels()

	const { control } = useFormContext<TRoleFormValues>()

	const [typedName, color, permissions, scope] = useWatch({
		control,
		name: ['name', 'color', 'permissions', 'scope'],
	})

	const name = typedName || fallbackName

	const granted = countGranted(permissions)

	const total = PERMISSIONS_TOTAL

	const percent = Math.round((granted / total) * 100)

	const rows = PERMISSION_MODULES.slice(0, SUMMARY_ROWS).map(
		permissionModule => {
			const grantedActions = permissionModule.actions.filter(action =>
				permissions[permissionModule.id]?.includes(action),
			)

			return {
				module: labels.moduleName(permissionModule.name),
				actions: grantedActions.map(action =>
					labels.action(action).toLowerCase(),
				),
				isOwnOnly:
					scope[permissionModule.id] === 'own' && grantedActions.length > 0,
			}
		},
	)

	return { name, color, granted, total, percent, rows }
}
