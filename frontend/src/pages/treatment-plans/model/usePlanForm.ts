'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { DOCTORS } from '@/entities/employee'

import { mockRequest } from '@/shared/api'
import { useFormModal } from '@/shared/lib/form'
import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { useToast } from '@/shared/ui/toast'

import {
	DEFAULT_STAGES,
	PLAN_DOCTORS,
	planFormSchema,
	type TPlanFormInput,
	type TPlanFormValues,
} from './PlanFormSchema'
import type { TTreatmentPlan } from './Plans'

const DOCTOR_BY_NAME = Object.fromEntries(
	Object.values(DOCTORS).map(d => [d.shortName, d.id]),
) as Record<string, TPlanFormInput['doctor']>

const NEW_PLAN_PATIENT = { name: 'Айгуль Тойчубекова', id: 'DN-20418' }

/**
 * New/edit treatment plan in a modal
 */
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
			doctor: plan ? (DOCTOR_BY_NAME[plan.doctor] ?? 'kas') : 'kas',
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
	const patientName = format.name(plan?.patientName ?? NEW_PLAN_PATIENT.name)

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
		doctorOptions: PLAN_DOCTORS.map(id => ({
			id,
			label: format.name(DOCTORS[id].shortName),
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
