'use client'

import Link from 'next/link'

import { Pencil, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { IconButton } from '@/shared/ui/icon-button'
import { Switch } from '@/shared/ui/switch'
import { Td } from '@/shared/ui/table'

import type { TUsersTableModel } from '../model/useUsersTable'

const rowActionClass =
	'inline-flex h-8 min-w-8 items-center justify-center rounded-xl text-ink-muted transition-colors hover:bg-raised'

type TUserRowProps = { row: TUsersTableModel['rows'][number] }

export function UserRow({ row }: TUserRowProps) {
	const t = useTranslations('Users')
	const dim = row.active ? undefined : 'opacity-55'

	return (
		<tr>
			<Td className={dim}>
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
			<Td className={dim}>
				<Badge tone={row.type.tone}>{row.type.label}</Badge>
			</Td>
			<Td className={dim}>
				<span className='inline-flex items-center gap-1.5 font-semibold whitespace-nowrap'>
					<span
						className='size-2 rounded-full'
						style={{ background: row.role.color }}
					/>
					{row.role.label}
				</span>
			</Td>
			<Td nowrap className={dim}>
				{row.branch}
			</Td>
			<Td mono nowrap className={cn('text-ink-muted', dim)}>
				{row.phone}
			</Td>
			<Td nowrap className={cn('text-ink-muted', dim)}>
				{row.lastSeen}
			</Td>
			<Td>
				<Switch
					checked={row.active}
					onChange={row.toggleActive}
					aria-label={`${t('activeColon')} ${row.name}`}
				/>
			</Td>
			<Td align='right' nowrap>
				<span className='inline-flex gap-0.5'>
					<Link
						href={ROUTES.user(row.id)}
						aria-label={`${t('editColon')} ${row.name}`}
						title={t('edit')}
						className={rowActionClass}
					>
						<Pencil size={16} aria-hidden='true' />
					</Link>
					<IconButton
						quiet
						size='sm'
						aria-label={`${t('deleteColon')} ${row.name}`}
						title={t('delete')}
						onClick={row.remove}
						className='text-danger'
					>
						<Trash2 size={16} aria-hidden='true' />
					</IconButton>
				</span>
			</Td>
		</tr>
	)
}
