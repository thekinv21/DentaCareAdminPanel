'use client'

import { useState } from 'react'

import { useI18n } from '@/shared/lib/i18n'

import { SERVICE_CATEGORY, type ServiceCategory, SERVICES } from './services'

type CategoryFilter = 'all' | Exclude<ServiceCategory, 'hyg'>

const FILTERS: { id: CategoryFilter; label: string }[] = [
	{ id: 'all', label: 'Все' },
	{ id: 'diag', label: 'Диагностика' },
	{ id: 'ther', label: 'Терапия' },
	{ id: 'surg', label: 'Хирургия' },
	{ id: 'orth', label: 'Ортопедия' },
]

/**
 * Price list filtered by category
 */
export function useServices() {
	const { t, format } = useI18n()
	const [category, setCategory] = useState<CategoryFilter>('all')

	return {
		category,
		setCategory,
		filters: FILTERS.map(item => ({ ...item, label: t(item.label) })),
		rows: SERVICES.filter(
			service => category === 'all' || service.category === category,
		).map(service => ({
			code: service.code,
			name: t(service.name),
			category: t(SERVICE_CATEGORY[service.category]),
			duration: `${service.minutes} ${t('мин')}`,
			price: format.som(service.price),
			foms: {
				label: t(service.foms ? 'Покрывает' : 'Нет'),
				tone: service.foms ? ('ok' as const) : ('neutral' as const),
			},
		})),
	}
}
