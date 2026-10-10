export type TServiceCategory = 'diag' | 'ther' | 'hyg' | 'surg' | 'orth'

export const SERVICE_CATEGORY: Record<TServiceCategory, string> = {
	diag: 'diagnostics',
	ther: 'restorativeDentistry',
	hyg: 'hygiene',
	surg: 'surgery',
	orth: 'prosthodontics',
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
		category: 'diag',
		minutes: 20,
		price: 1500,
		foms: true,
	},
	{
		code: 'D-02',
		name: 'periapicalXRayRvg',
		category: 'diag',
		minutes: 10,
		price: 600,
		foms: true,
	},
	{
		code: 'D-05',
		name: 'singleJawCt',
		category: 'diag',
		minutes: 20,
		price: 3500,
		foms: false,
	},
	{
		code: 'T-11',
		name: 'lightCuredFilling',
		category: 'ther',
		minutes: 60,
		price: 6000,
		foms: false,
	},
	{
		code: 'T-14',
		name: 'rootCanal1Canal',
		category: 'ther',
		minutes: 60,
		price: 7500,
		foms: false,
	},
	{
		code: 'T-15',
		name: 'rootCanal3Canals',
		category: 'ther',
		minutes: 120,
		price: 18000,
		foms: false,
	},
	{
		code: 'H-01',
		name: 'professionalCleaningAirFlow',
		category: 'hyg',
		minutes: 60,
		price: 4500,
		foms: false,
	},
	{
		code: 'S-03',
		name: 'simpleToothExtraction',
		category: 'surg',
		minutes: 30,
		price: 3000,
		foms: true,
	},
	{
		code: 'S-07',
		name: 'wisdomToothExtraction',
		category: 'surg',
		minutes: 60,
		price: 9000,
		foms: false,
	},
	{
		code: 'S-12',
		name: 'osstemImplantPlacement',
		category: 'surg',
		minutes: 90,
		price: 55000,
		foms: false,
	},
	{
		code: 'O-04',
		name: 'porcelainFusedToMetal',
		category: 'orth',
		minutes: 60,
		price: 16000,
		foms: false,
	},
	{
		code: 'O-06',
		name: 'zirconiaCrown',
		category: 'orth',
		minutes: 60,
		price: 28000,
		foms: false,
	},
]
