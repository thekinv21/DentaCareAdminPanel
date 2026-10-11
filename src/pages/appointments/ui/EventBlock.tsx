'use client'

import { useTranslations } from 'next-intl'

import {
	APPOINTMENT_BLOCK_CLASS,
	useAppointmentLabels,
} from '@/entities/appointment'
import { DOCTORS } from '@/entities/employee'

import { cn } from '@/shared/lib/cn'
import { useFormat } from '@/shared/lib/i18n'

import type { TPlacedEvent } from '../lib/Layout'
import type { TCalendarEvent } from '../lib/Schedule'

/**
 * Shorter blocks have no room for the procedure line
 */
const MIN_MINUTES_FOR_DETAILS = 45

type TEventBlockProps = {
	placed: TPlacedEvent
	onOpen: (event: TCalendarEvent) => void
}

export function EventBlock({ placed, onOpen }: TEventBlockProps) {
	const { event, top, height, lane, lanes, end } = placed

	const t = useTranslations('Appointments')
	const format = useFormat()
	const labels = useAppointmentLabels()

	const widthPercent = 100 / lanes
	const patientName = format.name(event.patientName)
	const procedure = labels.procedure(event.procedure, event.tooth)

	return (
		<button
			type='button'
			onClick={() => onOpen(event)}
			title={`${patientName} · ${procedure} · ${event.time}–${end} · ${t('chairNumber', { n: event.chair })}`}
			className={cn(
				'absolute z-1 flex flex-col items-start overflow-hidden rounded-[9px] px-1.75 py-1 text-left transition-[transform,box-shadow] duration-150 hover:z-4 hover:-translate-y-px hover:shadow-float',
				APPOINTMENT_BLOCK_CLASS[event.status],
			)}
			style={{
				top,
				height,
				left: `calc(${(lane * widthPercent).toFixed(2)}% + 3px)`,
				width: `calc(${widthPercent.toFixed(2)}% - 6px)`,
			}}
		>
			<span className='font-mono text-[10.5px] leading-3.5 opacity-90'>
				{event.time}–{end}
			</span>
			<span className='truncate text-[12.5px] leading-4 font-semibold'>
				{patientName}
			</span>
			{event.duration >= MIN_MINUTES_FOR_DETAILS && (
				<span className='truncate text-[11.5px] leading-3.75 opacity-90'>
					{procedure} · {format.name(DOCTORS[event.doctorId].shortName)}
				</span>
			)}
		</button>
	)
}
