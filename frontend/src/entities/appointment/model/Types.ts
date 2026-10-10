export type TAppointmentStatus =
	'done' | 'chair' | 'next' | 'confirmed' | 'pending' | 'noshow'

export type TDoctorKey = 'kas' | 'pet' | 'tok'

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
	procedure: string
	doctorId: TDoctorKey
	chair: number
	status: TAppointmentStatus
}
