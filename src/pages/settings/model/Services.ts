export const SERVICE_CATEGORIES = [
	'diagnostics',
	'therapy',
	'hygiene',
	'surgery',
	'prosthodontics',
] as const

export type TServiceCategory = (typeof SERVICE_CATEGORIES)[number]

/**
 * Message key of each category in the Settings namespace
 */
export const SERVICE_CATEGORY_LABEL: Record<TServiceCategory, string> = {
	diagnostics: 'diagnostics',
	therapy: 'restorativeDentistry',
	hygiene: 'hygiene',
	surgery: 'surgery',
	prosthodontics: 'prosthodontics',
}

export type TServiceItem = {
	code: string
	name: string
	category: TServiceCategory
	minutes: number
	price: number
	foms: boolean
}

export const SERVICES: TServiceItem[] = [
	{
		code: 'T-01',
		name: 'consultationAndExam',
		category: 'diagnostics',
		minutes: 20,
		price: 1500,
		foms: true,
	},
	{
		code: 'D-02',
		name: 'periapicalXRayRvg',
		category: 'diagnostics',
		minutes: 10,
		price: 600,
		foms: true,
	},
	{
		code: 'D-05',
		name: 'singleJawCt',
		category: 'diagnostics',
		minutes: 20,
		price: 3500,
		foms: false,
	},
	{
		code: 'T-11',
		name: 'lightCuredFilling',
		category: 'therapy',
		minutes: 60,
		price: 6000,
		foms: false,
	},
	{
		code: 'T-14',
		name: 'rootCanal1Canal',
		category: 'therapy',
		minutes: 60,
		price: 7500,
		foms: false,
	},
	{
		code: 'T-15',
		name: 'rootCanal3Canals',
		category: 'therapy',
		minutes: 120,
		price: 18000,
		foms: false,
	},
	{
		code: 'H-01',
		name: 'professionalCleaningAirFlow',
		category: 'hygiene',
		minutes: 60,
		price: 4500,
		foms: false,
	},
	{
		code: 'S-03',
		name: 'simpleToothExtraction',
		category: 'surgery',
		minutes: 30,
		price: 3000,
		foms: true,
	},
	{
		code: 'S-07',
		name: 'wisdomToothExtraction',
		category: 'surgery',
		minutes: 60,
		price: 9000,
		foms: false,
	},
	{
		code: 'S-12',
		name: 'osstemImplantPlacement',
		category: 'surgery',
		minutes: 90,
		price: 55000,
		foms: false,
	},
	{
		code: 'O-04',
		name: 'porcelainFusedToMetal',
		category: 'prosthodontics',
		minutes: 60,
		price: 16000,
		foms: false,
	},
	{
		code: 'O-06',
		name: 'zirconiaCrown',
		category: 'prosthodontics',
		minutes: 60,
		price: 28000,
		foms: false,
	},
]
