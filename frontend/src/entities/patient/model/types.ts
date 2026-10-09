export type PatientFlag = 'allergy' | 'recall' | 'plan' | 'foms' | 'new'

export type PatientSegment = 'today' | 'active' | 'debt' | 'recall'

export interface Patient {
	id: string
	fullName: string
	age: string
	phone: string
	lastVisit: string
	/**
	 * Free text: a date, "Сегодня · 12:00" or empty when not booked
	 */
	nextVisit: string | null
	isNextVisitToday: boolean
	doctor: string
	/**
	 * Outstanding balance in som
	 */
	balance: number
	flags: PatientFlag[]
	segment: PatientSegment
}
