export type TSectionId =
	'clinic' | 'hours' | 'services' | 'payment' | 'languages' | 'notifications'

export const SECTIONS: {
	id: TSectionId
	label: string
	description: string
}[] = [
	{ id: 'clinic', label: 'clinic', description: 'coreClinicDetailsFor' },
	{ id: 'hours', label: 'workingHours', description: 'workingDaysAndHours' },
	{ id: 'services', label: 'servicesAndPrices', description: 'priceListInSom' },
	{ id: 'payment', label: 'payment', description: 'paymentMethodsVisaMbank' },
	{
		id: 'languages',
		label: 'languages',
		description: 'languageOfTheInterface',
	},
	{
		id: 'notifications',
		label: 'notifications',
		description: 'patientRemindersAndTeam',
	},
]
