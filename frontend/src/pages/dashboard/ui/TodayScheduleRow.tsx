'use client'

import Link from 'next/link'

import { Ellipsis } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { AppointmentStatusBadge } from '@/entities/appointment'

import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'
import { Td } from '@/shared/ui/table'

import type { TTodayScheduleRow } from '../model/useTodaySchedule'

type TTodayScheduleRowProps = { row: TTodayScheduleRow }

export function TodayScheduleRow({ row }: TTodayScheduleRowProps) {
	const t = useTranslations('Dashboard')

	return (
		<tr>
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
				{/* inviting and the row menu come with the realtime queue */}
				{row.canInvite ? (
					<Button size='sm' className='border-accent text-accent' disabled>
						{t('invite')}
					</Button>
				) : (
					<IconButton
						quiet
						size='sm'
						disabled
						aria-label={`${t('actionsFor')} ${row.patientName}`}
					>
						<Ellipsis size={16} aria-hidden='true' />
					</IconButton>
				)}
			</Td>
		</tr>
	)
}
