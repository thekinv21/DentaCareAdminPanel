'use client'

import { type CSSProperties, useMemo } from 'react'

import { NOW_TIME, toMinutes } from '@/entities/appointment'

import { cn } from '@/shared/lib/cn'

import { DAY_START, GRID_HEIGHT, HOUR_HEIGHT, placeEvents } from '../lib/Layout'
import type { TCalendarEvent } from '../lib/Schedule'
import type { TCalendarColumn } from '../model/useCalendarColumns'
import { EventBlock } from './EventBlock'

const NOW_TOP = ((toMinutes(NOW_TIME) - DAY_START) * HOUR_HEIGHT) / 60

const COLUMN_STYLE: CSSProperties = {
	height: GRID_HEIGHT,
	backgroundImage:
		'linear-gradient(to bottom, var(--line) 1px, transparent 1px), linear-gradient(to bottom, transparent 27px, var(--sunken) 27px, var(--sunken) 28px, transparent 28px)',
	backgroundSize: `100% ${HOUR_HEIGHT}px`,
	backgroundPosition: '0 -1px',
}

type TTimeGridColumnProps = {
	column: TCalendarColumn
	onOpenEvent: (event: TCalendarEvent) => void
}

export function TimeGridColumn({ column, onOpenEvent }: TTimeGridColumnProps) {
	const placedEvents = useMemo(
		() => placeEvents(column.events),
		[column.events],
	)

	return (
		<div
			className={cn(
				'relative rounded-xl border border-line',
				column.isToday ? 'bg-raised' : 'bg-surface',
			)}
			style={COLUMN_STYLE}
		>
			{placedEvents.map(placed => (
				<EventBlock
					key={placed.event.key}
					placed={placed}
					onOpen={onOpenEvent}
				/>
			))}
			{column.showNow && <NowLine />}
		</div>
	)
}

function NowLine() {
	return (
		<div
			aria-hidden='true'
			className='pointer-events-none absolute right-0 left-0 z-5 h-0.5 bg-accent'
			style={{ top: NOW_TOP }}
		>
			<span className='absolute -top-1 -left-1.25 size-2.5 animate-blink rounded-full bg-accent' />
		</div>
	)
}
