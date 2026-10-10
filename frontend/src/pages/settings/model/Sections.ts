export type TSectionId =
	'clinic' | 'hours' | 'services' | 'pay' | 'lang' | 'notif'

export const SECTIONS: {
	id: TSectionId
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
