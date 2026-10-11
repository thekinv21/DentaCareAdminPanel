import type { TTone } from '@/shared/ui/badge'

import type { TPatientFlag } from './Types'

export const PATIENT_FLAG: Record<
	TPatientFlag,
	{ label: string; tone: TTone }
> = {
	allergy: { label: 'allergy', tone: 'danger' },
	recall: { label: 'followUpExam', tone: 'warning' },
	plan: { label: 'hasPlan', tone: 'accent' },
	foms: { label: 'mhif', tone: 'info' },
	new: { label: 'new', tone: 'brand' },
}
