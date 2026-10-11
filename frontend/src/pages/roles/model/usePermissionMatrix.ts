'use client'

import { useFormContext, useWatch } from 'react-hook-form'

import {
	countGranted,
	PERMISSION_ACTIONS,
	PERMISSION_MODULES,
	PERMISSIONS_TOTAL,
	type TPermissionAction,
	useRoleLabels,
} from '@/entities/role'

import type { TCheckState } from '@/shared/ui/checkbox'

import type { TRoleFormValues } from './RoleFormSchema'

const triState = (values: boolean[]): TCheckState =>
	values.every(Boolean) ? true : values.some(Boolean) ? 'mixed' : false

export function usePermissionMatrix() {
	const labels = useRoleLabels()

	const { control, setValue } = useFormContext<TRoleFormValues>()

	const permissions = useWatch({ control, name: 'permissions' })

	const setModuleActions = (moduleId: string, actions: TPermissionAction[]) =>
		setValue(
			'permissions',
			{ ...permissions, [moduleId]: actions },
			{ shouldDirty: true },
		)

	const columns = PERMISSION_ACTIONS.map(action => ({
		id: action.id,
		label: labels.action(action.label),
	}))

	const rows = PERMISSION_MODULES.map(permissionModule => {
		const name = labels.moduleName(permissionModule.name)

		const current = permissions[permissionModule.id] ?? []

		const state = triState(
			permissionModule.actions.map(action => current.includes(action)),
		)

		return {
			id: permissionModule.id,
			name,
			hint: labels.moduleName(permissionModule.hint),
			state,
			onToggleRow: () =>
				setModuleActions(
					permissionModule.id,
					state === true ? [] : permissionModule.actions,
				),
			cells: PERMISSION_ACTIONS.map(action => {
				const isChecked = current.includes(action.id)

				return {
					id: action.id,
					isAvailable: permissionModule.actions.includes(action.id),
					isChecked,
					label: `${name}: ${labels.action(action.label)}`,
					onToggle: () =>
						setModuleActions(
							permissionModule.id,
							isChecked
								? current.filter(granted => granted !== action.id)
								: [...current, action.id],
						),
				}
			}),
		}
	})

	const granted = countGranted(permissions)

	const total = PERMISSIONS_TOTAL

	return { columns, rows, granted, total }
}

export type TPermissionRow = ReturnType<
	typeof usePermissionMatrix
>['rows'][number]
