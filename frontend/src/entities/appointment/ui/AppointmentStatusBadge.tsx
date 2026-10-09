import { Badge } from '@/shared/ui/badge'

import { APPOINTMENT_STATUS } from '../model/status'
import type { AppointmentStatus } from '../model/types'

export function AppointmentStatusBadge({
	status,
}: {
	status: AppointmentStatus
}) {
	const { label, tone } = APPOINTMENT_STATUS[status]
	return (
		<Badge tone={tone} dot>
			{label}
		</Badge>
	)
}
