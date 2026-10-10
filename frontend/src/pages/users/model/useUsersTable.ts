'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { ROLES, useRoleLabels } from '@/entities/role'
import {
	type TUser,
	type TUserType,
	USER_TYPE,
	USERS,
	useUserLabels,
} from '@/entities/user'

import { mockRequest } from '@/shared/api'
import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { useConfirm } from '@/shared/ui/confirm-dialog'

type TTypeFilter = 'all' | TUserType

/**
 * Query of the user list: type tab, active/disabled status and search text
 */
type TUsersFilter = {
	type: TTypeFilter
	status: 'all' | 'on' | 'off'
	search: string
}

const DEFAULT_FILTER: TUsersFilter = { type: 'all', status: 'all', search: '' }

const TYPE_ORDER: TUserType[] = [
	'doctor',
	'assistant',
	'admin',
	'accountant',
	'chief',
]

/**
 * User accounts filtered by type, status and search, with activation and
 * deletion through the confirmation dialog
 */
export function useUsersTable() {
	const t = useTranslations('Users')
	const labels = useUserLabels()
	const roleLabels = useRoleLabels()
	const format = useFormat()
	const confirm = useConfirm()
	const filters = useForm<TUsersFilter>({ defaultValues: DEFAULT_FILTER })
	const [type, status, search] = useWatch({
		control: filters.control,
		name: ['type', 'status', 'search'],
	})
	const [users, setUsers] = useState<TUser[]>(USERS)

	const patch = (id: string, change: Partial<TUser>) =>
		setUsers(list => list.map(u => (u.id === id ? { ...u, ...change } : u)))

	const subjectOf = (user: TUser) => ({
		title: format.name(user.fullName),
		initials: getInitials(format.name(user.fullName)),
		tone: user.tone,
	})

	const toggleActive = (user: TUser) => {
		const subject = {
			...subjectOf(user),
			subtitle: `${labels.type(user.type)} · ${labels.branch(user.branch)}`,
		}
		if (!user.active) {
			confirm({
				tone: 'success',
				title: t('restoreAccessQuestion'),
				description: t('restoreAccessDescription'),
				subject,
				confirmText: t('activate'),
				pendingText: t('enabling'),
				successText: t('accessRestored'),
				onConfirm: () =>
					mockRequest().then(() => patch(user.id, { active: true })),
			})
			return
		}
		confirm({
			tone: 'warning',
			title: t('deactivateQuestion'),
			description: t('deactivateDescription'),
			subject,
			options: [
				{
					id: 'logout',
					label: t('endSessions'),
					hint: t('endSessionsHint'),
					checked: true,
				},
				{
					id: 'move',
					label: t('moveAppointments'),
					hint: t('moveAppointmentsHint'),
				},
				{ id: 'notify', label: t('notifyBySms') },
			],
			confirmText: t('deactivate'),
			pendingText: t('disabling'),
			successText: t('userDeactivated'),
			onConfirm: () =>
				mockRequest().then(() => patch(user.id, { active: false })),
		})
	}

	const remove = (user: TUser) =>
		confirm({
			tone: 'danger',
			title: t('deleteUserQuestion'),
			description: t('deleteUserDescription'),
			subject: { ...subjectOf(user), subtitle: user.email },
			confirmText: t('delete'),
			pendingText: t('deleting'),
			successText: t('userDeleted'),
			onConfirm: () =>
				mockRequest().then(() =>
					setUsers(list => list.filter(u => u.id !== user.id)),
				),
		})

	const needle = search.trim().toLowerCase()

	const visible = users.filter(
		user =>
			(type === 'all' || user.type === type) &&
			(status === 'all' || (status === 'on') === user.active) &&
			(!needle ||
				`${user.fullName} ${user.phone} ${user.email}`
					.toLowerCase()
					.includes(needle)),
	)

	const rows = visible.map(user => {
		const role = ROLES.find(r => r.id === user.role)
		const name = format.name(user.fullName)
		return {
			id: user.id,
			name,
			initials: getInitials(name),
			tone: user.tone,
			email: user.email,
			phone: user.phone,
			type: { label: labels.type(user.type), tone: USER_TYPE[user.type].tone },
			role: {
				label: role ? roleLabels.text(role.name) : '',
				color: role?.color,
			},
			branch: labels.branch(user.branch),
			lastSeen: user.active
				? labels.lastSeen(user.lastSeen)
				: t('accessDisabled'),
			active: user.active,
			toggleActive: () => toggleActive(user),
			remove: () => remove(user),
		}
	})

	const count = (filter: TTypeFilter) =>
		users.filter(u => filter === 'all' || u.type === filter).length

	return {
		filters,
		types: (['all', ...TYPE_ORDER] as TTypeFilter[]).map(id => ({
			id,
			label: id === 'all' ? t('all') : labels.typePlural(id),
			count: count(id),
		})),
		statuses: [
			{ id: 'all' as const, label: t('all') },
			{ id: 'on' as const, label: t('activeFilter') },
			{ id: 'off' as const, label: t('disabledFilter') },
		],
		rows,
		countText: t('shownOf', { shown: rows.length, total: users.length }),
		crumb: t('usersBranches', { n: users.length }),
	}
}

export type TUsersTableModel = ReturnType<typeof useUsersTable>
