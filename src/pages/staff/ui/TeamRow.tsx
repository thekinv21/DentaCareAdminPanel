'use client'

import { Ellipsis, MessageSquare } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { IconButton } from '@/shared/ui/icon-button'
import { Td } from '@/shared/ui/table'

import type { TTeamMember } from '../model/useStaffOverview'

type TTeamRowProps = { person: TTeamMember }

export function TeamRow({ person }: TTeamRowProps) {
	const t = useTranslations('Staff')

	return (
		<tr>
			<Td>
				<div className='flex items-center gap-2.5'>
					<Avatar initials={person.initials} tone={person.tone} size={36}>
						<span
							className={cn(
								'absolute -right-px -bottom-px size-2.75 rounded-full border-2 border-surface',
								person.status.dotClass,
							)}
						/>
					</Avatar>
					<div className='min-w-0'>
						<div className='font-semibold whitespace-nowrap'>{person.name}</div>
						<div className='text-[12.5px] leading-4.5 whitespace-nowrap text-ink-muted'>
							{person.specialty}
						</div>
					</div>
				</div>
			</Td>
			<Td>
				<Badge tone={person.role.tone}>{person.role.label}</Badge>
			</Td>
			<Td>
				<Badge tone={person.status.tone}>{person.status.label}</Badge>
			</Td>
			<Td mono nowrap>
				{person.shift}
			</Td>
			<Td nowrap>{person.workplace}</Td>
			<Td mono nowrap className='text-ink-muted'>
				{person.phone}
			</Td>
			<Td align='right' nowrap>
				{/* messaging and the row menu come with the backend */}
				<IconButton
					quiet
					size='sm'
					disabled
					aria-label={`${t('message')} ${person.name}`}
				>
					<MessageSquare size={16} aria-hidden='true' />
				</IconButton>
				<IconButton
					quiet
					size='sm'
					disabled
					aria-label={`${t('actionsFor')} ${person.name}`}
				>
					<Ellipsis size={16} aria-hidden='true' />
				</IconButton>
			</Td>
		</tr>
	)
}
