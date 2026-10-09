'use client'

import { useState } from 'react'

import Link from 'next/link'

import { Ellipsis } from 'lucide-react'

import {
	type Appointment,
	AppointmentStatusBadge,
	TODAY_APPOINTMENTS,
} from '@/entities/appointment'
import { DOCTORS } from '@/entities/employee'

import { getInitials } from '@/shared/lib/format'
import { ROUTES } from '@/shared/routes'
import { Avatar, avatarTone } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Card, CardHeader } from '@/shared/ui/card'
import { IconButton } from '@/shared/ui/icon-button'
import { Segmented } from '@/shared/ui/segmented'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

type Filter = 'all' | 'upcoming' | 'done'

const FILTERS: { id: Filter; label: string }[] = [
	{ id: 'all', label: 'Все' },
	{ id: 'upcoming', label: 'Предстоящие' },
	{ id: 'done', label: 'Завершённые' },
]

function isFinished(appointment: Appointment) {
	return appointment.status === 'done' || appointment.status === 'noshow'
}

export function TodaySchedule() {
	const [filter, setFilter] = useState<Filter>('all')

	const rows = TODAY_APPOINTMENTS.filter(appointment => {
		if (filter === 'all') return true
		return filter === 'done'
			? isFinished(appointment)
			: !isFinished(appointment)
	})

	return (
		<Card
			as='section'
			className='min-h-[380px] flex-[2_1_560px] animate-rise'
			style={{ animationDelay: '200ms' }}
		>
			<CardHeader
				title='Расписание на сегодня'
				description='4 кресла · 3 врача'
				actions={
					<Segmented
						aria-label='Фильтр'
						options={FILTERS}
						value={filter}
						onChange={setFilter}
					/>
				}
			/>
			<TableScroll className='max-h-[420px] min-h-0 flex-auto'>
				<Table className='min-w-[640px]'>
					<thead>
						<tr>
							<Th className='w-16'>Время</Th>
							<Th>Пациент</Th>
							<Th>Услуга</Th>
							<Th>Кресло</Th>
							<Th>Статус</Th>
							<Th className='w-24'>
								<span className='sr-only'>Действия</span>
							</Th>
						</tr>
					</thead>
					<tbody>
						{rows.map(appointment => {
							const index = TODAY_APPOINTMENTS.indexOf(appointment)
							return (
								<tr key={appointment.id}>
									<Td mono nowrap className='font-semibold'>
										{appointment.time}
									</Td>
									<Td>
										<div className='flex items-center gap-2.5'>
											<Avatar
												initials={getInitials(appointment.patientName)}
												tone={avatarTone(index)}
											/>
											<div className='min-w-0'>
												<Link
													href={ROUTES.patient(appointment.patientId)}
													className='block font-semibold whitespace-nowrap text-ink no-underline hover:underline'
												>
													{appointment.patientName}
												</Link>
												<span className='font-mono text-[11.5px] text-ink-muted'>
													{appointment.patientId}
												</span>
											</div>
										</div>
									</Td>
									<Td>
										{appointment.procedure}
										<div className='text-[12.5px] leading-[18px] whitespace-nowrap text-ink-muted'>
											{DOCTORS[appointment.doctorId].shortName} ·{' '}
											{appointment.duration} мин
										</div>
									</Td>
									<Td nowrap>Кресло {appointment.chair}</Td>
									<Td>
										<AppointmentStatusBadge status={appointment.status} />
									</Td>
									<Td align='right' nowrap>
										{appointment.status === 'next' ? (
											<Button size='sm' className='border-accent text-accent'>
												Пригласить
											</Button>
										) : (
											<IconButton
												quiet
												size='sm'
												aria-label={`Действия: ${appointment.patientName}`}
											>
												<Ellipsis size={16} aria-hidden='true' />
											</IconButton>
										)}
									</Td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</TableScroll>
		</Card>
	)
}
