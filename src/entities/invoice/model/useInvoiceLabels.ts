'use client'

import { useTranslations } from 'next-intl'

import type { TInvoice } from './Types'

/**
 * Translated invoice service: "Filling · 36"
 */
export function useInvoiceLabels() {
	const t = useTranslations('Invoice')
	return {
		service: ({ service, tooth }: Pick<TInvoice, 'service' | 'tooth'>) =>
			tooth ? t('serviceOnTooth', { service: t(service), tooth }) : t(service),
	}
}
