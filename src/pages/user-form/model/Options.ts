import { DOCTOR_IDS, DOCTORS } from '@/entities/employee'

import { WEEK_DAYS } from '@/shared/lib/date'

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

/**
 * Assistants can also work with the hygienist, who is not a dentist
 */
export const ASSISTANT_DOCTORS = [
	...DOCTOR_IDS.map(id => ({ id, name: DOCTORS[id].shortName })),
	{ id: 'yus', name: 'Юсупова Д.' },
]

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
