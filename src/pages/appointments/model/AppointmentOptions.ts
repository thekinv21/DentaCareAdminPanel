/**
 * Bookable services; `id` is the procedure key used by calendar events
 */
export const BOOKING_SERVICES = [
	{ id: 'exam', minutes: 30, price: 1500 },
	{ id: 'professionalCleaning', minutes: 45, price: 4500 },
	{ id: 'filling', minutes: 45, price: 6000 },
	{ id: 'rootCanalTreatment', minutes: 90, price: 9000 },
	{ id: 'crownTryIn', minutes: 60, price: 0 },
	{ id: 'extraction', minutes: 45, price: 3000 },
	{ id: 'consultation', minutes: 30, price: 1000 },
	{ id: 'whitening', minutes: 60, price: 12000 },
] as const

export const START_SLOTS = [
	'09:00',
	'10:30',
	'12:00',
	'12:30',
	'14:30',
	'16:30',
]

export const BOOKING_SOURCES = [
	'reception',
	'phone',
	'online',
	'instagram',
	'whatsapp',
] as const

/**
 * Statuses a receptionist can set by hand ("next" is computed by the schedule)
 */
export const FORM_STATUSES = [
	'confirmed',
	'pending',
	'chair',
	'done',
	'noshow',
] as const

export const FORM_STATUS_DOT_CLASS: Record<
	(typeof FORM_STATUSES)[number],
	string
> = {
	confirmed: 'bg-brand',
	pending: 'bg-warning',
	chair: 'bg-brand-strong',
	done: 'bg-ink-subtle',
	noshow: 'bg-danger',
}

/**
 * Patient id of an event whose patient isn't in the patient list (generated mock days)
 */
export const UNLISTED_PATIENT_ID = 'event'
