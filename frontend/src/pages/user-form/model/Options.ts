/**
 * Option lists of the user form; labels are message keys in the UserForm namespace
 */
export const SPECIALTIES = [
	'ther',
	'endo',
	'orth',
	'surg',
	'impl',
	'ortho',
	'perio',
	'kids',
] as const

export const VISIT_DURATIONS = [30, 45, 60, 90] as const

export const CHAIRS = ['chair1', 'chair2', 'chair3', 'chair4'] as const

export const ASSISTANT_DOCTORS = [
	{ id: 'kas', name: 'Касымова А.' },
	{ id: 'pet', name: 'Петров С.' },
	{ id: 'tok', name: 'Токтогулов Э.' },
	{ id: 'yus', name: 'Юсупова Д.' },
] as const

export const QUALIFICATIONS = ['dentalAssistant', 'nurse', 'hygienist'] as const

export const PAYMENT_CHANNELS = ['visa', 'mbank', 'komp', 'opt'] as const

export const TILLS = ['till1', 'till2'] as const

export const REPORTS = ['rev', 'debt', 'bank', 'sal', 'inv'] as const

export const EXPORT_FORMATS = ['xlsx', 'oneC', 'csv'] as const

export const REPORT_BRANCHES = ['allBranches', 'alaTooOnly'] as const

export const WORK_DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const

export const INTERFACE_LANGUAGES = ['ru', 'ky', 'en'] as const

export type TUserSwitch =
	| 'invite'
	| 'tfa'
	| 'active'
	| 'online'
	| 'sign'
	| 'stock'
	| 'chart'
	| 'cancel'
	| 'refund'
	| 'bank'
	| 'close'

export const DEFAULT_SWITCHES: Record<TUserSwitch, boolean> = {
	invite: true,
	tfa: true,
	active: true,
	online: true,
	sign: false,
	stock: true,
	chart: false,
	cancel: true,
	refund: false,
	bank: true,
	close: true,
}

export type TUserChoices = {
	language: (typeof INTERFACE_LANGUAGES)[number]
	gender: 'm' | 'f'
	specialties: string[]
	duration: number
	color: string
	doctors: string[]
	payments: string[]
	reports: string[]
	days: string[]
}

export const DEFAULT_CHOICES: TUserChoices = {
	language: 'ru',
	gender: 'm',
	specialties: ['orth', 'impl'],
	duration: 60,
	color: '#1D5DA3',
	doctors: ['pet'],
	payments: ['visa', 'mbank', 'komp', 'opt'],
	reports: ['rev', 'debt', 'bank'],
	days: ['mon', 'tue', 'thu', 'fri', 'sat'],
}
