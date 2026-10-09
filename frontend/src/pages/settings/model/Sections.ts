export type SectionId =
	'clinic' | 'hours' | 'services' | 'pay' | 'lang' | 'notif'

export const SECTIONS: {
	id: SectionId
	label: string
	hint: string
	description: string
}[] = [
	{
		id: 'clinic',
		label: 'clinic',
		hint: 'companyDetailsAddressChairs',
		description: 'coreClinicDetailsFor',
	},
	{
		id: 'hours',
		label: 'workingHours',
		hint: 'monSat0800',
		description: 'workingDaysAndHours',
	},
	{
		id: 'services',
		label: 'servicesAndPrices',
		hint: 'n42Services',
		description: 'priceListInSom',
	},
	{
		id: 'pay',
		label: 'payment',
		hint: 'n4Banks',
		description: 'paymentMethodsVisaMbank',
	},
	{
		id: 'lang',
		label: 'languages',
		hint: 'RU · KY · EN',
		description: 'languageOfTheInterface',
	},
	{
		id: 'notif',
		label: 'notifications',
		hint: 'smsAndEmail',
		description: 'patientRemindersAndTeam',
	},
]

export const INITIAL_TOGGLES: Record<string, boolean> = {
	mon: true,
	tue: true,
	wed: true,
	thu: true,
	fri: true,
	sat: true,
	sun: false,
	visa: true,
	mbank: true,
	komp: true,
	optima: true,
	fiscal: true,
	prepay: false,
	split: true,
	l_ru: true,
	l_ky: true,
	l_en: true,
	n24: true,
	n2: true,
	nwa: false,
	nbd: true,
	nstock: true,
	nrev: true,
}
