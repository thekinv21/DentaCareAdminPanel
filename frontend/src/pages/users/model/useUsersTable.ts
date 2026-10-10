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
import { type TDataGridColumn, useDataGrid } from '@/shared/ui/data-grid'

import type { TUserRow } from './UserRow'
import { useUserActions } from './useUserActions'

type TTypeFilter = 'all' | TUserType

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

function toColumnFilters(type: TTypeFilter, status: TUsersQuery['status']) {
	const filters = []

	if (type !== 'all') filters.push({ id: 'type', value: type })

	if (status !== 'all')
		filters.push({ id: 'active', value: status === 'active' })

	return filters
}

const getSearchText = (row: TUserRow) => row.searchText

function countByType(users: TUser[]) {
	const counts: Partial<Record<TTypeFilter, number>> = { all: users.length }

	users.forEach(user => {
		counts[user.type] = (counts[user.type] ?? 0) + 1
	})

	return counts
}

export function useUsersTable(columns: TDataGridColumn<TUserRow>[]) {
	const t = useTranslations('Users')

	const labels = useUserLabels()

	const roleLabels = useRoleLabels()

	const format = useFormat()

	const actions = useUserActions()

	const form = useForm<TUsersQuery>({ defaultValues: DEFAULT_QUERY })

	const [type, status, search] = useWatch({
		control: form.control,
		name: ['type', 'status', 'search'],
	})

	const users = actions.currentUsers

	const typeCounts = countByType(users)

	const rows = users.map((user): TUserRow => {
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
				id: user.type,
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
			searchText: `${user.fullName} ${user.phone} ${user.email}`,
			onToggleActive: () => actions.onToggleActive(user),
			onDelete: () => actions.onDelete(user),
		}
	})

	const types = TYPE_FILTERS.map(typeFilter => ({
		id: typeFilter,
		label: typeFilter === 'all' ? t('all') : labels.typePlural(typeFilter),
		count: typeCounts[typeFilter] ?? 0,
	}))

	const statuses = [
		{ id: 'all' as const, label: t('all') },
		{ id: 'active' as const, label: t('activeFilter') },
		{ id: 'disabled' as const, label: t('disabledFilter') },
	]

	const filters = toColumnFilters(type, status)

	const { table } = useDataGrid({
		data: rows,
		columns,
		getSearchText,
		search,
		filters,
	})

	const crumb = t('usersBranches', { n: users.length })

	return { form, types, statuses, table, crumb }
}

export type TUsersTableModel = ReturnType<typeof useUsersTable>
