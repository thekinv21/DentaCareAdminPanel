'use client'

import { useTranslations } from 'next-intl'

import {
	CLINIC_CLOSES_AT,
	CLINIC_OPENS_AT,
	fromMinutes,
	NOW_TIME,
	shortPersonName,
	type TAppointment,
	TODAY_APPOINTMENTS,
	toMinutes,
	useAppointmentLabels,
} from '@/entities/appointment'
import { CHAIR_DOCTOR, CHAIR_NUMBERS, DOCTORS } from '@/entities/employee'

import { useFormat } from '@/shared/lib/i18n'

const DAY_START = toMinutes(CLINIC_OPENS_AT)
const DAY_LENGTH = toMinutes(CLINIC_CLOSES_AT) - DAY_START
const TICK_STEP_MINUTES = 120
const TICK_COUNT = DAY_LENGTH / TICK_STEP_MINUTES + 1
const FIRST_BAR_DELAY_MS = 360
const BAR_DELAY_STEP_MS = 30

export type TTickEdge = 'start' | 'middle' | 'end'

const percentOfDay = (minutes: number) =>
	((minutes - DAY_START) / DAY_LENGTH) * 100

/**
 * Bars appear one after another in time order across all chairs
 */
const ANIMATION_ORDER = new Map(
	[...TODAY_APPOINTMENTS]
		.sort((first, second) => first.chair - second.chair)
		.map((appointment, index) => [appointment.id, index]),
)

function tickEdge(index: number): TTickEdge {
	if (index === 0) return 'start'
	return index === TICK_COUNT - 1 ? 'end' : 'middle'
}

/**
 * Chair lanes with positioned appointment bars for the clinic day
 */
export function useChairTimeline() {
	const t = useTranslations('Dashboard')
	const labels = useAppointmentLabels()
	const format = useFormat()

	const toBar = (appointment: TAppointment) => {
		const start = toMinutes(appointment.time)
		const label = format.name(shortPersonName(appointment.patientName))
		return {
			key: appointment.id,
			label,
			status: appointment.status,
			title: `${label} · ${appointment.time}–${fromMinutes(start + appointment.duration)}`,
			left: `calc(${percentOfDay(start).toFixed(3)}% + 2px)`,
			width: `calc(${((appointment.duration / DAY_LENGTH) * 100).toFixed(3)}% - 4px)`,
			animationDelay:
				FIRST_BAR_DELAY_MS +
				(ANIMATION_ORDER.get(appointment.id) ?? 0) * BAR_DELAY_STEP_MS,
		}
	}

	return {
		lanes: CHAIR_NUMBERS.map(chair => ({
			chair,
			name: t('chairNumber', { n: chair }),
			doctor: format.name(DOCTORS[CHAIR_DOCTOR[chair]].shortName),
			bars: TODAY_APPOINTMENTS.filter(
				appointment => appointment.chair === chair,
			).map(toBar),
		})),
		ticks: Array.from({ length: TICK_COUNT }, (_, index) => ({
			label: fromMinutes(DAY_START + index * TICK_STEP_MINUTES),
			leftPercent: (index / (TICK_COUNT - 1)) * 100,
			edge: tickEdge(index),
		})),
		range: t('timelineRange', { from: CLINIC_OPENS_AT, to: CLINIC_CLOSES_AT }),
		now: NOW_TIME,
		nowRatio: percentOfDay(toMinutes(NOW_TIME)) / 100,
		legend: labels.legend,
	}
}

export type TChairTimelineModel = ReturnType<typeof useChairTimeline>
