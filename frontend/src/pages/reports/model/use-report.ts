'use client'

import { useState } from 'react'

import { PAYMENT_METHODS, REVENUE_BY_METHOD } from '@/entities/invoice'

import { useI18n } from '@/shared/lib/i18n'

import { barLayout, CHART, chartY } from '../lib/chart-geometry'
import {
	DOCTOR_PERFORMANCE,
	MONTHLY_REVENUE,
	RANGE_KPI,
	RANGE_LABEL,
	type ReportRange,
	REVENUE_TARGET,
} from './report'

const TOP_SHARE = Math.max(...REVENUE_BY_METHOD.map(item => item.percent))

/**
 * Report period switch and everything derived from it
 */
export function useReport() {
	const { t, format } = useI18n()
	const [range, setRange] = useState<ReportRange>('year')
	const data = range === 'year' ? MONTHLY_REVENUE : MONTHLY_REVENUE.slice(6)
	const total = data.reduce((sum, d) => sum + d.value, 0)
	const place = barLayout(data.length)
	const thousands = t('тыс. сом')

	const bars = data.map((d, index) => {
		const { x, width, center } = place(index)
		const top = chartY(d.value)
		const month = t(d.month)
		return {
			key: d.month,
			month,
			x,
			y: top,
			width,
			height: CHART.base - top,
			center,
			fill: d.value >= REVENUE_TARGET ? 'var(--brand)' : 'var(--info)',
			title: `${month} · ${format.number(d.value)} ${thousands}`,
			delay: index * 40,
		}
	})

	return {
		range,
		setRange,
		ranges: [
			{ id: 'half' as const, label: t('6 месяцев') },
			{ id: 'year' as const, label: t('12 месяцев') },
		],
		rangeLabel: t(RANGE_LABEL[range]),
		revenue: `${(total / 1000).toFixed(1).replace('.', ',')} ${t('млн сом')}`,
		kpi: RANGE_KPI[range],
		bars,
		chartLabel: `${t('Выручка по месяцам')}: ${data.map(d => `${t(d.month)} ${format.number(d.value)} ${thousands}`).join(', ')}`,
		methods: REVENUE_BY_METHOD.map(item => ({
			id: item.method,
			name: t(PAYMENT_METHODS[item.method].name),
			percent: item.percent,
			bar: (item.percent / TOP_SHARE) * 100,
			barClass: PAYMENT_METHODS[item.method].barClass,
		})),
		doctors: DOCTOR_PERFORMANCE.map(doctor => ({
			...doctor,
			initials: t(doctor.initials),
			name: format.name(doctor.name),
			specialty: t(doctor.specialty),
			visits: doctor.visits[range],
			revenue: t(doctor.revenue[range]),
		})),
	}
}

export type ReportModel = ReturnType<typeof useReport>
