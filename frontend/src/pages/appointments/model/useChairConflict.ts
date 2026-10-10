'use client'

import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import { fromMinutes, toMinutes } from '@/entities/appointment'

import { eventsForDay } from '../lib/Schedule'
import { ruToIso, type TAppointmentFormValues } from './AppointmentFormSchema'

/**
 * Another appointment that occupies the chosen chair at the chosen time
 */
export function useChairConflict(eventKey?: string) {
	const t = useTranslations('AppointmentForm')
	const { control } = useFormContext<TAppointmentFormValues>()
	const [date, start, duration, chair] = useWatch({
		control,
		name: ['date', 'start', 'duration', 'chair'],
	})
	const iso = ruToIso(date)
	const from = toMinutes(start)
	const to = from + duration

	const busy = iso
		? eventsForDay(iso).find(
				other =>
					other.chair === chair &&
					other.key !== eventKey &&
					toMinutes(other.time) < to &&
					from < toMinutes(other.time) + other.duration,
			)
		: undefined

	return busy
		? t('chairBusy', {
				chair: busy.chair,
				from: busy.time,
				to: fromMinutes(toMinutes(busy.time) + busy.duration),
				who: busy.who.replace(/\.$/, ''),
			})
		: undefined
}
