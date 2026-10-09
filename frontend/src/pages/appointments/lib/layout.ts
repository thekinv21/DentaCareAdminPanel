import { fromMinutes, toMinutes } from '@/entities/appointment'

import type { CalendarEvent } from './schedule'

/* Layout of overlapping events in one column */

export const HOUR_HEIGHT = 56
export const DAY_START = toMinutes('08:00')
export const GRID_HOURS = [
	'08:00',
	'09:00',
	'10:00',
	'11:00',
	'12:00',
	'13:00',
	'14:00',
	'15:00',
	'16:00',
	'17:00',
	'18:00',
	'19:00',
]
export const GRID_HEIGHT = (GRID_HOURS.length - 1) * HOUR_HEIGHT

export interface PlacedEvent {
	event: CalendarEvent
	top: number
	height: number
	lane: number
	lanes: number
	end: string
}

export function placeEvents(events: CalendarEvent[]): PlacedEvent[] {
	const px = HOUR_HEIGHT / 60
	const items = events
		.map(event => {
			const start = toMinutes(event.time) - DAY_START
			return { event, start, finish: start + event.duration, lane: 0, lanes: 1 }
		})
		.sort((a, b) => a.start - b.start || b.finish - a.finish)

	const laneEnds: number[] = []
	items.forEach(item => {
		let lane = laneEnds.findIndex(end => end <= item.start)
		if (lane < 0) {
			lane = laneEnds.length
			laneEnds.push(0)
		}
		laneEnds[lane] = item.finish
		item.lane = lane
	})
	items.forEach(item => {
		const overlapping = items.filter(
			o => o.start < item.finish && item.start < o.finish,
		)
		item.lanes = Math.max(...overlapping.map(o => o.lane)) + 1
	})

	return items.map(item => ({
		event: item.event,
		top: item.start * px + 2,
		height: item.event.duration * px - 4,
		lane: item.lane,
		lanes: item.lanes,
		end: fromMinutes(item.finish + DAY_START),
	}))
}
