import type { Tone } from '@/shared/ui/badge'

import type { PatientFlag } from './Types'

export const PATIENT_FLAG: Record<PatientFlag, { label: string; tone: Tone }> =
	{
		allergy: { label: 'allergy', tone: 'danger' },
		recall: { label: 'followUpExam', tone: 'warning' },
		plan: { label: 'hasPlan', tone: 'accent' },
		foms: { label: 'mhif', tone: 'info' },
		new: { label: 'new', tone: 'brand' },
	}
