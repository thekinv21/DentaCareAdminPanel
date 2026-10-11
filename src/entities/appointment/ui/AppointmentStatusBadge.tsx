import { useTranslations } from 'next-intl'

import { Badge } from '@/shared/ui/badge'

import { APPOINTMENT_STATUS } from '../model/Status'
import type { TAppointmentStatus } from '../model/Types'

type TAppointmentStatusBadgeProps = {
	status: TAppointmentStatus
}

export function AppointmentStatusBadge({
	status,
}: TAppointmentStatusBadgeProps) {
	const t = useTranslations('Appointment')
	const { label, tone } = APPOINTMENT_STATUS[status]
	return (
		<Badge tone={tone} dot>
			{t(label)}
		</Badge>
	)
}
