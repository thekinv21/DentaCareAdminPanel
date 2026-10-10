'use client'

import type { CSSProperties } from 'react'

import type { TCalendarEvent } from '../lib/Schedule'
import type { TCalendarColumn } from '../model/useCalendarColumns'
import { HourLabels } from './HourLabels'
import { TimeGridColumn } from './TimeGridColumn'
import { TimeGridColumnHeader } from './TimeGridColumnHeader'

type TTimeGridProps = {
	columns: TCalendarColumn[]
	minColumnWidth: number
	onOpenEvent: (event: TCalendarEvent) => void
	onOpenDay: (iso: string) => void
}

/**
 * Hour rows with one column per chair (day view) or per day (week view)
 */
export function TimeGrid(props: TTimeGridProps) {
	const { columns, minColumnWidth, onOpenEvent, onOpenDay } = props

	const gridStyle: CSSProperties = {
		display: 'grid',
		gridTemplateColumns: `52px repeat(${columns.length}, minmax(${minColumnWidth}px, 1fr))`,
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
						<TimeGridColumnHeader
							key={column.key}
							column={column}
							onOpenDay={onOpenDay}
						/>
					))}
				</div>
			</div>
			<div style={gridStyle}>
				<HourLabels />
				{columns.map(column => (
					<TimeGridColumn
						key={column.key}
						column={column}
						onOpenEvent={onOpenEvent}
					/>
				))}
			</div>
		</div>
	)
}
