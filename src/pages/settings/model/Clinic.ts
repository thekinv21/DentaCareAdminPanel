import type { TWeekDay } from '@/shared/lib/date'

export const CLINIC_FIELDS = [
	{ name: 'clinicName', label: 'clinicName', value: 'dentaAlaToo' },
	{ name: 'legalEntity', label: 'legalEntity', value: 'dentaClinicLlc' },
	{ name: 'tin', label: 'tin', value: '02410202610153', mono: true },
	{
		name: 'license',
		label: 'healthMinistryLicense',
		value: 'clinicLicense',
		mono: true,
	},
	{
		name: 'address',
		label: 'address',
		value: 'clinicAddress',
		wide: true,
	},
	{
		name: 'phone',
		label: 'receptionPhone',
		value: '+996 312 90 41 41',
		mono: true,
	},
	{ name: 'email', label: 'Email', value: 'info@denta.kg' },
] as const

export type TClinicField = (typeof CLINIC_FIELDS)[number]['name']

/**
 * Treatment chairs of the clinic and who works at each
 */
export const CLINIC_CHAIRS = [
	{ number: 1, specialty: 'restorativeDentistry', doctors: ['Касымова А.'] },
	{ number: 2, specialty: 'prosthodontics', doctors: ['Петров С.'] },
	{ number: 3, specialty: 'surgery', doctors: ['Токтогулов Э.'] },
	{
		number: 4,
		specialty: 'hygieneSurgery',
		doctors: ['Юсупова Д.', 'Токтогулов Э.'],
	},
]

/**
 * Opening hours per week day; Sunday is a day off
 */
export const WORK_HOURS: Record<TWeekDay, { from: string; to: string }> = {
	mon: { from: '08:00', to: '19:00' },
	tue: { from: '08:00', to: '19:00' },
	wed: { from: '08:00', to: '19:00' },
	thu: { from: '08:00', to: '19:00' },
	fri: { from: '08:00', to: '19:00' },
	sat: { from: '09:00', to: '15:00' },
	sun: { from: '09:00', to: '15:00' },
}

export const DAY_NAME: Record<TWeekDay, string> = {
	mon: 'monday',
	tue: 'tuesday',
	wed: 'wednesday',
	thu: 'thursday',
	fri: 'friday',
	sat: 'saturday',
	sun: 'sunday',
}
