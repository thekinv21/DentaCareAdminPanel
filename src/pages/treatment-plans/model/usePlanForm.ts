'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { DOCTOR_IDS, DOCTORS } from '@/entities/employee'
import { PATIENTS } from '@/entities/patient'

import { mockRequest } from '@/shared/api'
import { useFormModal } from '@/shared/lib/form'
import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { useToast } from '@/shared/ui/toast'

import {
	DEFAULT_STAGES,
	planFormSchema,
	type TPlanFormInput,
	type TPlanFormValues,
} from './PlanFormSchema'
import type { TTreatmentPlan } from './Plans'

const NEW_PLAN_PATIENT =
	PATIENTS.find(patient => patient.id === 'DN-20418') ?? PATIENTS[0]

export function usePlanForm(
	onRemove: (plan: TTreatmentPlan, onDone: () => void) => void,
) {
	const t = useTranslations('PlanForm')
	const tPlans = useTranslations('TreatmentPlans')
	const format = useFormat()
	const toast = useToast()

	const methods = useForm<TPlanFormInput, unknown, TPlanFormValues>({
		resolver: zodResolver(planFormSchema),
	})
	const modal = useFormModal<TTreatmentPlan>(plan =>
		methods.reset({
			doctor: plan?.doctorId ?? 'kas',
			name: plan ? tPlans(plan.title) : t('defaultPlanName'),
			stages: DEFAULT_STAGES.map(stage => ({
				...stage,
				service: t(stage.service),
			})),
			payment: plan ? 'full' : 'inst',
			note: '',
		}),
	)
	const plan = modal.item

	const patientName: string = format.name(
		plan?.patientName ?? NEW_PLAN_PATIENT.fullName,
	)

	return {
		...modal,
		methods,
		title: plan ? t('planOf', { name: patientName }) : t('newPlan'),
		subtitle: plan
			? t('updatedToday', { plan: tPlans(plan.title) })
			: t('createSubtitle'),
		patient: {
			name: patientName,
			id: plan?.patientId ?? NEW_PLAN_PATIENT.id,
			initials: getInitials(patientName),
		},
		doctorOptions: DOCTOR_IDS.map(doctorId => ({
			id: doctorId,
			label: format.name(DOCTORS[doctorId].shortName),
		})),
		saving: methods.formState.isSubmitting,
		saveDraft: () => {
			modal.close()
			toast.show(t('draftSaved'))
		},
		submit: methods.handleSubmit(async () => {
			await mockRequest()
			modal.close()
			toast.show(plan ? t('planUpdated') : t('planSentBySms'))
		}),
		remove: () => plan && onRemove(plan, modal.close),
	}
}

export type TPlanFormModel = ReturnType<typeof usePlanForm>
