import type { Tone } from '@/shared/ui/badge'

import type { PatientFlag } from './types'

export const PATIENT_FLAG: Record<PatientFlag, { label: string; tone: Tone }> =
	{
		allergy: { label: 'Аллергия', tone: 'danger' },
		recall: { label: 'Повторный осмотр', tone: 'warning' },
		plan: { label: 'Есть план', tone: 'accent' },
		foms: { label: 'ФОМС', tone: 'info' },
		new: { label: 'Новый', tone: 'brand' },
	}
