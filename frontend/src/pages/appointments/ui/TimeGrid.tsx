'use client'

import type { CSSProperties } from 'react'

import { NOW_TIME, toMinutes } from '@/entities/appointment'

import { cn } from '@/shared/lib/cn'

import {
	DAY_START,
	GRID_HEIGHT,
	GRID_HOURS,
	HOUR_HEIGHT,
	placeEvents,
} from '../lib/Layout'
import type { CalendarColumn } from '../model/useCalendarColumns'
import { EventBlock } from './EventBlock'

const NOW_TOP = ((toMinutes(NOW_TIME) - DAY_START) * HOUR_HEIGHT) / 60

const COLUMN_STYLE: CSSProperties = {
	height: GRID_HEIGHT,
	backgroundImage:
		'linear-gradient(to bottom, var(--line) 1px, transparent 1px), linear-gradient(to bottom, transparent 27px, var(--sunken) 27px, var(--sunken) 28px, transparent 28px)',
	backgroundSize: `100% ${HOUR_HEIGHT}px`,
	backgroundPosition: '0 -1px',
}

const hourShift = (i: number) =>
	i === 0
		? ''
		: i === GRID_HOURS.length - 1
			? '-translate-y-full'
			: '-translate-y-1/2'

export function TimeGrid({
	columns,
	minColumn,
}: {
	columns: CalendarColumn[]
	minColumn: number
}) {
	const gridStyle: CSSProperties = {
		display: 'grid',
		gridTemplateColumns: `52px repeat(${columns.length}, minmax(${minColumn}px, 1fr))`,
		gap: 6,
	}

	return (
		<div
			className='animate-fade'
			style={{ minWidth: columns.length === 4 ? 700 : 780 }}
		>
			<div className='sticky top-0 z-6 bg-surface pb-2'>
				<div style={gridStyle}>
					<span />
					{columns.map(column => (
						<button
							key={column.key}
							type='button'
							aria-label={column.aria}
							onClick={column.onPick}
							className={cn(
								'flex w-full flex-col items-center rounded-xl border-0 px-1 py-1.5 transition-colors duration-150',
								column.isToday
									? 'bg-brand text-on-brand shadow-brand'
									: 'bg-raised text-ink hover:bg-sunken',
							)}
						>
							<span className='text-[11px] leading-3.5 font-semibold tracking-wider uppercase opacity-85'>
								{column.overline}
							</span>
							<span className='font-display text-[17px] leading-5.5 font-extrabold'>
								{column.title}
							</span>
							<span className='text-[11.5px] leading-3.75 opacity-85'>
								{column.caption}
							</span>
						</button>
					))}
				</div>
			</div>
			<div style={gridStyle}>
				<div className='relative' style={{ height: GRID_HEIGHT }}>
					{GRID_HOURS.map((hour, i) => (
						<span
							key={hour}
							className={cn(
								'absolute right-1.5 font-mono text-[11px] leading-3.5 text-ink-subtle',
								hourShift(i),
							)}
							style={{ top: i * HOUR_HEIGHT }}
						>
							{hour}
						</span>
					))}
				</div>
				{columns.map(column => (
					<div
						key={column.key}
						className={cn(
							'relative rounded-xl border border-line',
							column.isToday ? 'bg-raised' : 'bg-surface',
						)}
						style={COLUMN_STYLE}
					>
						{placeEvents(column.events).map(placed => (
							<EventBlock key={placed.event.key} placed={placed} />
						))}
						{column.showNow && (
							<div
								aria-hidden='true'
								className='pointer-events-none absolute right-0 left-0 z-5 h-0.5 bg-accent'
								style={{ top: NOW_TOP }}
							>
								<span className='absolute -top-1 -left-1.25 size-2.5 animate-blink rounded-full bg-accent' />
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
