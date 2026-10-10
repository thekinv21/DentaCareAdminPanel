'use client'

import { useTranslations } from 'next-intl'
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
import type { TRoleFormValues, TScope } from './RoleFormSchema'

const triState = (values: boolean[]): TCheckState =>
	values.every(Boolean) ? true : values.some(Boolean) ? 'mixed' : false

export function usePermissionMatrix() {
	const t = useTranslations('RoleForm')

	const labels = useRoleLabels()

	const { control, setValue } = useFormContext<TRoleFormValues>()

	const [permissions, scope] = useWatch({
		control,
		name: ['permissions', 'scope'],
	})

	const isGranted = (moduleId: string, action: TPermissionAction) =>
		!!permissions[moduleId]?.includes(action)

	const setPermissions = (next: TPermissions) =>
		setValue('permissions', next, { shouldDirty: true })

	const setModuleActions = (moduleId: string, actions: TPermissionAction[]) =>
		setPermissions({ ...permissions, [moduleId]: actions })

	const replaceAll = (keepAction: (action: TPermissionAction) => boolean) =>
		setPermissions(
			Object.fromEntries(
				PERMISSION_MODULES.map(permissionModule => [
					permissionModule.id,
					permissionModule.actions.filter(keepAction),
				]),
			),
		)

	const rows = PERMISSION_MODULES.map(permissionModule => {
		const name = labels.moduleName(permissionModule.name)

		const state = triState(
			permissionModule.actions.map(action =>
				isGranted(permissionModule.id, action),
			),
		)

		return {
			id: permissionModule.id,
			name,
			hint: labels.moduleName(permissionModule.hint),
			isScoped: !!permissionModule.scoped,
			scope: scope[permissionModule.id] ?? 'all',
			onScopeChange: (value: TScope) =>
				setValue(`scope.${permissionModule.id}`, value, { shouldDirty: true }),
			state,
			onToggleRow: () =>
				setModuleActions(
					permissionModule.id,
					state === true ? [] : permissionModule.actions,
				),
			cells: PERMISSION_ACTIONS.map(action => {
				const isChecked = isGranted(permissionModule.id, action.id)

				const current = permissions[permissionModule.id] ?? []

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

	const columns = PERMISSION_ACTIONS.map(action => {
		const modules = PERMISSION_MODULES.filter(permissionModule =>
			permissionModule.actions.includes(action.id),
		)

		const state = triState(
			modules.map(permissionModule =>
				isGranted(permissionModule.id, action.id),
			),
		)

		return {
			id: action.id,
			label: labels.action(action.label),
			state,
			onToggle: () =>
				setPermissions({
					...permissions,
					...Object.fromEntries(
						modules.map(permissionModule => {
							const others = (permissions[permissionModule.id] ?? []).filter(
								granted => granted !== action.id,
							)

							return [
								permissionModule.id,
								state === true ? others : [...others, action.id],
							]
						}),
					),
				}),
		}
	})

	const scopes = [
		{ id: 'all' as const, label: t('scopeAll') },
		{ id: 'own' as const, label: t('scopeOwn') },
	]

	const granted = countGranted(permissions)

	const total = PERMISSIONS_TOTAL

	const onAllOn = () => replaceAll(() => true)

	const onAllOff = () => replaceAll(() => false)

	const onViewOnly = () => replaceAll(action => action === 'view')

	return {
		rows,
		columns,
		scopes,
		granted,
		total,
		onAllOn,
		onAllOff,
		onViewOnly,
	}
}

export type TPermissionMatrixModel = ReturnType<typeof usePermissionMatrix>
export type TPermissionRow = TPermissionMatrixModel['rows'][number]
