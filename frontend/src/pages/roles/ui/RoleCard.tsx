'use client'

import Link from 'next/link'

import { Copy, Pencil, ShieldCheck, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Button, buttonClass } from '@/shared/ui/button'

import type { TRoleCard } from '../model/useRoles'

type TRoleCardProps = { role: TRoleCard }

export function RoleCard({ role }: TRoleCardProps) {
	const t = useTranslations('Roles')
	return (
		<article className='flex flex-col gap-3 rounded-[18px] border border-line bg-surface p-4 transition-[box-shadow,border-color] duration-150 hover:border-line-strong hover:shadow-clay-sm'>
			<div className='flex items-center gap-3'>
				<span
					className='inline-flex size-10 shrink-0 items-center justify-center rounded-xl text-white'
					style={{ background: role.color }}
				>
					<ShieldCheck size={19} aria-hidden='true' />
				</span>
				<div className='min-w-0 flex-1'>
					<div className='flex items-center gap-2'>
						<span className='truncate font-display text-base font-extrabold'>
							{role.name}
						</span>
						{role.system && <Badge>{t('system')}</Badge>}
					</div>
					<div className='truncate text-[12.5px] text-ink-muted'>
						{role.description}
					</div>
				</div>
			</div>
			<div className='flex items-center justify-between gap-2.5'>
				<div className='flex items-center gap-2'>
					<div className='flex'>
						{role.members.map((member, index) => (
							<Avatar
								key={index}
								initials={member.initials}
								tone={member.tone}
								size={28}
								className='-ml-1.5 border-2 border-surface first:ml-0'
							/>
						))}
					</div>
					<span className='text-[12.5px] text-ink-muted'>{role.usersText}</span>
				</div>
				<span className='font-mono text-[12.5px] text-ink-muted'>
					{role.permissionsText}
				</span>
			</div>
			<div className='h-1.5 overflow-hidden rounded-full bg-sunken'>
				<span
					className='block h-full rounded-full'
					style={{ width: `${role.percent}%`, background: role.color }}
				/>
			</div>
			<div className='flex flex-wrap gap-1.25'>
				{role.modules.map(module => (
					<Badge key={module} tone='brand'>
						{module}
					</Badge>
				))}
			</div>
			<div className='mt-auto flex gap-1.5 border-t border-line pt-3'>
				<Link
					href={ROUTES.role(role.id)}
					className={buttonClass({ size: 'sm', className: 'flex-1' })}
				>
					<Pencil size={15} aria-hidden='true' />
					{t('edit')}
				</Link>
				<Button
					size='sm'
					onClick={role.copy}
					aria-label={`${t('createCopyColon')} ${role.name}`}
				>
					<Copy size={15} aria-hidden='true' />
					{t('copy')}
				</Button>
				<Button
					size='sm'
					variant='dangerGhost'
					onClick={role.remove}
					aria-label={`${t('deleteColon')} ${role.name}`}
					aria-disabled={role.system}
					title={role.system ? t('systemRoleCantBeDeleted') : t('deleteRole')}
					className={role.system ? 'cursor-not-allowed opacity-40' : undefined}
				>
					<Trash2 size={15} aria-hidden='true' />
				</Button>
			</div>
		</article>
	)
}
