import { CLINIC_OPENS_AT, fromMinutes, toMinutes } from '@/entities/appointment'

import type { TCalendarEvent } from './Schedule'

/* Layout of overlapping events in one column */

export const HOUR_HEIGHT = 56
export const DAY_START = toMinutes(CLINIC_OPENS_AT)
const FIRST_HOUR = 8
const LAST_HOUR = 19
export const GRID_HOURS = Array.from(
	{ length: LAST_HOUR - FIRST_HOUR + 1 },
	(_, index) => fromMinutes((FIRST_HOUR + index) * 60),
)
export const GRID_HEIGHT = (GRID_HOURS.length - 1) * HOUR_HEIGHT

export type TPlacedEvent = {
	event: TCalendarEvent
	top: number
	height: number
	lane: number
	lanes: number
	end: string
}

export function placeEvents(events: TCalendarEvent[]): TPlacedEvent[] {
	const pixelsPerMinute = HOUR_HEIGHT / 60
	const items = events
		.map(event => {
			const start = toMinutes(event.time) - DAY_START
			return { event, start, finish: start + event.duration, lane: 0, lanes: 1 }
		})
		.sort(
			(first, second) =>
				first.start - second.start || second.finish - first.finish,
		)

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
			other => other.start < item.finish && item.start < other.finish,
		)
		item.lanes = Math.max(...overlapping.map(other => other.lane)) + 1
	})

	return items.map(item => ({
		event: item.event,
		top: item.start * pixelsPerMinute + 2,
		height: item.event.duration * pixelsPerMinute - 4,
		lane: item.lane,
		lanes: item.lanes,
		end: fromMinutes(item.finish + DAY_START),
	}))
}
