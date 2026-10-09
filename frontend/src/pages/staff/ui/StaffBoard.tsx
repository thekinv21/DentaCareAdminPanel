'use client'

import { useState } from 'react'

import { Ellipsis, MessageSquare } from 'lucide-react'

import {
	STAFF,
	STAFF_ROLE,
	STAFF_STATUS,
	type StaffRole,
} from '@/entities/employee'

import { cn } from '@/shared/lib/cn'
import { getInitials } from '@/shared/lib/format'
import { Avatar } from '@/shared/ui/avatar'
import { Badge, TONE_CLASS } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { IconButton } from '@/shared/ui/icon-button'
import { Legend } from '@/shared/ui/legend'
import { Segmented } from '@/shared/ui/segmented'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import { ROSTER, SHIFT, TODAY_COLUMN, WEEK_DAYS } from '../model/roster'

type View = 'team' | 'roster'
type RoleFilter = 'all' | StaffRole

const VIEWS: { id: View; label: string }[] = [
	{ id: 'team', label: 'Команда' },
	{ id: 'roster', label: 'График смен' },
]

const ROLES: { id: RoleFilter; label: string }[] = [
	{ id: 'all', label: 'Все' },
	{ id: 'dentist', label: 'Врачи' },
	{ id: 'assistant', label: 'Ассистенты' },
	{ id: 'reception', label: 'Администраторы' },
]

function TeamTable({ role }: { role: RoleFilter }) {
	const people = STAFF.filter(person => role === 'all' || person.role === role)
	return (
		<TableScroll className='min-h-0 flex-auto animate-fade'>
			<Table className='min-w-[860px]'>
				<thead>
					<tr>
						<Th>Сотрудник</Th>
						<Th>Роль</Th>
						<Th>Статус</Th>
						<Th>Сегодня</Th>
						<Th>Кресло</Th>
						<Th>Телефон</Th>
						<Th>
							<span className='sr-only'>Действия</span>
						</Th>
					</tr>
				</thead>
				<tbody>
					{people.map(person => {
						const status = STAFF_STATUS[person.status]
						const roleInfo = STAFF_ROLE[person.role]
						return (
							<tr key={person.id}>
								<Td>
									<div className='flex items-center gap-2.5'>
										<Avatar
											initials={getInitials(person.fullName)}
											tone={person.tone}
											size={36}
										>
											<span
												className={cn(
													'absolute -right-px -bottom-px size-[11px] rounded-full border-2 border-surface',
													status.dotClass,
												)}
											/>
										</Avatar>
										<div className='min-w-0'>
											<div className='font-semibold whitespace-nowrap'>
												{person.fullName}
											</div>
											<div className='text-[12.5px] leading-[18px] whitespace-nowrap text-ink-muted'>
												{person.specialty}
											</div>
										</div>
									</div>
								</Td>
								<Td>
									<Badge tone={roleInfo.tone}>{roleInfo.label}</Badge>
								</Td>
								<Td>
									<Badge tone={status.tone}>{status.label}</Badge>
								</Td>
								<Td mono nowrap>
									{person.todayShift}
								</Td>
								<Td nowrap>{person.workplace}</Td>
								<Td mono nowrap className='text-ink-muted'>
									{person.phone}
								</Td>
								<Td align='right' nowrap>
									<IconButton
										quiet
										size='sm'
										aria-label={`Написать: ${person.fullName}`}
									>
										<MessageSquare size={16} aria-hidden='true' />
									</IconButton>
									<IconButton
										quiet
										size='sm'
										aria-label={`Действия: ${person.fullName}`}
									>
										<Ellipsis size={16} aria-hidden='true' />
									</IconButton>
								</Td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		</TableScroll>
	)
}

function RosterTable() {
	return (
		<>
			<TableScroll className='min-h-0 flex-auto animate-fade'>
				<Table className='min-w-[860px]'>
					<thead>
						<tr>
							<Th>Сотрудник</Th>
							{WEEK_DAYS.map((day, index) => (
								<Th
									key={day}
									className={
										index === TODAY_COLUMN ? 'text-brand-strong' : undefined
									}
								>
									{day}
								</Th>
							))}
						</tr>
					</thead>
					<tbody>
						{ROSTER.map(row => (
							<tr key={row.name}>
								<Td>
									<div className='flex items-center gap-2.5'>
										<Avatar initials={getInitials(row.name)} tone={row.tone} />
										<span className='font-semibold whitespace-nowrap'>
											{row.name}
										</span>
									</div>
								</Td>
								{row.days.map((key, index) => (
									<Td key={index}>
										<span
											className={cn(
												'inline-flex h-7 min-w-[92px] items-center justify-center rounded-lg px-2 font-mono text-xs font-semibold whitespace-nowrap',
												TONE_CLASS[SHIFT[key].tone],
											)}
										>
											{SHIFT[key].label}
										</span>
									</Td>
								))}
							</tr>
						))}
					</tbody>
				</Table>
			</TableScroll>
			<Legend
				items={[
					{ label: 'Смена', swatch: TONE_CLASS.brand },
					{ label: 'Отпуск', swatch: TONE_CLASS.accent },
					{ label: 'Нужна замена', swatch: TONE_CLASS.warning },
					{ label: 'Выходной', swatch: TONE_CLASS.neutral },
				]}
			/>
		</>
	)
}

export function StaffBoard() {
	const [view, setView] = useState<View>('team')
	const [role, setRole] = useState<RoleFilter>('all')

	return (
		<Card
			as='section'
			className='min-h-[460px] flex-auto animate-rise max-[720px]:flex-none'
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<Segmented
					aria-label='Раздел'
					options={VIEWS}
					value={view}
					onChange={setView}
				/>
				{view === 'team' ? (
					<Segmented
						aria-label='Роль'
						options={ROLES}
						value={role}
						onChange={setRole}
					/>
				) : (
					<div className='flex items-center gap-2'>
						<span className='text-[12.5px] text-ink-muted'>
							Неделя 41 · 5 – 11 октября
						</span>
						<Button size='sm'>Копировать прошлую</Button>
						<Button size='sm'>Редактировать</Button>
					</div>
				)}
			</div>
			{view === 'team' ? <TeamTable role={role} /> : <RosterTable />}
		</Card>
	)
}
