'use client'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { DOCTORS } from '@/entities/employee'
import { REVENUE_BY_METHOD, usePaymentMethods } from '@/entities/invoice'

import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'

import { barLayout, CHART, chartY } from '../lib/ChartGeometry'
import {
	DOCTOR_PERFORMANCE,
	MONTHLY_REVENUE,
	PERIOD_FACTS,
	RANGE_KPI,
	RANGE_LABEL,
	RANGE_MONTHS,
	REVENUE_TARGET,
	type TReportRange,
} from './Report'

const LARGEST_PERCENT = Math.max(...REVENUE_BY_METHOD.map(item => item.percent))
const BAR_DELAY_STEP_MS = 40

/**
 * Query of the report
 */
type TReportQuery = { range: TReportRange }

const withSign = (value: number) => (value > 0 ? `+${value}` : String(value))

/**
 * Report period switch and everything derived from it
 */
export function useReport() {
	const t = useTranslations('Reports')
	const paymentMethods = usePaymentMethods()
	const format = useFormat()
	const filters = useForm<TReportQuery>({ defaultValues: { range: 'year' } })
	const range = useWatch({ control: filters.control, name: 'range' })

	const visibleMonths = MONTHLY_REVENUE.slice(-RANGE_MONTHS[range])
	const totalThousands = visibleMonths.reduce(
		(sum, month) => sum + month.value,
		0,
	)
	const positionBar = barLayout(visibleMonths.length)
	const thousands = t('kSom')
	const kpi = RANGE_KPI[range]

	const bars = visibleMonths.map((month, index) => {
		const { x, width, center } = positionBar(index)
		const barTop = chartY(month.value)
		const monthName = t(month.month)
		return {
			key: month.month,
			month: monthName,
			x,
			y: barTop,
			width,
			height: CHART.base - barTop,
			center,
			fill: month.value >= REVENUE_TARGET ? 'var(--brand)' : 'var(--info)',
			title: `${monthName} · ${format.number(month.value)} ${thousands}`,
			animationDelay: index * BAR_DELAY_STEP_MS,
		}
	})

	return {
		filters,
		ranges: [
			{
				id: 'half' as const,
				label: t('monthsCount', { n: RANGE_MONTHS.half }),
			},
			{
				id: 'year' as const,
				label: t('monthsCount', { n: RANGE_MONTHS.year }),
			},
		],
		rangeLabel: t(RANGE_LABEL[range]),
		revenue: `${format.number(Math.round(totalThousands / 100) / 10)} ${t('mSom')}`,
		revenueChange: `${withSign(kpi.revenueChangePercent)}%`,
		newPatients: format.number(kpi.newPatients),
		newPatientsChange: `${withSign(kpi.newPatientsChangePercent)}%`,
		averageBill: format.number(PERIOD_FACTS.averageBill),
		averageBillChange: `${withSign(PERIOD_FACTS.averageBillChangePercent)}%`,
		noShows: `${format.number(PERIOD_FACTS.noShowPercent)}%`,
		noShowChange: t('percentagePoints', {
			value: format.number(PERIOD_FACTS.noShowChangePoints),
		}),
		revenueGoal: t('revenueGoal', { amount: format.number(REVENUE_TARGET) }),
		bars,
		chartLabel: `${t('revenueByMonth')}: ${visibleMonths
			.map(
				month => `${t(month.month)} ${format.number(month.value)} ${thousands}`,
			)
			.join(', ')}`,
		paymentMethods: REVENUE_BY_METHOD.map(item => ({
			id: item.method,
			name: paymentMethods.byId(item.method).name,
			percent: item.percent,
			barPercent: (item.percent / LARGEST_PERCENT) * 100,
			barClass: paymentMethods.byId(item.method).barClass,
		})),
		doctors: DOCTOR_PERFORMANCE.map(performance => {
			const doctor = DOCTORS[performance.doctorId]
			const name = format.name(doctor.fullName)
			return {
				id: performance.doctorId,
				name,
				initials: getInitials(name),
				tone: doctor.tone,
				specialty: t(doctor.specialty),
				visits: format.number(performance.visits[range]),
				revenue: t('millions', {
					value: format.number(performance.revenue[range]),
				}),
				planConsent: performance.planConsent,
				chairLoad: performance.chairLoad,
			}
		}),
	}
}

export type TReportModel = ReturnType<typeof useReport>
