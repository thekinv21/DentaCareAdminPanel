import type { TDoctorId } from '@/entities/employee/@x/appointment'

export type TAppointmentStatus =
	'done' | 'chair' | 'next' | 'confirmed' | 'pending' | 'noshow'

export type TAppointment = {
	id: string
	/**
	 * "HH:MM", clinic local time
	 */
	time: string
	/**
	 * Minutes
	 */
	duration: number
	patientId: string
	patientName: string
	/**
	 * Procedure message key, e.g. "filling"
	 */
	procedure: string
	/**
	 * FDI number of the treated tooth
	 */
	tooth?: string
	doctorId: TDoctorId
	chair: number
	status: TAppointmentStatus
}
