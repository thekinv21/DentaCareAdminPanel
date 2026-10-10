'use client'

import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import { fromMinutes, toMinutes } from '@/entities/appointment'

import { displayDateToIso } from '@/shared/lib/date'

import { eventsForDay } from '../lib/Schedule'
import type { TAppointmentFormValues } from './AppointmentFormSchema'

type TChairConflictOptions = {
	/**
	 * The event being edited never conflicts with itself
	 */
	eventKey?: string
	removedKeys: Set<string>
}

/**
 * Another appointment that occupies the chosen chair at the chosen time
 */
export function useChairConflict({
	eventKey,
	removedKeys,
}: TChairConflictOptions) {
	const t = useTranslations('AppointmentForm')
	const { control } = useFormContext<TAppointmentFormValues>()
	const [date, start, duration, chair] = useWatch({
		control,
		name: ['date', 'start', 'duration', 'chair'],
	})
	const iso = displayDateToIso(date)
	if (!iso) return undefined

	const from = toMinutes(start)
	const to = from + duration
	const occupying = eventsForDay(iso).find(
		other =>
			other.chair === chair &&
			other.key !== eventKey &&
			!removedKeys.has(other.key) &&
			toMinutes(other.time) < to &&
			from < toMinutes(other.time) + other.duration,
	)
	if (!occupying) return undefined

	return t('chairBusy', {
		chair: occupying.chair,
		from: occupying.time,
		to: fromMinutes(toMinutes(occupying.time) + occupying.duration),
		who: occupying.patientName.replace(/\.$/, ''),
	})
}
