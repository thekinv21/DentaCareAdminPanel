'use client'

import { useTranslations } from 'next-intl'

import { Avatar } from '@/shared/ui/avatar'
import { Switch } from '@/shared/ui/switch'

import type { TUserRow } from '../model/UserRow'

type TUsersColumnHeaderProps = {
	label: string
	srOnly?: boolean
}

export function UsersColumnHeader({ label, srOnly }: TUsersColumnHeaderProps) {
	const t = useTranslations('Users')

	return srOnly ? <span className='sr-only'>{t(label)}</span> : t(label)
}

type TUserIdentityProps = {
	row: TUserRow
}

export function UserIdentity({ row }: TUserIdentityProps) {
	return (
		<div className='flex items-center gap-2.5'>
			<Avatar initials={row.initials} tone={row.tone} size={36} />
			<div className='min-w-0'>
				<div className='font-semibold whitespace-nowrap'>{row.name}</div>
				<div className='text-[12.5px] whitespace-nowrap text-ink-muted'>
					{row.email}
				</div>
			</div>
		</div>
	)
}

type TUserRoleLabelProps = {
	role: TUserRow['role']
}

export function UserRoleLabel({ role }: TUserRoleLabelProps) {
	return (
		<span className='inline-flex items-center gap-1.5 font-semibold whitespace-nowrap'>
			<span
				className='size-2 rounded-full'
				style={{ background: role.color }}
			/>
			{role.label}
		</span>
	)
}

type TUserActiveSwitchProps = {
	row: TUserRow
}

export function UserActiveSwitch({ row }: TUserActiveSwitchProps) {
	const t = useTranslations('Users')

	return (
		<Switch
			checked={row.isActive}
			onChange={row.onToggleActive}
			aria-label={`${t('activeColon')} ${row.name}`}
		/>
	)
}
