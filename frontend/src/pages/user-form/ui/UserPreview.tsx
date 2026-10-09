'use client'

import { useTranslations } from 'next-intl'

import { USER_TYPE, useUserLabels } from '@/entities/user'

import { cn } from '@/shared/lib/cn'
import { Alert } from '@/shared/ui/alert'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Card } from '@/shared/ui/card'

import { useRoleAccess } from '../model/useRoleAccess'
import type { TUserFormModel } from '../model/useUserForm'

type TUserPreviewProps = { form: TUserFormModel }

export function UserPreview({ form }: TUserPreviewProps) {
	const t = useTranslations('UserForm')
	const labels = useUserLabels()
	const access = useRoleAccess(form.role)
	const { preview } = form

	return (
		<Card
			as='aside'
			className='w-75 shrink-0 gap-4 overflow-auto scrollbar-thin max-[1100px]:w-full'
		>
			<div className='flex flex-col items-center gap-2.5 pt-1.5 text-center'>
				<Avatar
					initials={preview.initials}
					tone={preview.tone}
					size={76}
					className='font-display font-extrabold'
				/>
				<div>
					<div className='font-display text-lg font-extrabold'>
						{preview.name}
					</div>
					<div className='text-[12.5px] text-ink-muted'>{preview.sub}</div>
				</div>
				<div className='flex flex-wrap justify-center gap-1.5'>
					<Badge tone={USER_TYPE[form.type].tone}>
						{labels.type(form.type)}
					</Badge>
					<Badge>
						{t('roleColon')} {access.name}
					</Badge>
				</div>
			</div>
			<div>
				<div className='mb-2 text-[11px] leading-3.5 font-semibold tracking-[0.06em] text-ink-muted uppercase'>
					{t('whatWillBeAvailable')}
				</div>
				<ul className='flex flex-col gap-1.75 text-[13px]'>
					{access.rows.map(row => (
						<li key={row.module} className='flex items-start gap-2'>
							<span
								className={cn(
									'w-4 shrink-0 text-center font-bold',
									row.allowed ? 'text-success' : 'text-ink-subtle',
								)}
							>
								{row.allowed ? '✓' : '×'}
							</span>
							<span>
								<span className='font-semibold'>{row.module}</span>{' '}
								<span className='text-ink-muted'>{row.access}</span>
							</span>
						</li>
					))}
				</ul>
			</div>
			<Alert tone='info' className='text-[13px] leading-4.75'>
				{t('permissionsByRoleNote')}
			</Alert>
		</Card>
	)
}
