'use client'

import { ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Alert } from '@/shared/ui/alert'
import { Avatar } from '@/shared/ui/avatar'
import { Card } from '@/shared/ui/card'

import type { TRoleFormModel } from '../model/useRoleForm'

const overlineClass =
	'mb-2 text-[11px] leading-3.5 font-semibold tracking-[0.06em] text-ink-muted uppercase'

type TRoleSummaryProps = { form: TRoleFormModel }

export function RoleSummary({ form }: TRoleSummaryProps) {
	const t = useTranslations('RoleForm')
	const { matrix } = form

	return (
		<Card
			as='aside'
			className='w-75 shrink-0 gap-4 overflow-auto scrollbar-thin max-[1100px]:w-full'
		>
			<div className='flex items-center gap-3'>
				<span
					className='inline-flex size-11 shrink-0 items-center justify-center rounded-[13px] text-white'
					style={{ background: form.color }}
				>
					<ShieldCheck size={20} aria-hidden='true' />
				</span>
				<div>
					<div className='font-display text-[17px] font-extrabold'>
						{form.previewName}
					</div>
					<div className='text-[12.5px] text-ink-muted'>
						{t('permissionsOf', { n: matrix.granted, total: matrix.total })}
					</div>
				</div>
			</div>
			<div className='h-1.5 overflow-hidden rounded-full bg-sunken'>
				<span
					className='block h-full rounded-full transition-[width] duration-200'
					style={{ width: `${matrix.percent}%`, background: form.color }}
				/>
			</div>
			<div>
				<div className={overlineClass}>{t('summary')}</div>
				<ul className='flex flex-col gap-1.75 text-[13px]'>
					{matrix.summary.map(row => (
						<li key={row.module} className='flex justify-between gap-2'>
							<span className='font-semibold'>{row.module}</span>
							<span className='text-right text-ink-muted'>
								{row.actions.length
									? `${row.actions.join(', ')}${row.own ? ` · ${t('ownSuffix')}` : ''}`
									: t('noAccess')}
							</span>
						</li>
					))}
				</ul>
			</div>
			{form.members.length > 0 && (
				<div>
					<div className={overlineClass}>
						{t('staffWithRole', { n: form.membersCount })}
					</div>
					<ul className='flex flex-col gap-2'>
						{form.members.map(member => (
							<li key={member.name} className='flex items-center gap-2.5'>
								<Avatar initials={member.initials} tone={member.tone} />
								<span className='min-w-0 flex-1'>
									<span className='block truncate text-[13px] font-semibold'>
										{member.name}
									</span>
									<span className='block text-xs text-ink-muted'>
										{member.sub}
									</span>
								</span>
							</li>
						))}
					</ul>
				</div>
			)}
			<Alert tone='warning' className='text-[13px] leading-4.75'>
				{t('appliesOnNextLogin')}
			</Alert>
		</Card>
	)
}
