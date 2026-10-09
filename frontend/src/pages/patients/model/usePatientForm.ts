'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { type Path, type PathValue, useForm, useWatch } from 'react-hook-form'

import { type Patient, PATIENTS } from '@/entities/patient'

import { mockRequest } from '@/shared/api'
import { translateOptional, useFormat } from '@/shared/lib/i18n'
import { useToast } from '@/shared/ui/toast'

import { patientFormSchema, type TPatientFormValues } from './PatientFormSchema'

const EMPTY: TPatientFormValues = {
	lastName: '',
	firstName: '',
	middleName: '',
	birthDate: '',
	gender: 'f',
	pin: '',
	phone: '',
	email: '',
	smsLanguage: 'ru',
	address: '',
	allergies: [],
	conditions: [],
	insurance: 'none',
	policy: '',
	doctor: 'kas',
	consent: false,
	smsReminders: true,
}

/**
 * Mock card details the list doesn't carry (until GET /patients/:id exists)
 */
function valuesOf(patient: Patient): TPatientFormValues {
	const [firstName, lastName] = patient.fullName.split(' ')
	return {
		...EMPTY,
		lastName,
		firstName,
		birthDate: '03.02.1992',
		gender: lastName.endsWith('а') ? 'f' : 'm',
		pin: '20302199200518',
		phone: patient.phone.replace('+996 ', ''),
		address: 'г. Бишкек, мкр. Асанбай 14, кв. 22',
		allergies: patient.flags.includes('allergy') ? ['pen'] : [],
		insurance: patient.flags.includes('foms') ? 'foms' : 'none',
		policy: patient.flags.includes('foms') ? 'ФОМС 0417-228931' : '',
		consent: true,
	}
}

const digits = (phone: string) => phone.replace(/\D/g, '').slice(-9)

/**
 * New/edit patient card in a modal
 */
export function usePatientForm(
	onRemove: (patient: Patient, onDone: () => void) => void,
) {
	const t = useTranslations('PatientForm')
	const tPatient = useTranslations('Patient')
	const tValidation = useTranslations('Validation')
	const format = useFormat()
	const toast = useToast()
	const [open, setOpen] = useState(false)
	const [patient, setPatient] = useState<Patient | null>(null)

	const form = useForm<TPatientFormValues>({
		resolver: zodResolver(patientFormSchema),
		defaultValues: EMPTY,
	})
	const values = useWatch({ control: form.control })
	const { errors, isSubmitting } = form.formState

	const duplicate = PATIENTS.find(
		p =>
			p.id !== patient?.id &&
			!!values.phone &&
			digits(p.phone) === digits(values.phone),
	)

	const openWith = (next: Patient | null) => {
		setPatient(next)
		form.reset(next ? valuesOf(next) : EMPTY)
		setOpen(true)
	}
	const close = () => setOpen(false)

	return {
		open,
		isEdit: !!patient,
		title: patient ? format.name(patient.fullName) : t('newPatient'),
		subtitle: patient
			? t('recordOpened', {
					id: patient.id,
					date: translateOptional(tPatient, patient.lastVisit),
				})
			: t('numberAssignedAutomatically'),
		openCreate: () => openWith(null),
		openEdit: (next: Patient) => openWith(next),
		close,
		values,
		set: <K extends Path<TPatientFormValues>>(
			name: K,
			value: PathValue<TPatientFormValues, K>,
		) =>
			form.setValue(name, value, {
				shouldDirty: true,
				shouldValidate: form.formState.isSubmitted,
			}),
		field: (name: keyof TPatientFormValues) => ({
			'aria-invalid': !!errors[name],
			...form.register(name),
		}),
		errorOf: (name: keyof TPatientFormValues) => {
			const message = errors[name]?.message
			return message ? tValidation(message) : undefined
		},
		duplicateError: duplicate
			? t('phoneTaken', { id: duplicate.id })
			: undefined,
		saving: isSubmitting,
		save: form.handleSubmit(async () => {
			await mockRequest()
			close()
			toast.show(
				patient ? t('patientUpdated') : t('patientAdded', { id: 'DN-20419' }),
			)
		}),
		remove: () => patient && onRemove(patient, close),
	}
}

export type TPatientFormModel = ReturnType<typeof usePatientForm>
