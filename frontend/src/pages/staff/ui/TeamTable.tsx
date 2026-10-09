'use client'

import { Ellipsis, MessageSquare } from 'lucide-react'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { IconButton } from '@/shared/ui/icon-button'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import type { StaffBoardModel } from '../model/use-staff-board'

export function TeamTable({ people }: { people: StaffBoardModel['people'] }) {
	const { t } = useI18n()
	const headers = [
		'Сотрудник',
		'Роль',
		'Статус',
		'Сегодня',
		'Кресло',
		'Телефон',
	]

	return (
		<TableScroll className='min-h-0 flex-auto animate-fade'>
			<Table className='min-w-[860px]'>
				<thead>
					<tr>
						{headers.map(header => (
							<Th key={header}>{t(header)}</Th>
						))}
						<Th>
							<span className='sr-only'>{t('Действия')}</span>
						</Th>
					</tr>
				</thead>
				<tbody>
					{people.map(person => (
						<tr key={person.id}>
							<Td>
								<div className='flex items-center gap-2.5'>
									<Avatar
										initials={person.initials}
										tone={person.tone}
										size={36}
									>
										<span
											className={cn(
												'absolute -right-px -bottom-px size-[11px] rounded-full border-2 border-surface',
												person.status.dotClass,
											)}
										/>
									</Avatar>
									<div className='min-w-0'>
										<div className='font-semibold whitespace-nowrap'>
											{person.name}
										</div>
										<div className='text-[12.5px] leading-[18px] whitespace-nowrap text-ink-muted'>
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
								<IconButton
									quiet
									size='sm'
									aria-label={`${t('Написать:')} ${person.name}`}
								>
									<MessageSquare size={16} aria-hidden='true' />
								</IconButton>
								<IconButton
									quiet
									size='sm'
									aria-label={`${t('Действия:')} ${person.name}`}
								>
									<Ellipsis size={16} aria-hidden='true' />
								</IconButton>
							</Td>
						</tr>
					))}
				</tbody>
			</Table>
		</TableScroll>
	)
}
