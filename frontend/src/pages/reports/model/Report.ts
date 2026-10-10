export type TReportRange = 'half' | 'year'

/**
 * Monthly revenue in thousands of som, October 2025 – September 2026
 */
export const MONTHLY_REVENUE: { month: string; value: number }[] = [
	{ month: 'oct', value: 1720 },
	{ month: 'nov', value: 1810 },
	{ month: 'dec', value: 1690 },
	{ month: 'jan', value: 1540 },
	{ month: 'feb', value: 1750 },
	{ month: 'mar', value: 1930 },
	{ month: 'apr', value: 2080 },
	{ month: 'may', value: 2010 },
	{ month: 'jun', value: 2160 },
	{ month: 'jul', value: 2050 },
	{ month: 'aug', value: 1880 },
	{ month: 'sep', value: 2290 },
]

export const REVENUE_TARGET = 2000

export const RANGE_LABEL: Record<TReportRange, string> = {
	year: 'october2025September2026',
	half: 'aprilSeptember2026',
}

export const RANGE_KPI: Record<
	TReportRange,
	{ revenueDelta: string; newPatients: string; newPatientsDelta: string }
> = {
	year: { revenueDelta: '+11%', newPatients: '412', newPatientsDelta: '+14%' },
	half: { revenueDelta: '+9%', newPatients: '226', newPatientsDelta: '+18%' },
}

type TDoctorPerformance = {
	initials: string
	name: string
	specialty: string
	tone: 'accent' | 'info' | 'ok'
	visits: Record<TReportRange, string>
	revenue: Record<TReportRange, string>
	planConsent: number
	chairLoad: number
}

export const DOCTOR_PERFORMANCE: TDoctorPerformance[] = [
	{
		initials: 'ak',
		name: 'Айгерим Касымова',
		specialty: 'restorativeDentistryEndodontics',
		tone: 'accent',
		visits: { year: '1 284', half: '668' },
		revenue: { year: 'n98M', half: 'n53M' },
		planConsent: 82,
		chairLoad: 91,
	},
	{
		initials: 'sp',
		name: 'Сергей Петров',
		specialty: 'prosthodontics',
		tone: 'info',
		visits: { year: '1 102', half: '561' },
		revenue: { year: 'n81M', half: 'n42M' },
		planConsent: 76,
		chairLoad: 84,
	},
	{
		initials: 'et',
		name: 'Эрмек Токтогулов',
		specialty: 'surgeryImplantology',
		tone: 'ok',
		visits: { year: '968', half: '502' },
		revenue: { year: 'n56M', half: 'n30M' },
		planConsent: 71,
		chairLoad: 78,
	},
]
