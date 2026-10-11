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
import { SERVICE_CATEGORY_LABEL, type TServiceItem } from './Services'

const EMPTY_SERVICE_VALUES: TServiceFormInput = {
	name: '',
	code: 'T-16',
	category: 'therapy',
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
		defaultValues: EMPTY_SERVICE_VALUES,
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
						materials: ['composite', 'adhesive', 'etchant'],
						foms: service.foms,
						online: true,
					}
				: EMPTY_SERVICE_VALUES,
		),
	)
	const service = modal.item

	return {
		...modal,
		methods,
		title: service ? tSettings(service.name) : t('newService'),
		subtitle: service
			? `${service.code} · ${tSettings(SERVICE_CATEGORY_LABEL[service.category])}`
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
