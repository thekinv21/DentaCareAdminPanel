'use client'

import { useFormContext, useWatch } from 'react-hook-form'

import {
	PERMISSION_ACTIONS,
	PERMISSION_MODULES,
	PERMISSIONS_TOTAL,
	type TPermissionAction,
	type TPermissions,
	useRoleLabels,
} from '@/entities/role'

import type { TCheckState } from '@/shared/ui/checkbox'

import { countGranted } from '../lib/GrantedCount'
import type { TRoleFormValues, TScope } from './Schema'

const triState = (values: boolean[]): TCheckState =>
	values.every(Boolean) ? true : values.some(Boolean) ? 'mixed' : false

/**
 * Module × action checkbox grid of the role form with row/column toggles and a summary
 */
export function usePermissionMatrix() {
	const labels = useRoleLabels()
	const { control, setValue } = useFormContext<TRoleFormValues>()
	const [permissions, scope] = useWatch({
		control,
		name: ['permissions', 'scope'],
	})

	const has = (module: string, action: TPermissionAction) =>
		!!permissions[module]?.includes(action)
	const setPermissions = (next: TPermissions) =>
		setValue('permissions', next, { shouldDirty: true })
	const setModule = (module: string, actions: TPermissionAction[]) =>
		setPermissions({ ...permissions, [module]: actions })
	const fill = (pick: (action: TPermissionAction) => boolean) =>
		setPermissions(
			Object.fromEntries(
				PERMISSION_MODULES.map(m => [m.id, m.actions.filter(pick)]),
			),
		)

	const granted = countGranted(permissions)

	const rows = PERMISSION_MODULES.map(module => {
		const name = labels.module(module.name)
		const state = triState(module.actions.map(a => has(module.id, a)))
		return {
			id: module.id,
			name,
			hint: labels.module(module.hint),
			scoped: !!module.scoped,
			scope: scope[module.id] ?? 'all',
			setScope: (value: TScope) =>
				setValue(`scope.${module.id}`, value, { shouldDirty: true }),
			state,
			toggleRow: () =>
				setModule(module.id, state === true ? [] : module.actions),
			cells: PERMISSION_ACTIONS.map(action => {
				const on = has(module.id, action.id)
				return {
					id: action.id,
					available: module.actions.includes(action.id),
					on,
					label: `${name}: ${labels.action(action.label)}`,
					toggle: () =>
						setModule(
							module.id,
							on
								? permissions[module.id].filter(a => a !== action.id)
								: [...(permissions[module.id] ?? []), action.id],
						),
				}
			}),
		}
	})

	const columns = PERMISSION_ACTIONS.map(action => {
		const modules = PERMISSION_MODULES.filter(m =>
			m.actions.includes(action.id),
		)
		const state = triState(modules.map(m => has(m.id, action.id)))
		return {
			id: action.id,
			label: labels.action(action.label),
			state,
			toggle: () =>
				setPermissions({
					...permissions,
					...Object.fromEntries(
						modules.map(m => {
							const rest = (permissions[m.id] ?? []).filter(
								a => a !== action.id,
							)
							return [m.id, state === true ? rest : [...rest, action.id]]
						}),
					),
				}),
		}
	})

	return {
		rows,
		columns,
		granted,
		total: PERMISSIONS_TOTAL,
		allOn: () => fill(() => true),
		allOff: () => fill(() => false),
		viewOnly: () => fill(action => action === 'view'),
	}
}
