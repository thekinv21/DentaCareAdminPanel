import { USERS } from '@/entities/user'

import { WEEK_DAYS } from '@/shared/lib/date'
import { getShortName } from '@/shared/lib/format'

/**
 * Option lists of the user form; labels are message keys in the UserForm namespace
 */
export const SPECIALTIES = [
	'restorative',
	'endodontics',
	'prosthodontics',
	'surgery',
	'implantology',
	'orthodontics',
	'periodontics',
	'pediatric',
] as const

export const VISIT_DURATIONS = [30, 45, 60, 90] as const

export const CHAIR_NUMBERS = [1, 2, 3, 4] as const

/**
 * Dentists an assistant can be attached to: the chief and the doctors
 */
export const ASSISTANT_DOCTORS = USERS.filter(
	user => user.type === 'chief' || user.type === 'doctor',
).map(user => ({ id: user.id, name: getShortName(user.fullName) }))

export const QUALIFICATIONS = ['dentalAssistant', 'nurse', 'hygienist'] as const

export const PAYMENT_CHANNELS = ['visa', 'mbank', 'komp', 'optima'] as const

export const TILLS = ['till1', 'till2'] as const

export const REPORTS = [
	'revenue',
	'patientDebts',
	'bankReceipts',
	'salaries',
	'inventoryCost',
] as const

export const EXPORT_FORMATS = ['xlsx', 'oneC', 'csv'] as const

export const REPORT_BRANCHES = ['allBranches', 'alaTooOnly'] as const

export const SCHEDULE_DAYS = WEEK_DAYS.filter(day => day !== 'sun')

export const USER_SWITCHES = [
	'sendInvite',
	'twoFactor',
	'accountActive',
	'onlineBooking',
	'signsDocuments',
	'writeOffMaterials',
	'markDentalChart',
	'cancelAppointments',
	'issueRefunds',
	'seeBankStatements',
	'closeTillShift',
] as const
