import { ROUTES } from '@/shared/routes'
import { Badge } from '@/shared/ui/badge'
import { createDataGridColumnHelper } from '@/shared/ui/data-grid'
import { RowActions } from '@/shared/ui/row-actions'

import type { TUserRow } from '../model/UserRow'
import {
	UserActiveSwitch,
	UserIdentity,
	UserRoleLabel,
	UsersColumnHeader,
} from './UserCells'

const column = createDataGridColumnHelper<TUserRow>()

export const USER_COLUMNS = column.columns([
	column.accessor('name', {
		id: 'user',
		header: () => <UsersColumnHeader label='user' />,
		cell: ({ row }) => <UserIdentity row={row.original} />,
	}),
	column.accessor(row => row.type.id, {
		id: 'type',
		filterFn: 'equals',
		header: () => <UsersColumnHeader label='type' />,
		cell: ({ row }) => (
			<Badge tone={row.original.type.tone}>{row.original.type.label}</Badge>
		),
	}),
	column.accessor(row => row.role.label, {
		id: 'role',
		header: () => <UsersColumnHeader label='role' />,
		cell: ({ row }) => <UserRoleLabel role={row.original.role} />,
	}),
	column.accessor('phone', {
		header: () => <UsersColumnHeader label='phone' />,
		meta: { mono: true, nowrap: true, className: 'text-ink-muted' },
	}),
	column.accessor('isActive', {
		id: 'active',
		header: () => <UsersColumnHeader label='active' />,
		meta: { control: true },
		cell: ({ row }) => <UserActiveSwitch row={row.original} />,
	}),
	column.display({
		id: 'actions',
		header: () => <UsersColumnHeader label='actions' srOnly />,
		meta: { align: 'right', nowrap: true, control: true },
		cell: ({ row }) => (
			<RowActions
				subject={row.original.name}
				editHref={ROUTES.user(row.original.id)}
				onDelete={row.original.onDelete}
			/>
		),
	}),
])
