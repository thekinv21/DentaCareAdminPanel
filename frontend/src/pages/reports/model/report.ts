export type ReportRange = 'half' | 'year'

/**
 * Monthly revenue in thousands of som, October 2025 – September 2026
 */
export const MONTHLY_REVENUE: { month: string; value: number }[] = [
	{ month: 'окт', value: 1720 },
	{ month: 'ноя', value: 1810 },
	{ month: 'дек', value: 1690 },
	{ month: 'янв', value: 1540 },
	{ month: 'фев', value: 1750 },
	{ month: 'мар', value: 1930 },
	{ month: 'апр', value: 2080 },
	{ month: 'май', value: 2010 },
	{ month: 'июн', value: 2160 },
	{ month: 'июл', value: 2050 },
	{ month: 'авг', value: 1880 },
	{ month: 'сен', value: 2290 },
]

export const REVENUE_TARGET = 2000

export const RANGE_LABEL: Record<ReportRange, string> = {
	year: 'Октябрь 2025 – сентябрь 2026',
	half: 'Апрель – сентябрь 2026',
}

export const RANGE_KPI: Record<
	ReportRange,
	{ revenueDelta: string; newPatients: string; newPatientsDelta: string }
> = {
	year: { revenueDelta: '+11%', newPatients: '412', newPatientsDelta: '+14%' },
	half: { revenueDelta: '+9%', newPatients: '226', newPatientsDelta: '+18%' },
}

export interface DoctorPerformance {
	initials: string
	name: string
	specialty: string
	tone: 'accent' | 'info' | 'ok'
	visits: Record<ReportRange, string>
	revenue: Record<ReportRange, string>
	planConsent: number
	chairLoad: number
}

export const DOCTOR_PERFORMANCE: DoctorPerformance[] = [
	{
		initials: 'АК',
		name: 'Айгерим Касымова',
		specialty: 'Терапия, эндодонтия',
		tone: 'accent',
		visits: { year: '1 284', half: '668' },
		revenue: { year: '9,8 млн', half: '5,3 млн' },
		planConsent: 82,
		chairLoad: 91,
	},
	{
		initials: 'СП',
		name: 'Сергей Петров',
		specialty: 'Ортопедия',
		tone: 'info',
		visits: { year: '1 102', half: '561' },
		revenue: { year: '8,1 млн', half: '4,2 млн' },
		planConsent: 76,
		chairLoad: 84,
	},
	{
		initials: 'ЭТ',
		name: 'Эрмек Токтогулов',
		specialty: 'Хирургия, имплантация',
		tone: 'ok',
		visits: { year: '968', half: '502' },
		revenue: { year: '5,6 млн', half: '3,0 млн' },
		planConsent: 71,
		chairLoad: 78,
	},
]
