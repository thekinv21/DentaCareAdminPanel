'use client'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { ROLES, useRoleLabels } from '@/entities/role'
import {
	type TUser,
	type TUserType,
	USER_TYPE,
	useUserLabels,
} from '@/entities/user'

import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { matchesText } from '@/shared/lib/search'

import { useUserActions } from './useUserActions'

type TTypeFilter = 'all' | TUserType

/**
 * Query of the user list: type tab, active/disabled status and search text
 */
type TUsersQuery = {
	type: TTypeFilter
	status: 'all' | 'active' | 'disabled'
	search: string
}

const DEFAULT_QUERY: TUsersQuery = { type: 'all', status: 'all', search: '' }

const TYPE_FILTERS: TTypeFilter[] = [
	'all',
	'doctor',
	'assistant',
	'admin',
	'accountant',
	'chief',
]

const ROLE_BY_ID = new Map(ROLES.map(role => [role.id, role]))

function matchesQuery(user: TUser, query: TUsersQuery) {
	const { type, status, search } = query
	return (
		(type === 'all' || user.type === type) &&
		(status === 'all' || (status === 'active') === user.active) &&
		matchesText(`${user.fullName} ${user.phone} ${user.email}`, search)
	)
}

function countByType(users: TUser[]) {
	const counts: Partial<Record<TTypeFilter, number>> = { all: users.length }
	users.forEach(user => {
		counts[user.type] = (counts[user.type] ?? 0) + 1
	})
	return counts
}

/**
 * User accounts filtered by type, status and search
 */
export function useUsersTable() {
	const t = useTranslations('Users')
	const labels = useUserLabels()
	const roleLabels = useRoleLabels()
	const format = useFormat()
	const actions = useUserActions()
	const filters = useForm<TUsersQuery>({ defaultValues: DEFAULT_QUERY })
	const [type, status, search] = useWatch({
		control: filters.control,
		name: ['type', 'status', 'search'],
	})
	const users = actions.currentUsers
	const typeCounts = countByType(users)

	const rows = users
		.filter(user => matchesQuery(user, { type, status, search }))
		.map(user => {
			const role = ROLE_BY_ID.get(user.role)
			const name = format.name(user.fullName)
			return {
				id: user.id,
				name,
				initials: getInitials(name),
				tone: user.tone,
				email: user.email,
				phone: user.phone,
				type: {
					label: labels.type(user.type),
					tone: USER_TYPE[user.type].tone,
				},
				role: {
					label: role ? roleLabels.text(role.name) : '',
					color: role?.color,
				},
				branch: labels.branch(user.branch),
				lastSeen: user.active
					? labels.lastSeen(user.lastSeen)
					: t('accessDisabled'),
				isActive: user.active,
				toggleActive: () => actions.toggleActive(user),
				remove: () => actions.remove(user),
			}
		})

	return {
		filters,
		types: TYPE_FILTERS.map(typeFilter => ({
			id: typeFilter,
			label: typeFilter === 'all' ? t('all') : labels.typePlural(typeFilter),
			count: typeCounts[typeFilter] ?? 0,
		})),
		statuses: [
			{ id: 'all' as const, label: t('all') },
			{ id: 'active' as const, label: t('activeFilter') },
			{ id: 'disabled' as const, label: t('disabledFilter') },
		],
		rows,
		countText: t('shownOf', { shown: rows.length, total: users.length }),
	}
}

export type TUsersTableModel = ReturnType<typeof useUsersTable>
