'use client'

import { useI18n } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'

import { PATIENT_FLAG } from '../model/flags'
import type { PatientFlag } from '../model/types'

export function PatientFlagBadge({ flag }: { flag: PatientFlag }) {
	const { t } = useI18n()
	const { label, tone } = PATIENT_FLAG[flag]
	return <Badge tone={tone}>{t(label)}</Badge>
}
