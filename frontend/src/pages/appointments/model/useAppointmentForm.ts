'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { TODAY } from '@/entities/appointment'
import { DOCTORS } from '@/entities/employee'
import { PATIENTS } from '@/entities/patient'

import { mockRequest } from '@/shared/api'
import { useFormModal } from '@/shared/lib/form'
import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { avatarTone } from '@/shared/ui/avatar'
import { useToast } from '@/shared/ui/toast'

import type { TCalendarEvent } from '../lib/Schedule'
import {
	appointmentFormSchema,
	BOOKING_SERVICES,
	endTime,
	EVENT_PATIENT,
	isoToRu,
	type TAppointmentFormValues,
} from './AppointmentFormSchema'

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

const fromEvent = (event: TCalendarEvent): TAppointmentFormValues => ({
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
 * New/edit appointment modal: the form, the chosen patient and save
 */
export function useAppointmentForm() {
	const t = useTranslations('AppointmentForm')
	const format = useFormat()
	const toast = useToast()

	const methods = useForm<TAppointmentFormValues>({
		resolver: zodResolver(appointmentFormSchema),
		defaultValues: draft(),
	})
	const modal = useFormModal<TCalendarEvent>(event =>
		methods.reset(event ? fromEvent(event) : draft()),
	)
	const event = modal.item
	const [patientId, doctor, chair, start, duration] = useWatch({
		control: methods.control,
		name: ['patientId', 'doctor', 'chair', 'start', 'duration'],
	})

	const found = PATIENTS.find(p => p.id === patientId)
	const patientName = found
		? format.name(found.fullName)
		: event && patientId
			? format.name(event.who)
			: ''

	return {
		...modal,
		methods,
		title: event
			? t('appointmentOf', { name: patientName })
			: t('newAppointment'),
		subtitle: event
			? t('editSubtitle', {
					chair,
					doctor: format.name(DOCTORS[doctor].shortName),
					from: start,
					to: endTime(start, duration),
				})
			: t('createSubtitle'),
		patient: patientId
			? {
					name: patientName,
					id: found?.id,
					phone: found?.phone,
					allergy: !!found?.flags.includes('allergy'),
					initials: getInitials(patientName),
					tone: found
						? avatarTone(PATIENTS.indexOf(found))
						: ('neutral' as const),
				}
			: null,
		saving: methods.formState.isSubmitting,
		submit: methods.handleSubmit(async () => {
			await mockRequest()
			modal.close()
			toast.show(event ? t('appointmentUpdated') : t('appointmentCreated'))
		}),
	}
}

export type TAppointmentFormModel = ReturnType<typeof useAppointmentForm>
