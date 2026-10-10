'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { mockRequest } from '@/shared/api'
import { useFormModal } from '@/shared/lib/form'
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
	const toast = useToast()

	const methods = useForm<TServiceFormInput, unknown, TServiceFormValues>({
		resolver: zodResolver(serviceFormSchema),
		defaultValues: EMPTY,
	})
	const modal = useFormModal<TServiceItem>(service =>
		methods.reset(
			service
				? {
						name: tSettings(service.name),
						code: service.code,
						category: service.category,
						price: String(service.price),
						minutes: service.minutes,
						materials: ['comp', 'bond', 'etch'],
						foms: service.foms,
						online: true,
					}
				: EMPTY,
		),
	)
	const service = modal.item

	return {
		...modal,
		methods,
		title: service ? tSettings(service.name) : t('newService'),
		subtitle: service
			? `${service.code} · ${tSettings(SERVICE_CATEGORY[service.category])}`
			: t('createSubtitle'),
		saving: methods.formState.isSubmitting,
		submit: methods.handleSubmit(async () => {
			await mockRequest()
			modal.close()
			toast.show(service ? t('serviceUpdated') : t('serviceAdded'))
		}),
		remove: () => service && onRemove(service, modal.close),
	}
}

export type TServiceFormModel = ReturnType<typeof useServiceForm>
