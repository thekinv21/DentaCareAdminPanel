'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { DOCTORS } from '@/entities/employee'
import { patientAvatarTone, PATIENTS } from '@/entities/patient'

import { mockRequest } from '@/shared/api'
import { useFormModal } from '@/shared/lib/form'
import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { useToast } from '@/shared/ui/toast'

import type { TCalendarEvent } from '../lib/Schedule'
import {
	appointmentFormSchema,
	endTime,
	type TAppointmentFormValues,
} from './AppointmentFormSchema'
import {
	emptyAppointmentValues,
	valuesFromEvent,
} from './AppointmentFormValues'

/**
 * New/edit appointment modal: the form, the chosen patient and save
 */
export function useAppointmentForm(removedKeys: Set<string>) {
	const t = useTranslations('AppointmentForm')
	const format = useFormat()
	const toast = useToast()

	const methods = useForm<TAppointmentFormValues>({
		resolver: zodResolver(appointmentFormSchema),
		defaultValues: emptyAppointmentValues(),
	})
	const modal = useFormModal<TCalendarEvent>(event =>
		methods.reset(event ? valuesFromEvent(event) : emptyAppointmentValues()),
	)
	const event = modal.item
	const [patientId, doctor, chair, start, duration] = useWatch({
		control: methods.control,
		name: ['patientId', 'doctor', 'chair', 'start', 'duration'],
	})

	const listedPatient = PATIENTS.find(patient => patient.id === patientId)
	const patientName = listedPatient
		? format.name(listedPatient.fullName)
		: event && patientId
			? format.name(event.patientName)
			: ''

	return {
		...modal,
		methods,
		removedKeys,
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
					id: listedPatient?.id,
					phone: listedPatient?.phone,
					hasAllergy: !!listedPatient?.flags.includes('allergy'),
					initials: getInitials(patientName),
					tone: listedPatient
						? patientAvatarTone(listedPatient.id)
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
