'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { PATIENTS, type TPatient } from '@/entities/patient'

import { mockRequest } from '@/shared/api'
import { useFormModal } from '@/shared/lib/form'
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
function valuesOf(patient: TPatient): TPatientFormValues {
	const [firstName, lastName] = patient.fullName.split(' ')
	const hasFoms = patient.flags.includes('foms')
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
		insurance: hasFoms ? 'foms' : 'none',
		policy: hasFoms ? 'ФОМС 0417-228931' : '',
		consent: true,
	}
}

const phoneDigits = (phone: string) => phone.replace(/\D/g, '').slice(-9)

/**
 * New/edit patient card in a modal
 */
export function usePatientForm(
	onRemove: (patient: TPatient, onDone: () => void) => void,
) {
	const t = useTranslations('PatientForm')
	const tPatient = useTranslations('Patient')
	const format = useFormat()
	const toast = useToast()

	const methods = useForm<TPatientFormValues>({
		resolver: zodResolver(patientFormSchema),
		defaultValues: EMPTY,
	})
	const modal = useFormModal<TPatient>(patient =>
		methods.reset(patient ? valuesOf(patient) : EMPTY),
	)
	const patient = modal.item
	const phone = useWatch({ control: methods.control, name: 'phone' })

	const duplicate = PATIENTS.find(
		p =>
			p.id !== patient?.id &&
			!!phone &&
			phoneDigits(p.phone) === phoneDigits(phone),
	)

	return {
		...modal,
		methods,
		title: patient ? format.name(patient.fullName) : t('newPatient'),
		subtitle: patient
			? t('recordOpened', {
					id: patient.id,
					date: translateOptional(tPatient, patient.lastVisit),
				})
			: t('numberAssignedAutomatically'),
		duplicateError: duplicate
			? t('phoneTaken', { id: duplicate.id })
			: undefined,
		saving: methods.formState.isSubmitting,
		submit: methods.handleSubmit(async () => {
			await mockRequest()
			modal.close()
			toast.show(
				patient ? t('patientUpdated') : t('patientAdded', { id: 'DN-20419' }),
			)
		}),
		remove: () => patient && onRemove(patient, modal.close),
	}
}

export type TPatientFormModel = ReturnType<typeof usePatientForm>
