'use client'

import { useTranslations } from 'next-intl'

import { Badge } from '@/shared/ui/badge'

import { APPOINTMENT_STATUS } from '../model/Status'
import type { AppointmentStatus } from '../model/Types'

export function AppointmentStatusBadge({
	status,
}: {
	status: AppointmentStatus
}) {
	const t = useTranslations('Appointment')
	const { label, tone } = APPOINTMENT_STATUS[status]
	return (
		<Badge tone={tone} dot>
			{t(label)}
		</Badge>
	)
}
