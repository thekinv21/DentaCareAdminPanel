import { Badge } from '@/shared/ui/badge'

import { PATIENT_FLAG } from '../model/flags'
import type { PatientFlag } from '../model/types'

export function PatientFlagBadge({ flag }: { flag: PatientFlag }) {
	const { label, tone } = PATIENT_FLAG[flag]
	return <Badge tone={tone}>{label}</Badge>
}
