'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import {
	CLINIC_STAFF_COUNT,
	PERMISSIONS_TOTAL,
	ROLE_COLORS,
	ROLES,
	type TRole,
	useRoleLabels,
	useRoleTransferChoice,
} from '@/entities/role'

import { mockRequest } from '@/shared/api'
import { useConfirm } from '@/shared/ui/confirm-dialog'
import { useToast } from '@/shared/ui/toast'

/**
 * Role cards with copy and delete (system roles can't be deleted)
 */
export function useRoleCards() {
	const t = useTranslations('Roles')

	const labels = useRoleLabels()

	const transferChoice = useRoleTransferChoice()

	const confirm = useConfirm()

	const toast = useToast()

	const [roles, setRoles] = useState<TRole[]>(ROLES)

	const copy = (role: TRole, name: string) => {
		const copyName = t('copyName', { name })

		setRoles(list => [
			...list,
			{
				...role,
				id: `${role.id}-copy-${list.length}`,
				name: copyName,
				description: t('copyDescription'),
				color: ROLE_COLORS[5].color,
				users: 0,
				system: false,
				members: [],
			},
		])

		toast.show(t('roleCreatedNamed', { name: copyName }))
	}

	const remove = (role: TRole, name: string) => {
		if (role.system) return

		confirm({
			tone: 'danger',
			title: t('deleteRoleQuestion', { name }),
			description: role.users
				? t('deleteRoleUsersDescription', { n: role.users })
				: t('deleteRoleEmptyDescription'),
			choice: role.users ? transferChoice : undefined,
			confirmText: t('deleteRole'),
			pendingText: t('deleting'),
			successText: t('roleDeletedNamed', { name }),
			onConfirm: () =>
				mockRequest().then(() =>
					setRoles(list => list.filter(item => item.id !== role.id)),
				),
		})
	}

	const cards = roles.map(role => {
		const name = labels.text(role.name)

		return {
			id: role.id,
			name,
			description: labels.text(role.description),
			color: role.color,
			system: role.system,
			members: role.members,
			usersText: role.users
				? t('usersCount', { n: role.users })
				: t('notAssigned'),
			permissionsText: t('permissionsOf', {
				n: role.permissionCount,
				total: PERMISSIONS_TOTAL,
			}),
			percent: Math.round((role.permissionCount / PERMISSIONS_TOTAL) * 100),
			modules: role.modules.map(labels.moduleName),
			onCopy: () => copy(role, name),
			onDelete: () => remove(role, name),
		}
	})

	const countText = t('rolesStaff', {
		roles: roles.length,
		staff: CLINIC_STAFF_COUNT,
	})

	return { cards, countText }
}

export type TRoleCardView = ReturnType<typeof useRoleCards>['cards'][number]
