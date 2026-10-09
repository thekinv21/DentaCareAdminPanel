export const SECURITY_OPTIONS = [
	{
		id: 'tfa',
		label: 'twoStepVerification',
		hint: 'smsCodeTo996',
	},
	{
		id: 'newdev',
		label: 'notifyOnSignIn',
		hint: 'smsAndEmailRight',
	},
	{
		id: 'autolock',
		label: 'lockScreenAfter10',
		hint: 'ifTheOfficeComputer',
	},
]

export const SESSIONS = [
	{
		id: 'cur',
		device: 'Chrome · Windows 11',
		where: 'room1Bishkek212',
		when: 'now',
	},
	{
		id: 'ipad',
		device: 'Safari · iPad',
		where: 'bishkek21242104',
		when: 'today0810',
	},
	{
		id: 'iph',
		device: 'Denta · iPhone 15',
		where: 'bishkekBeelineKg',
		when: 'yesterday2142',
	},
	{
		id: 'home',
		device: 'Chrome · macOS',
		where: 'bishkekAknet',
		when: '05.10.2026',
	},
]

export const NOTIFICATION_EVENTS = [
	{
		id: 'a',
		label: 'newOnlineAppointment',
		hint: 'patientBookedViaWebsite',
	},
	{
		id: 'c',
		label: 'appointmentCancellationOrReschedule',
		hint: 'includingRepliesToSms',
	},
	{
		id: 'p',
		label: 'paymentReceived',
		hint: 'visaMbankKompanionOptima',
	},
	{
		id: 's',
		label: 'lowStockInInventory',
		hint: 'materialsYouUse',
	},
	{
		id: 'r',
		label: 'weeklyReport',
		hint: 'revenueAndUtilizationOn',
	},
	{
		id: 'm',
		label: 'messagesFromColleagues',
		hint: 'treatmentPlanComments',
	},
]

export const NOTIFICATION_CHANNELS = [
	{ id: 'app', label: 'inApp', aria: 'inTheApp' },
	{ id: 'sms', label: 'SMS', aria: 'SMS' },
	{ id: 'mail', label: 'Email', aria: 'email' },
]

export const INITIAL_PREFERENCES: Record<string, boolean> = {
	tfa: true,
	newdev: true,
	autolock: true,
	a_app: true,
	a_sms: false,
	a_mail: false,
	c_app: true,
	c_sms: true,
	c_mail: false,
	p_app: true,
	p_sms: false,
	p_mail: true,
	s_app: true,
	s_sms: false,
	s_mail: false,
	r_app: false,
	r_sms: false,
	r_mail: true,
	m_app: true,
	m_sms: false,
	m_mail: false,
}
