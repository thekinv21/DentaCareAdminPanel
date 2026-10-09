'use client'

import { useTranslations } from 'next-intl'

import {
	fromMinutes,
	NOW_TIME,
	shortPersonName,
	TODAY_APPOINTMENTS,
	toMinutes,
	useAppointmentLabels,
} from '@/entities/appointment'

import { useFormat } from '@/shared/lib/i18n'

const DAY_START = toMinutes('08:00')
const DAY_LENGTH = toMinutes('18:00') - DAY_START
const TICKS = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00']
const LANES = [
	{ chair: 1, doctor: 'Касымова А.' },
	{ chair: 2, doctor: 'Петров С.' },
	{ chair: 3, doctor: 'Токтогулов Э.' },
	{ chair: 4, doctor: 'Токтогулов Э.' },
]

const percent = (minutes: number) => ((minutes - DAY_START) / DAY_LENGTH) * 100

/**
 * Chair lanes with positioned appointment bars for 08:00–18:00
 */
export function useChairTimeline() {
	const t = useTranslations('Dashboard')
	const labels = useAppointmentLabels()
	const format = useFormat()
	let order = 0

	const lanes = LANES.map(lane => ({
		key: lane.chair,
		name: t('chairNumber', { n: lane.chair }),
		doctor: format.name(lane.doctor),
		bars: TODAY_APPOINTMENTS.filter(a => a.chair === lane.chair).map(a => {
			const start = toMinutes(a.time)
			const label = format.name(shortPersonName(a.patientName))
			return {
				key: a.id,
				label,
				status: a.status,
				title: `${label} · ${a.time}–${fromMinutes(start + a.duration)}`,
				left: `calc(${percent(start).toFixed(3)}% + 2px)`,
				width: `calc(${((a.duration / DAY_LENGTH) * 100).toFixed(3)}% - 4px)`,
				delay: 360 + order++ * 30,
			}
		}),
	}))

	return {
		lanes,
		ticks: TICKS.map((label, i) => ({
			label,
			left: i * 20,
			edge: i === 0 ? 'start' : i === TICKS.length - 1 ? 'end' : 'middle',
		})),
		now: NOW_TIME,
		nowRatio: percent(toMinutes(NOW_TIME)) / 100,
		legend: labels.legend,
	}
}
