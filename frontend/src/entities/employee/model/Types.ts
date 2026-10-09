import type { Tone } from '@/shared/ui/badge'

export type DoctorId = 'kas' | 'pet' | 'tok'

export interface Doctor {
	id: DoctorId
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
	tone: Tone
}

export type StaffRole = 'dentist' | 'assistant' | 'reception'
export type StaffStatus = 'on' | 'off' | 'leave'

export interface StaffMember {
	id: string
	fullName: string
	role: StaffRole
	specialty: string
	status: StaffStatus
	todayShift: string
	workplace: string
	phone: string
	tone: Tone
}
