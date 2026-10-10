'use client'

import { Check, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import { USER_TYPE, useUserLabels } from '@/entities/user'

import { cn } from '@/shared/lib/cn'
import { Alert } from '@/shared/ui/alert'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Card } from '@/shared/ui/card'
import { Overline } from '@/shared/ui/overline'

import type { TUserFormValues } from '../model/UserFormSchema'
import { useRoleAccess } from '../model/useRoleAccess'
import type { TUserFormModel } from '../model/useUserForm'

type TUserPreviewProps = { preview: TUserFormModel['preview'] }

export function UserPreview({ preview }: TUserPreviewProps) {
	const t = useTranslations('UserForm')

	const labels = useUserLabels()

	const { control } = useFormContext<TUserFormValues>()

	const [type, role] = useWatch({ control, name: ['type', 'role'] })

	const { name: roleName, rows } = useRoleAccess(role)

	return (
		<Card
			as='aside'
			className='w-75 shrink-0 gap-4 overflow-auto scrollbar-thin max-laptop:w-full'
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
					<div className='text-[12.5px] text-ink-muted'>{preview.subtitle}</div>
				</div>
				<div className='flex flex-wrap justify-center gap-1.5'>
					<Badge tone={USER_TYPE[type].tone}>{labels.type(type)}</Badge>
					<Badge>
						{t('roleColon')} {roleName}
					</Badge>
				</div>
			</div>
			<div>
				<Overline className='mb-2'>{t('whatWillBeAvailable')}</Overline>
				<ul className='flex flex-col gap-1.75 text-[13px]'>
					{rows.map(row => (
						<AccessRow key={row.module} row={row} />
					))}
				</ul>
			</div>
			<Alert tone='info' size='sm'>
				{t('permissionsByRoleNote')}
			</Alert>
		</Card>
	)
}

type TAccessRowProps = {
	row: ReturnType<typeof useRoleAccess>['rows'][number]
}

function AccessRow({ row }: TAccessRowProps) {
	const t = useTranslations('UserForm')

	const Icon = row.isAllowed ? Check : X

	return (
		<li className='flex items-start gap-2'>
			<Icon
				size={16}
				strokeWidth={2.6}
				aria-hidden='true'
				className={cn(
					'mt-px shrink-0',
					row.isAllowed ? 'text-success' : 'text-ink-subtle',
				)}
			/>
			<span className='sr-only'>
				{row.isAllowed ? t('accessAllowed') : t('accessDenied')}
			</span>
			<span>
				<span className='font-semibold'>{row.module}</span>{' '}
				<span className='text-ink-muted'>{row.access}</span>
			</span>
		</li>
	)
}
