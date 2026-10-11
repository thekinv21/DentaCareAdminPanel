export type TPatientFlag = 'allergy' | 'recall' | 'plan' | 'foms' | 'new'

export type TPatientSegment = 'today' | 'active' | 'debt' | 'recall'

export type TPatient = {
	id: string
	fullName: string
	/**
	 * Full years
	 */
	age: number
	phone: string
	/**
	 * "dd.mm.yyyy"
	 */
	lastVisit: string
	/**
	 * "dd.mm.yyyy", or "HH:MM" when `isNextVisitToday`; null when not booked
	 */
	nextVisit: string | null
	isNextVisitToday: boolean
	doctor: string
	/**
	 * Outstanding balance in som
	 */
	balance: number
	flags: TPatientFlag[]
	segment: TPatientSegment
}
