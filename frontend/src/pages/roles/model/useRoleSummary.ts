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
	const [name, color, permissions, scope] = useWatch({
		control,
		name: ['name', 'color', 'permissions', 'scope'],
	})
	const granted = countGranted(permissions)

	return {
		name: name || fallbackName,
		color,
		granted,
		total: PERMISSIONS_TOTAL,
		percent: Math.round((granted / PERMISSIONS_TOTAL) * 100),
		rows: PERMISSION_MODULES.slice(0, SUMMARY_ROWS).map(permissionModule => {
			const grantedActions = permissionModule.actions.filter(action =>
				permissions[permissionModule.id]?.includes(action),
			)
			return {
				module: labels.module(permissionModule.name),
				actions: grantedActions.map(action =>
					labels.action(action).toLowerCase(),
				),
				isOwnOnly:
					scope[permissionModule.id] === 'own' && grantedActions.length > 0,
			}
		}),
	}
}
