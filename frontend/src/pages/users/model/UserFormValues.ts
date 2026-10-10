import type { TUser } from '@/entities/user'
import { USER_TYPE } from '@/entities/user'

import type { TUserFormValues } from './UserFormSchema'

export const EMPTY_USER_VALUES: TUserFormValues = {
	type: 'doctor',
	role: USER_TYPE.doctor.role,
	lastName: '',
	firstName: '',
	middleName: '',
	phone: '',
	email: '',
	birthDate: '',
	branch: 'alaToo',
	language: 'ru',
	gender: 'm',
	specialties: ['prosthodontics', 'implantology'],
	license: '',
	experience: '',
	revenuePercent: '30',
	chair: 1,
	duration: 60,
	color: '#1D5DA3',
	doctors: ['u2'],
	qualification: 'dentalAssistant',
	payments: ['visa', 'mbank', 'komp', 'optima'],
	discountLimit: '10',
	till: 'till1',
	reports: ['revenue', 'patientDebts', 'bankReceipts'],
	exportFormat: 'xlsx',
	reportBranches: 'allBranches',
	days: ['mon', 'tue', 'thu', 'fri', 'sat'],
	workStart: '09:00',
	workEnd: '18:00',
	switches: {
		sendInvite: true,
		twoFactor: true,
		accountActive: true,
		onlineBooking: true,
		signsDocuments: false,
		writeOffMaterials: true,
		markDentalChart: false,
		cancelAppointments: true,
		issueRefunds: false,
		seeBankStatements: true,
		closeTillShift: true,
	},
}

/**
 * Mock profile details the list doesn't carry (until GET /users/:id exists)
 */
export function toFormValues(user: TUser): TUserFormValues {
	const [firstName, lastName = ''] = user.fullName.split(' ')

	return {
		...EMPTY_USER_VALUES,
		type: user.type,
		role: user.role,
		lastName,
		firstName,
		middleName: 'Николаевич',
		phone: user.phone.replace('+996 ', ''),
		email: user.email,
		birthDate: '14.05.1985',
		branch: user.branch,
		license: 'СТ-0457',
		experience: '15',
		revenuePercent: '35',
		chair: 2,
	}
}
