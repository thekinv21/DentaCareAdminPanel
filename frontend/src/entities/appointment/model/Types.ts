export type AppointmentStatus =
	'done' | 'chair' | 'next' | 'confirmed' | 'pending' | 'noshow'

export type DoctorKey = 'kas' | 'pet' | 'tok'

export interface Appointment {
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
	procedure: string
	doctorId: DoctorKey
	chair: number
	status: AppointmentStatus
}
