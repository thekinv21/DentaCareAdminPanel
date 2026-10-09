'use client'

import { useI18n } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'

import { INVOICE_STATUS } from '../model/maps'
import type { InvoiceStatus } from '../model/types'

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
	const { t } = useI18n()
	const { label, tone } = INVOICE_STATUS[status]
	return <Badge tone={tone}>{t(label)}</Badge>
}
