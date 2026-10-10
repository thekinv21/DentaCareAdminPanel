'use client'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { useFormat } from '@/shared/lib/i18n'

import {
	SERVICE_CATEGORY,
	SERVICES,
	type TServiceCategory,
	type TServiceItem,
} from './Services'

type TCategoryFilter = 'all' | Exclude<TServiceCategory, 'hyg'>

/**
 * Query of the price list
 */
type TServicesQuery = { category: TCategoryFilter }

const FILTERS: { id: TCategoryFilter; label: string }[] = [
	{ id: 'all', label: 'all' },
	{ id: 'diag', label: 'diagnostics' },
	{ id: 'ther', label: 'restorativeDentistry' },
	{ id: 'surg', label: 'surgery' },
	{ id: 'orth', label: 'prosthodontics' },
]

type TServicesOptions = {
	removedCodes: Set<string>
	onEdit: (service: TServiceItem) => void
	onRemove: (service: TServiceItem) => void
}

/**
 * Price list filtered by category
 */
export function useServices(options: TServicesOptions) {
	const { removedCodes, onEdit, onRemove } = options

	const t = useTranslations('Settings')
	const format = useFormat()
	const filters = useForm<TServicesQuery>({
		defaultValues: { category: 'all' },
	})
	const category = useWatch({ control: filters.control, name: 'category' })

	return {
		filters,
		categories: FILTERS.map(item => ({ ...item, label: t(item.label) })),
		rows: SERVICES.filter(
			service =>
				!removedCodes.has(service.code) &&
				(category === 'all' || service.category === category),
		).map(service => ({
			code: service.code,
			name: t(service.name),
			category: t(SERVICE_CATEGORY[service.category]),
			duration: `${service.minutes} ${t('min')}`,
			price: format.som(service.price),
			foms: {
				label: t(service.foms ? 'covers' : 'no'),
				tone: service.foms ? ('ok' as const) : ('neutral' as const),
			},
			edit: () => onEdit(service),
			remove: () => onRemove(service),
		})),
	}
}

export type TServicesModel = ReturnType<typeof useServices>
