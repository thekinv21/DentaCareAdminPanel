'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { useFormat } from '@/shared/lib/i18n'

import { SERVICE_CATEGORY, type ServiceCategory, SERVICES } from './Services'

type CategoryFilter = 'all' | Exclude<ServiceCategory, 'hyg'>

const FILTERS: { id: CategoryFilter; label: string }[] = [
	{ id: 'all', label: 'all' },
	{ id: 'diag', label: 'diagnostics' },
	{ id: 'ther', label: 'restorativeDentistry' },
	{ id: 'surg', label: 'surgery' },
	{ id: 'orth', label: 'prosthodontics' },
]

/**
 * Price list filtered by category
 */
export function useServices() {
	const t = useTranslations('Settings')
	const format = useFormat()
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
			duration: `${service.minutes} ${t('min')}`,
			price: format.som(service.price),
			foms: {
				label: t(service.foms ? 'covers' : 'no'),
				tone: service.foms ? ('ok' as const) : ('neutral' as const),
			},
		})),
	}
}
