'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'

import { DOCTORS } from '@/entities/employee'

import { mockRequest } from '@/shared/api'
import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { useToast } from '@/shared/ui/toast'

import { planTotals } from '../lib/PlanTotals'
import {
	DEFAULT_STAGES,
	INSTALLMENT_MONTHS,
	NEW_STAGE,
	planFormSchema,
	type TPlanFormInput,
	type TPlanFormValues,
} from './PlanFormSchema'
import type { TreatmentPlan } from './Plans'

const DOCTOR_BY_NAME = Object.fromEntries(
	Object.values(DOCTORS).map(d => [d.shortName, d.id]),
) as Record<string, 'kas' | 'pet' | 'tok'>

const NEW_PLAN_PATIENT = { name: 'Айгуль Тойчубекова', id: 'DN-20418' }

/**
 * New/edit treatment plan: stages with live totals, ФОМС share and installments
 */
export function usePlanForm(
	onRemove: (plan: TreatmentPlan, onDone: () => void) => void,
) {
	const t = useTranslations('PlanForm')
	const tPlans = useTranslations('TreatmentPlans')
	const tValidation = useTranslations('Validation')
	const format = useFormat()
	const toast = useToast()
	const [open, setOpen] = useState(false)
	const [plan, setPlan] = useState<TreatmentPlan | null>(null)

	const form = useForm<TPlanFormInput, unknown, TPlanFormValues>({
		resolver: zodResolver(planFormSchema),
	})
	const stages = useFieldArray({ control: form.control, name: 'stages' })
	const watched = useWatch({ control: form.control })
	const { errors, isSubmitting } = form.formState

	const { lines, sum, discount, foms, total } = planTotals(watched.stages ?? [])

	const translateStages = (list: TPlanFormInput['stages']) =>
		list.map(stage => ({ ...stage, service: t(stage.service) }))

	const openWith = (next: TreatmentPlan | null) => {
		setPlan(next)
		form.reset({
			doctor: next ? (DOCTOR_BY_NAME[next.doctor] ?? 'kas') : 'kas',
			name: next ? tPlans(next.title) : t('defaultPlanName'),
			stages: translateStages(DEFAULT_STAGES),
			payment: next ? 'full' : 'inst',
			note: '',
		})
		setOpen(true)
	}
	const close = () => setOpen(false)
	const patientName = format.name(plan?.patientName ?? NEW_PLAN_PATIENT.name)

	return {
		open,
		isEdit: !!plan,
		title: plan ? t('planOf', { name: patientName }) : t('newPlan'),
		subtitle: plan
			? t('updatedToday', { plan: tPlans(plan.title) })
			: t('createSubtitle'),
		patient: {
			name: patientName,
			id: plan?.patientId ?? NEW_PLAN_PATIENT.id,
			initials: getInitials(patientName),
		},
		doctorOptions: (['kas', 'pet', 'tok'] as const).map(id => ({
			id,
			label: format.name(DOCTORS[id].shortName),
		})),
		doctor: watched.doctor ?? 'kas',
		setDoctor: (value: 'kas' | 'pet' | 'tok') => form.setValue('doctor', value),
		payment: watched.payment ?? 'full',
		setPayment: (value: 'full' | 'stage' | 'inst') =>
			form.setValue('payment', value),
		register: form.register,
		cellInvalid: (
			index: number,
			name: 'service' | 'qty' | 'price' | 'discount',
		) => !!errors.stages?.[index]?.[name],
		stages: stages.fields.map((field, index) => ({
			key: field.id,
			index,
			sum: format.som(lines[index]?.net ?? 0),
			remove: () => stages.remove(index),
		})),
		addStage: () => stages.append(translateStages([NEW_STAGE])[0]),
		stagesError: errors.stages?.root?.message ?? errors.stages?.message,
		errorOf: (message?: string) => (message ? tValidation(message) : undefined),
		nameError: errors.name?.message,
		totals: {
			sum: format.som(sum),
			discount: discount ? `−${format.som(discount)}` : '—',
			foms: foms ? `−${format.som(foms)}` : '—',
			total: format.som(total),
			installment:
				watched.payment === 'inst'
					? t('installmentLine', {
							months: INSTALLMENT_MONTHS,
							amount: format.som(Math.round(total / INSTALLMENT_MONTHS)),
						})
					: undefined,
		},
		close,
		openCreate: () => openWith(null),
		openEdit: (next: TreatmentPlan) => openWith(next),
		saving: isSubmitting,
		saveDraft: () => {
			close()
			toast.show(t('draftSaved'))
		},
		save: form.handleSubmit(async () => {
			await mockRequest()
			close()
			toast.show(plan ? t('planUpdated') : t('planSentBySms'))
		}),
		remove: () => plan && onRemove(plan, close),
	}
}

export type TPlanFormModel = ReturnType<typeof usePlanForm>
