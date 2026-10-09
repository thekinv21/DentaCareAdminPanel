'use client'

import Link from 'next/link'

import { useTranslations } from 'next-intl'

import {
	APPOINTMENT_BLOCK_CLASS,
	useAppointmentLabels,
} from '@/entities/appointment'
import { DOCTORS } from '@/entities/employee'

import { cn } from '@/shared/lib/cn'
import { useFormat } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'

import type { PlacedEvent } from '../lib/Layout'

export function EventBlock({ placed }: { placed: PlacedEvent }) {
	const t = useTranslations('Appointments')
	const format = useFormat()
	const labels = useAppointmentLabels()
	const { event, top, height, lane, lanes, end } = placed
	const width = 100 / lanes
	const who = format.name(event.who)
	const what = labels.procedure(event.what)

	return (
		<Link
			href={event.patientId ? ROUTES.patient(event.patientId) : ROUTES.patients}
			title={`${who} · ${what} · ${event.time}–${end} · ${t('chairNumber', { n: event.chair })}`}
			className={cn(
				'absolute z-1 flex flex-col overflow-hidden rounded-[9px] px-1.75 py-1 no-underline transition-[transform,box-shadow] duration-150 hover:z-4 hover:-translate-y-px hover:shadow-float',
				APPOINTMENT_BLOCK_CLASS[event.status],
			)}
			style={{
				top,
				height,
				left: `calc(${(lane * width).toFixed(2)}% + 3px)`,
				width: `calc(${width.toFixed(2)}% - 6px)`,
			}}
		>
			<span className='font-mono text-[10.5px] leading-3.5 opacity-90'>
				{event.time}–{end}
			</span>
			<span className='truncate text-[12.5px] leading-4 font-semibold'>
				{who}
			</span>
			{event.duration >= 45 && (
				<span className='truncate text-[11.5px] leading-3.75 opacity-90'>
					{what} · {format.name(DOCTORS[event.doctorId].shortName)}
				</span>
			)}
		</Link>
	)
}
