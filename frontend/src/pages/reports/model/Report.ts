import type { TDoctorId } from '@/entities/employee'

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

/**
 * Monthly revenue goal, thousands of som
 */
export const REVENUE_TARGET = 2000

export const RANGE_MONTHS: Record<TReportRange, number> = { half: 6, year: 12 }

export const RANGE_LABEL: Record<TReportRange, string> = {
	year: 'periodYear',
	half: 'periodHalf',
}

/**
 * Mock KPIs per period until the backend exposes /reports
 */
export const RANGE_KPI: Record<
	TReportRange,
	{
		revenueChangePercent: number
		newPatients: number
		newPatientsChangePercent: number
	}
> = {
	year: {
		revenueChangePercent: 11,
		newPatients: 412,
		newPatientsChangePercent: 14,
	},
	half: {
		revenueChangePercent: 9,
		newPatients: 226,
		newPatientsChangePercent: 18,
	},
}

export const PERIOD_FACTS = {
	averageBill: 4850,
	averageBillChangePercent: 4,
	noShowPercent: 4.8,
	noShowChangePoints: -1.1,
}

type TDoctorPerformance = {
	doctorId: TDoctorId
	visits: Record<TReportRange, number>
	/**
	 * Millions of som
	 */
	revenue: Record<TReportRange, number>
	planConsent: number
	chairLoad: number
}

export const DOCTOR_PERFORMANCE: TDoctorPerformance[] = [
	{
		doctorId: 'kas',
		visits: { year: 1284, half: 668 },
		revenue: { year: 9.8, half: 5.3 },
		planConsent: 82,
		chairLoad: 91,
	},
	{
		doctorId: 'pet',
		visits: { year: 1102, half: 561 },
		revenue: { year: 8.1, half: 4.2 },
		planConsent: 76,
		chairLoad: 84,
	},
	{
		doctorId: 'tok',
		visits: { year: 968, half: 502 },
		revenue: { year: 5.6, half: 3.0 },
		planConsent: 71,
		chairLoad: 78,
	},
]
