export const CLINIC_FIELDS = [
	{ name: 'clinicName', label: 'clinicName', value: 'dentaAlaToo' },
	{ name: 'legalEntity', label: 'legalEntity', value: 'dentaClinicLlc' },
	{ name: 'tin', label: 'tin', value: '02410202610153', mono: true },
	{
		name: 'license',
		label: 'kyrgyzMinistryOfHealth',
		value: 'no0417MzValid',
		mono: true,
	},
	{
		name: 'address',
		label: 'address',
		value: 'n112ToktogulSt1st',
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

export const CHAIRS = [
	{ id: 'c1', name: 'restorativeDentistry', doctor: 'Касымова А.' },
	{ id: 'c2', name: 'prosthodontics', doctor: 'Петров С.' },
	{ id: 'c3', name: 'surgery', doctor: 'Токтогулов Э.' },
	{
		id: 'c4',
		name: 'hygieneSurgery',
		doctor: 'Юсупова Д. / Токтогулов Э.',
	},
]

export const WORK_DAYS = [
	{ id: 'mon', name: 'monday', from: '08:00', to: '19:00' },
	{ id: 'tue', name: 'tuesday', from: '08:00', to: '19:00' },
	{ id: 'wed', name: 'wednesday', from: '08:00', to: '19:00' },
	{ id: 'thu', name: 'thursday', from: '08:00', to: '19:00' },
	{ id: 'fri', name: 'friday', from: '08:00', to: '19:00' },
	{ id: 'sat', name: 'saturday', from: '09:00', to: '15:00' },
	{ id: 'sun', name: 'sunday', from: '10:00', to: '14:00' },
]
