'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { mockRequest } from '@/shared/api'
import { useToast } from '@/shared/ui/toast'

import {
	serviceFormSchema,
	type TServiceFormInput,
	type TServiceFormValues,
} from './ServiceFormSchema'
import { SERVICE_CATEGORY, type TServiceItem } from './Services'

const EMPTY: TServiceFormInput = {
	name: '',
	code: 'T-16',
	category: 'ther',
	price: '',
	minutes: 60,
	materials: [],
	foms: false,
	online: true,
}

/**
 * New/edit price list entry in a modal
 */
export function useServiceForm(
	onRemove: (service: TServiceItem, onDone: () => void) => void,
) {
	const t = useTranslations('ServiceForm')
	const tSettings = useTranslations('Settings')
	const tValidation = useTranslations('Validation')
	const toast = useToast()
	const [open, setOpen] = useState(false)
	const [service, setService] = useState<TServiceItem | null>(null)

	const form = useForm<TServiceFormInput, unknown, TServiceFormValues>({
		resolver: zodResolver(serviceFormSchema),
		defaultValues: EMPTY,
	})
	const values = useWatch({ control: form.control })
	const { errors, isSubmitting } = form.formState

	const openWith = (next: TServiceItem | null) => {
		setService(next)
		form.reset(
			next
				? {
						name: tSettings(next.name),
						code: next.code,
						category: next.category,
						price: String(next.price),
						minutes: next.minutes,
						materials: ['comp', 'bond', 'etch'],
						foms: next.foms,
						online: true,
					}
				: EMPTY,
		)
		setOpen(true)
	}
	const close = () => setOpen(false)

	return {
		open,
		isEdit: !!service,
		title: service ? tSettings(service.name) : t('newService'),
		subtitle: service
			? `${service.code} · ${tSettings(SERVICE_CATEGORY[service.category])}`
			: t('createSubtitle'),
		openCreate: () => openWith(null),
		openEdit: (next: TServiceItem) => openWith(next),
		close,
		values,
		setCategory: (value: TServiceFormInput['category']) =>
			form.setValue('category', value),
		setMinutes: (value: number) => form.setValue('minutes', value),
		setMaterials: (value: string[]) => form.setValue('materials', value),
		setFoms: (value: boolean) => form.setValue('foms', value),
		setOnline: (value: boolean) => form.setValue('online', value),
		field: (name: 'name' | 'code' | 'price') => ({
			'aria-invalid': !!errors[name],
			...form.register(name),
		}),
		errorOf: (name: 'name' | 'price') => {
			const message = errors[name]?.message
			return message ? tValidation(message) : undefined
		},
		saving: isSubmitting,
		save: form.handleSubmit(async () => {
			await mockRequest()
			close()
			toast.show(service ? t('serviceUpdated') : t('serviceAdded'))
		}),
		remove: () => service && onRemove(service, close),
	}
}

export type TServiceFormModel = ReturnType<typeof useServiceForm>
