'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { RowActions } from '@/shared/ui/row-actions'
import { Switch } from '@/shared/ui/switch'
import { Td } from '@/shared/ui/table'

import type { TUsersTableModel } from '../model/useUsersTable'

type TUserRowProps = { row: TUsersTableModel['rows'][number] }

export function UserRow({ row }: TUserRowProps) {
	const t = useTranslations('Users')

	const inactiveClass = row.isActive ? undefined : 'opacity-55'

	return (
		<tr>
			<Td className={inactiveClass}>
				<div className='flex items-center gap-2.5'>
					<Avatar initials={row.initials} tone={row.tone} size={36} />
					<div className='min-w-0'>
						<div className='font-semibold whitespace-nowrap'>{row.name}</div>
						<div className='text-[12.5px] whitespace-nowrap text-ink-muted'>
							{row.email}
						</div>
					</div>
				</div>
			</Td>
			<Td className={inactiveClass}>
				<Badge tone={row.type.tone}>{row.type.label}</Badge>
			</Td>
			<Td className={inactiveClass}>
				<span className='inline-flex items-center gap-1.5 font-semibold whitespace-nowrap'>
					<span
						className='size-2 rounded-full'
						style={{ background: row.role.color }}
					/>
					{row.role.label}
				</span>
			</Td>
			<Td nowrap className={inactiveClass}>
				{row.branch}
			</Td>
			<Td mono nowrap className={cn('text-ink-muted', inactiveClass)}>
				{row.phone}
			</Td>
			<Td nowrap className={cn('text-ink-muted', inactiveClass)}>
				{row.lastSeen}
			</Td>
			<Td>
				<Switch
					checked={row.isActive}
					onChange={row.onToggleActive}
					aria-label={`${t('activeColon')} ${row.name}`}
				/>
			</Td>
			<Td align='right' nowrap>
				<RowActions
					subject={row.name}
					editHref={ROUTES.user(row.id)}
					onDelete={row.onDelete}
				/>
			</Td>
		</tr>
	)
}
