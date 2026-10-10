'use client'

import { useTranslations } from 'next-intl'

import { Badge } from '@/shared/ui/badge'

import { PATIENT_FLAG } from '../model/Flags'
import type { TPatientFlag } from '../model/Types'

type TPatientFlagBadgeProps = { flag: TPatientFlag }

export function PatientFlagBadge({ flag }: TPatientFlagBadgeProps) {
	const t = useTranslations('Patient')
	const { label, tone } = PATIENT_FLAG[flag]
	return <Badge tone={tone}>{t(label)}</Badge>
}
