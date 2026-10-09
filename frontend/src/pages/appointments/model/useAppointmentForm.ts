'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { type Path, type PathValue, useForm, useWatch } from 'react-hook-form'

import { fromMinutes, TODAY, toMinutes } from '@/entities/appointment'

import { mockRequest } from '@/shared/api'
import { useToast } from '@/shared/ui/toast'

import { type CalendarEvent, eventsForDay } from '../lib/Schedule'
import {
	appointmentFormSchema,
	BOOKING_SERVICES,
	isoToRu,
	ruToIso,
	type TAppointmentFormValues,
} from './AppointmentFormSchema'
import { useAppointmentView } from './useAppointmentView'

/**
 * Patient picked for an event that isn't in the patient list (generated mock days)
 */
export const EVENT_PATIENT = 'event'

const draft = (): TAppointmentFormValues => ({
	patientId: '',
	doctor: 'kas',
	chair: 1,
	date: isoToRu(TODAY),
	start: '12:30',
	duration: 60,
	services: ['exam'],
	tooth: '',
	source: 'phone',
	status: 'confirmed',
	note: '',
	sms24: true,
	sms2: false,
})

const fromEvent = (event: CalendarEvent): TAppointmentFormValues => ({
	...draft(),
	patientId: event.patientId ?? EVENT_PATIENT,
	doctor: event.doctorId,
	chair: event.chair,
	date: isoToRu(event.date),
	start: event.time,
	duration: event.duration,
	services: [
		BOOKING_SERVICES.find(s => event.what.startsWith(s.id))?.id ?? 'exam',
	],
	tooth: event.what.match(/\d{2}$/)?.[0] ?? '',
	source: 'reception',
	status: event.status === 'next' ? 'confirmed' : event.status,
	sms2: true,
})

/**
 * New/edit appointment modal: form state, chair conflict and save
 */
export function useAppointmentForm() {
	const t = useTranslations('AppointmentForm')
	const tValidation = useTranslations('Validation')
	const toast = useToast()
	const [open, setOpen] = useState(false)
	const [event, setEvent] = useState<CalendarEvent | null>(null)
	const [query, setQuery] = useState('')

	const form = useForm<TAppointmentFormValues>({
		resolver: zodResolver(appointmentFormSchema),
		defaultValues: draft(),
	})
	const values = useWatch({ control: form.control }) as TAppointmentFormValues
	const { errors, isSubmitting, isSubmitted } = form.formState

	const iso = ruToIso(values.date)
	const startMin = toMinutes(values.start)
	const endMin = startMin + values.duration
	const busy = iso
		? eventsForDay(iso).find(
				other =>
					other.chair === values.chair &&
					other.key !== event?.key &&
					toMinutes(other.time) < endMin &&
					startMin < toMinutes(other.time) + other.duration,
			)
		: undefined

	const openWith = (next: CalendarEvent | null) => {
		setEvent(next)
		setQuery('')
		form.reset(next ? fromEvent(next) : draft())
		setOpen(true)
	}
	const close = () => setOpen(false)
	const view = useAppointmentView({ values, event, query, iso, endMin })

	return {
		open,
		event,
		isEdit: !!event,
		openCreate: () => openWith(null),
		openEdit: openWith,
		close,
		values,
		set: <K extends Path<TAppointmentFormValues>>(
			name: K,
			value: PathValue<TAppointmentFormValues, K>,
		) => form.setValue(name, value, { shouldValidate: isSubmitted }),
		field: (name: 'date' | 'tooth' | 'note') => form.register(name),
		errorOf: (name: keyof TAppointmentFormValues) => {
			const message = errors[name]?.message
			return message ? tValidation(message) : undefined
		},
		query,
		setQuery,
		end: fromMinutes(endMin),
		conflict: busy
			? t('chairBusy', {
					chair: busy.chair,
					from: busy.time,
					to: fromMinutes(toMinutes(busy.time) + busy.duration),
					who: busy.who.replace(/\.$/, ''),
				})
			: undefined,
		...view,
		saving: isSubmitting,
		save: form.handleSubmit(async () => {
			await mockRequest()
			close()
			toast.show(event ? t('appointmentUpdated') : t('appointmentCreated'))
		}),
	}
}

export type TAppointmentFormModel = ReturnType<typeof useAppointmentForm>
