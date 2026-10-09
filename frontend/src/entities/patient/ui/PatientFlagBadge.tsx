'use client'

import { useTranslations } from 'next-intl'

import { Badge } from '@/shared/ui/badge'

import { PATIENT_FLAG } from '../model/Flags'
import type { PatientFlag } from '../model/Types'

export function PatientFlagBadge({ flag }: { flag: PatientFlag }) {
	const t = useTranslations('Patient')
	const { label, tone } = PATIENT_FLAG[flag]
	return <Badge tone={tone}>{t(label)}</Badge>
}
