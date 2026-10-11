export const PROFILE_FIELDS = [
	{
		name: 'lastName',
		label: 'lastName',
		value: 'Касымова',
		autoComplete: 'family-name',
	},
	{
		name: 'firstName',
		label: 'firstName',
		value: 'Айгерим',
		autoComplete: 'given-name',
	},
	{ name: 'position', label: 'position', value: 'chiefDentist' },
	{ name: 'specialty', label: 'specialty', value: 'generalDentistEndodontist' },
	{
		name: 'phone',
		label: 'phone',
		value: '+996 555 701 441',
		mono: true,
		type: 'tel',
	},
	{
		name: 'email',
		label: 'email',
		value: 'a.kasymova@denta.kg',
		type: 'email',
	},
	{
		name: 'diploma',
		label: 'diplomaCertificateNumber',
		value: 'sampleDiploma',
		mono: true,
	},
] as const

export type TProfileField = (typeof PROFILE_FIELDS)[number]['name']

/**
 * Mock profile facts shown next to the form
 */
export const PROFILE_FACTS = {
	maskedPhone: '+996 555 ••• 441',
	chair: 1,
	workingHours: { from: '08:30', to: '17:30' },
	passwordAgeDays: 64,
	autoLockMinutes: 10,
	dailyScheduleTime: '07:45',
	stats: [
		{ value: 1284, kind: 'number', label: 'patients' },
		{ value: 12, kind: 'number', label: 'yearsOfExperience' },
		{ value: 0.94, kind: 'percent', label: 'chairLoad' },
	],
}

export const SECURITY_OPTIONS = [
	{ id: 'twoFactor', label: 'twoStepVerification', hint: 'twoFactorHint' },
	{ id: 'newDeviceAlert', label: 'notifyOnSignIn', hint: 'smsAndEmailRight' },
	{ id: 'autoLock', label: 'autoLockAfter', hint: 'ifTheOfficeComputer' },
] as const

export type TSecurityOptionId = (typeof SECURITY_OPTIONS)[number]['id']

export const CURRENT_SESSION_ID = 'current'

export const SESSIONS: {
	id: string
	device: string
	place: string
	/**
	 * When the session was last active: now, today/yesterday at a time, or a date
	 */
	lastActive:
		| { kind: 'now' }
		| { kind: 'today' | 'yesterday'; time: string }
		/**
		 * ISO date (YYYY-MM-DD), formatted for the locale when shown
		 */
		| { kind: 'date'; date: string }
}[] = [
	{
		id: CURRENT_SESSION_ID,
		device: 'Chrome · Windows 11',
		place: 'sessionPlaceOffice',
		lastActive: { kind: 'now' },
	},
	{
		id: 'ipad',
		device: 'Safari · iPad',
		place: 'sessionPlaceClinic',
		lastActive: { kind: 'today', time: '08:10' },
	},
	{
		id: 'iphone',
		device: 'Denta · iPhone 15',
		place: 'sessionPlaceMobile',
		lastActive: { kind: 'yesterday', time: '21:42' },
	},
	{
		id: 'home',
		device: 'Chrome · macOS',
		place: 'sessionPlaceHome',
		lastActive: { kind: 'date', date: '2026-10-05' },
	},
]

export const NOTIFICATION_EVENTS = [
	{
		id: 'newAppointment',
		label: 'newOnlineAppointment',
		hint: 'patientBookedViaWebsite',
	},
	{
		id: 'cancellation',
		label: 'appointmentCancellationOrReschedule',
		hint: 'includingRepliesToSms',
	},
	{ id: 'payment', label: 'paymentReceived', hint: 'paymentChannels' },
	{ id: 'lowStock', label: 'lowStockInInventory', hint: 'materialsYouUse' },
	{
		id: 'weeklyReport',
		label: 'weeklyReport',
		hint: 'revenueAndUtilizationOn',
	},
	{
		id: 'messages',
		label: 'messagesFromColleagues',
		hint: 'treatmentPlanComments',
	},
] as const

export type TNotificationEventId = (typeof NOTIFICATION_EVENTS)[number]['id']

export const NOTIFICATION_CHANNELS = [
	{ id: 'app', label: 'inApp', ariaLabel: 'inTheApp' },
	{ id: 'sms', label: 'SMS', ariaLabel: 'SMS' },
	{ id: 'email', label: 'Email', ariaLabel: 'email' },
] as const

export type TNotificationChannelId =
	(typeof NOTIFICATION_CHANNELS)[number]['id']

const channels = (app: boolean, sms: boolean, email: boolean) => ({
	app,
	sms,
	email,
})

export const INITIAL_NOTIFICATIONS: Record<
	TNotificationEventId,
	Record<TNotificationChannelId, boolean>
> = {
	newAppointment: channels(true, false, false),
	cancellation: channels(true, true, false),
	payment: channels(true, false, true),
	lowStock: channels(true, false, false),
	weeklyReport: channels(false, false, true),
	messages: channels(true, false, false),
}
