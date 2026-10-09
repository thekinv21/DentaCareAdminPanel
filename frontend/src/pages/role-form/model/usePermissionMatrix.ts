'use client'

import {
	PERMISSION_ACTIONS,
	PERMISSION_MODULES,
	type TPermissionAction,
	type TPermissions,
	useRoleLabels,
} from '@/entities/role'

import type { TCheckState } from '@/shared/ui/checkbox'

export type TScope = 'all' | 'own'

type TMatrixOptions = {
	permissions: TPermissions
	setPermissions: (next: TPermissions) => void
	scope: Record<string, TScope>
	setScope: (module: string, value: TScope) => void
}

const triState = (values: boolean[]): TCheckState =>
	values.every(Boolean) ? true : values.some(Boolean) ? 'mixed' : false

const SUMMARY_ROWS = 8

/**
 * Module × action checkbox grid with row/column toggles and a summary
 */
export function usePermissionMatrix(options: TMatrixOptions) {
	const { permissions, setPermissions, scope, setScope } = options

	const labels = useRoleLabels()
	const has = (module: string, action: TPermissionAction) =>
		!!permissions[module]?.includes(action)

	const setModule = (module: string, actions: TPermissionAction[]) =>
		setPermissions({ ...permissions, [module]: actions })

	const fill = (pick: (action: TPermissionAction) => boolean) =>
		setPermissions(
			Object.fromEntries(
				PERMISSION_MODULES.map(m => [m.id, m.actions.filter(pick)]),
			),
		)

	const total = PERMISSION_MODULES.reduce((n, m) => n + m.actions.length, 0)
	const granted = PERMISSION_MODULES.reduce(
		(n, m) => n + m.actions.filter(a => has(m.id, a)).length,
		0,
	)

	const rows = PERMISSION_MODULES.map(module => {
		const name = labels.module(module.name)
		const state = triState(module.actions.map(a => has(module.id, a)))
		return {
			id: module.id,
			name,
			hint: labels.module(module.hint),
			scoped: !!module.scoped,
			scope: scope[module.id] ?? 'all',
			setScope: (value: TScope) => setScope(module.id, value),
			state,
			toggleRow: () =>
				setModule(module.id, state === true ? [] : module.actions),
			cells: PERMISSION_ACTIONS.map(action => {
				const available = module.actions.includes(action.id)
				const on = has(module.id, action.id)
				return {
					id: action.id,
					available,
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

	const summary = PERMISSION_MODULES.slice(0, SUMMARY_ROWS).map(module => {
		const actions = module.actions.filter(a => has(module.id, a))
		return {
			module: labels.module(module.name),
			actions: actions.map(a => labels.action(a).toLowerCase()),
			own: scope[module.id] === 'own' && actions.length > 0,
		}
	})

	return {
		rows,
		columns,
		granted,
		total,
		percent: Math.round((granted / total) * 100),
		summary,
		allOn: () => fill(() => true),
		allOff: () => fill(() => false),
		viewOnly: () => fill(action => action === 'view'),
	}
}

export type TPermissionMatrixModel = ReturnType<typeof usePermissionMatrix>
