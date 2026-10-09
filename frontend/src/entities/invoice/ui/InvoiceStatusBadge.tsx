import { Badge } from '@/shared/ui/badge'

import { INVOICE_STATUS } from '../model/maps'
import type { InvoiceStatus } from '../model/types'

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
	const { label, tone } = INVOICE_STATUS[status]
	return <Badge tone={tone}>{label}</Badge>
}
