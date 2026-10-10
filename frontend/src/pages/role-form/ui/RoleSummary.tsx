'use client'

import { ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Alert } from '@/shared/ui/alert'
import { Avatar } from '@/shared/ui/avatar'
import { Card } from '@/shared/ui/card'
import { Overline } from '@/shared/ui/overline'

import type { TRoleFormModel } from '../model/useRoleForm'
import { useRoleSummary } from '../model/useRoleSummary'

type TRoleSummaryProps = { form: TRoleFormModel }

export function RoleSummary({ form }: TRoleSummaryProps) {
	const t = useTranslations('RoleForm')
	const summary = useRoleSummary(form.fallbackName)

	return (
		<Card
			as='aside'
			className='w-75 shrink-0 gap-4 overflow-auto scrollbar-thin max-laptop:w-full'
		>
			<div className='flex items-center gap-3'>
				<span
					className='inline-flex size-11 shrink-0 items-center justify-center rounded-[13px] text-white'
					style={{ background: summary.color }}
				>
					<ShieldCheck size={20} aria-hidden='true' />
				</span>
				<div>
					<div className='font-display text-[17px] font-extrabold'>
						{summary.name}
					</div>
					<div className='text-[12.5px] text-ink-muted'>
						{t('permissionsOf', { n: summary.granted, total: summary.total })}
					</div>
				</div>
			</div>
			<div className='h-1.5 overflow-hidden rounded-full bg-sunken'>
				<span
					className='block h-full rounded-full transition-[width] duration-200'
					style={{ width: `${summary.percent}%`, background: summary.color }}
				/>
			</div>
			<div>
				<Overline className='mb-2'>{t('summary')}</Overline>
				<ul className='flex flex-col gap-1.75 text-[13px]'>
					{summary.rows.map(row => (
						<li key={row.module} className='flex justify-between gap-2'>
							<span className='font-semibold'>{row.module}</span>
							<span className='text-right text-ink-muted'>
								{row.actions.length
									? `${row.actions.join(', ')}${row.isOwnOnly ? ` · ${t('ownSuffix')}` : ''}`
									: t('noAccess')}
							</span>
						</li>
					))}
				</ul>
			</div>
			{form.members.length > 0 && (
				<div>
					<Overline className='mb-2'>
						{t('staffWithRole', { n: form.membersCount })}
					</Overline>
					<ul className='flex flex-col gap-2'>
						{form.members.map(member => (
							<li key={member.name} className='flex items-center gap-2.5'>
								<Avatar initials={member.initials} tone={member.tone} />
								<span className='min-w-0 flex-1'>
									<span className='block truncate text-[13px] font-semibold'>
										{member.name}
									</span>
									<span className='block text-xs text-ink-muted'>
										{member.subtitle}
									</span>
								</span>
							</li>
						))}
					</ul>
				</div>
			)}
			<Alert tone='warning' size='sm'>
				{t('appliesOnNextLogin')}
			</Alert>
		</Card>
	)
}
