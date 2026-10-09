'use client'

import { useTranslations } from 'next-intl'

import { shortPersonName, useAppointmentLabels } from '@/entities/appointment'
import { DOCTORS } from '@/entities/employee'
import { PATIENTS } from '@/entities/patient'

import { getInitials } from '@/shared/lib/format'
import { translateOptional, useFormat } from '@/shared/lib/i18n'
import { avatarTone } from '@/shared/ui/avatar'

import type { CalendarEvent } from '../lib/Schedule'
import {
	BOOKING_SERVICES,
	type TAppointmentFormValues,
} from './AppointmentFormSchema'

const DOT = { brand: 'bg-brand', info: 'bg-info', accent: 'bg-accent' } as const

type TViewOptions = {
	values: TAppointmentFormValues
	event: CalendarEvent | null
	query: string
	iso: string | null
	endMin: number
}

/**
 * Display data of the appointment modal: patient card, search results,
 * chip options and the summary aside
 */
export function useAppointmentView(options: TViewOptions) {
	const { values, event, query, iso, endMin } = options

	const t = useTranslations('AppointmentForm')
	const tPatient = useTranslations('Patient')
	const labels = useAppointmentLabels()
	const format = useFormat()

	const found = PATIENTS.find(p => p.id === values.patientId)
	const patientName = found
		? format.name(found.fullName)
		: event && values.patientId
			? format.name(event.who)
			: ''
	const needle = query.trim().toLowerCase()
	const total = BOOKING_SERVICES.filter(s =>
		values.services.includes(s.id),
	).reduce((sum, s) => sum + s.price, 0)

	return {
		title: event
			? t('appointmentOf', { name: patientName })
			: t('newAppointment'),
		subtitle: event
			? t('editSubtitle', {
					chair: values.chair,
					doctor: format.name(DOCTORS[values.doctor].shortName),
					from: values.start,
					to: `${String(Math.floor(endMin / 60)).padStart(2, '0')}:${String(endMin % 60).padStart(2, '0')}`,
				})
			: t('createSubtitle'),
		patient: values.patientId
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
		results: PATIENTS.filter(
			p =>
				!needle ||
				`${p.fullName} ${p.id} ${p.phone}`.toLowerCase().includes(needle),
		)
			.slice(0, 5)
			.map((p, index) => ({
				id: p.id,
				name: format.name(p.fullName),
				phone: p.phone,
				last: `${t('lastVisitShort')} ${translateOptional(tPatient, p.lastVisit)}`,
				initials: getInitials(format.name(p.fullName)),
				tone: avatarTone(index),
			})),
		doctorOptions: (['kas', 'pet', 'tok'] as const).map(id => ({
			id,
			label: format.name(DOCTORS[id].shortName),
			dot: DOT[DOCTORS[id].color],
		})),
		serviceOptions: BOOKING_SERVICES.map(s => ({
			id: s.id as string,
			label: labels.procedure(s.id),
			trailing: s.price ? format.som(s.price) : t('byPlan'),
		})),
		summary: {
			dateLong: iso
				? format.date(iso, { weekday: 'long', day: 'numeric', month: 'long' })
				: values.date,
			patient: patientName
				? format.name(shortPersonName(patientName))
				: t('notSelected'),
			doctor: format.name(DOCTORS[values.doctor].shortName),
			chair: t('chairN', { n: values.chair }),
			services: values.services.length,
			total: format.som(total),
		},
	}
}
