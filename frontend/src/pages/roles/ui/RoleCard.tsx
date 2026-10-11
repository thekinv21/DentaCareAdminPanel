'use client'

import Link from 'next/link'

import { Pencil, ShieldCheck, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ROUTES } from '@/shared/routes'
import { Badge } from '@/shared/ui/badge'
import { Button, buttonClass } from '@/shared/ui/button'

import type { TRoleCardView } from '../model/useRoleCards'

type TRoleCardProps = { role: TRoleCardView }

export function RoleCard({ role }: TRoleCardProps) {
	const t = useTranslations('Roles')

	const tCommon = useTranslations('Common')

	return (
		<article className='flex flex-col gap-3 rounded-[18px] border border-line bg-surface p-4 transition-[box-shadow,border-color] duration-150 hover:border-line-strong hover:shadow-clay-sm'>
			<div className='flex items-start gap-3'>
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
					<div className='line-clamp-2 text-[12.5px] text-ink-muted'>
						{role.description}
					</div>
				</div>
			</div>
			<div className='mt-auto flex items-center justify-between gap-2.5 text-[12.5px] text-ink-muted'>
				<span>{role.usersText}</span>
				<span className='font-mono'>{role.permissionsText}</span>
			</div>
			<div className='flex gap-1.5 border-t border-line pt-3'>
				<Link
					href={ROUTES.role(role.id)}
					className={buttonClass({ size: 'sm', className: 'flex-1' })}
				>
					<Pencil size={15} aria-hidden='true' />
					{t('edit')}
				</Link>
				<Button
					size='sm'
					variant='dangerGhost'
					onClick={role.onDelete}
					disabled={role.system}
					aria-label={tCommon('deleteItem', { name: role.name })}
					title={role.system ? t('systemRoleCantBeDeleted') : t('deleteRole')}
				>
					<Trash2 size={15} aria-hidden='true' />
				</Button>
			</div>
		</article>
	)
}
