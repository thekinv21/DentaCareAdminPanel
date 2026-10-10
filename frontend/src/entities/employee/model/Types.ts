import type { TTone } from '@/shared/ui/badge'

export type TDoctorId = 'kas' | 'pet' | 'tok'

export type TDoctor = {
	id: TDoctorId
	/**
	 * Short form used in schedules: "Касымова А."
	 */
	shortName: string
	fullName: string
	specialty: string
	/**
	 * Calendar color token
	 */
	color: 'brand' | 'info' | 'accent'
	tone: TTone
}
