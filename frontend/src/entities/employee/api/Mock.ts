import type { TDoctor, TDoctorId } from '../model/Types'

export const DOCTOR_IDS = ['kas', 'pet', 'tok'] as const satisfies TDoctorId[]

export const CHAIR_NUMBERS = [1, 2, 3, 4] as const

export const DOCTORS: Record<TDoctorId, TDoctor> = {
	kas: {
		id: 'kas',
		shortName: 'Касымова А.',
		fullName: 'Айгерим Касымова',
		specialty: 'restorativeDentistryEndodontics',
		color: 'brand',
		tone: 'accent',
	},
	pet: {
		id: 'pet',
		shortName: 'Петров С.',
		fullName: 'Сергей Петров',
		specialty: 'prosthodontics',
		color: 'info',
		tone: 'info',
	},
	tok: {
		id: 'tok',
		shortName: 'Токтогулов Э.',
		fullName: 'Эрмек Токтогулов',
		specialty: 'surgeryImplantology',
		color: 'accent',
		tone: 'ok',
	},
}

export const CURRENT_USER = {
	fullName: 'Айгерим Касымова',
	role: 'chiefDentist',
	branch: 'bishkekAlaToo',
}
