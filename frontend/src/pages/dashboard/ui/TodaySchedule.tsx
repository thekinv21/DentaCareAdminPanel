'use client'

import Link from 'next/link'

import { Ellipsis } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { AppointmentStatusBadge } from '@/entities/appointment'

import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Card, CardHeader } from '@/shared/ui/card'
import { IconButton } from '@/shared/ui/icon-button'
import { Segmented } from '@/shared/ui/segmented'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import { useTodaySchedule } from '../model/useTodaySchedule'

export function TodaySchedule() {
	const t = useTranslations('Dashboard')
	const { filter, setFilter, filters, rows } = useTodaySchedule()

	return (
		<Card
			as='section'
			className='min-h-95 flex-[2_1_560px] animate-rise'
			style={{ animationDelay: '200ms' }}
		>
			<CardHeader
				title={t('todaysSchedule')}
				description={t('n4Chairs3Dentists')}
				actions={
					<Segmented
						aria-label={t('filter')}
						options={filters}
						value={filter}
						onChange={setFilter}
					/>
				}
			/>
			<TableScroll className='max-h-105 min-h-0 flex-auto'>
				<Table className='min-w-160'>
					<thead>
						<tr>
							<Th className='w-16'>{t('time')}</Th>
							<Th>{t('patient')}</Th>
							<Th>{t('service')}</Th>
							<Th>{t('chair')}</Th>
							<Th>{t('status')}</Th>
							<Th className='w-24'>
								<span className='sr-only'>{t('actions')}</span>
							</Th>
						</tr>
					</thead>
					<tbody>
						{rows.map(row => (
							<tr key={row.id}>
								<Td mono nowrap className='font-semibold'>
									{row.time}
								</Td>
								<Td>
									<div className='flex items-center gap-2.5'>
										<Avatar initials={row.initials} tone={row.tone} />
										<div className='min-w-0'>
											<Link
												href={ROUTES.patient(row.patientId)}
												className='block font-semibold whitespace-nowrap text-ink no-underline hover:underline'
											>
												{row.patientName}
											</Link>
											<span className='font-mono text-[11.5px] text-ink-muted'>
												{row.patientId}
											</span>
										</div>
									</div>
								</Td>
								<Td>
									{row.procedure}
									<div className='text-[12.5px] leading-4.5 whitespace-nowrap text-ink-muted'>
										{row.details}
									</div>
								</Td>
								<Td nowrap>{row.chair}</Td>
								<Td>
									<AppointmentStatusBadge status={row.status} />
								</Td>
								<Td align='right' nowrap>
									{row.canInvite ? (
										<Button size='sm' className='border-accent text-accent'>
											{t('invite')}
										</Button>
									) : (
										<IconButton
											quiet
											size='sm'
											aria-label={`${t('actionsFor')} ${row.patientName}`}
										>
											<Ellipsis size={16} aria-hidden='true' />
										</IconButton>
									)}
								</Td>
							</tr>
						))}
					</tbody>
				</Table>
			</TableScroll>
		</Card>
	)
}
