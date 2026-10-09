'use client'

import { useTranslations } from 'next-intl'

import { Badge } from '@/shared/ui/badge'

import { INVOICE_STATUS } from '../model/Maps'
import type { InvoiceStatus } from '../model/Types'

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
	const t = useTranslations('Invoice')
	const { label, tone } = INVOICE_STATUS[status]
	return <Badge tone={tone}>{t(label)}</Badge>
}
