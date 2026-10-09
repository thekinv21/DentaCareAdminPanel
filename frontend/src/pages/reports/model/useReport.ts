'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { REVENUE_BY_METHOD, usePaymentMethods } from '@/entities/invoice'

import { useFormat } from '@/shared/lib/i18n'

import { barLayout, CHART, chartY } from '../lib/ChartGeometry'
import {
	DOCTOR_PERFORMANCE,
	MONTHLY_REVENUE,
	RANGE_KPI,
	RANGE_LABEL,
	type ReportRange,
	REVENUE_TARGET,
} from './Report'

const TOP_SHARE = Math.max(...REVENUE_BY_METHOD.map(item => item.percent))

/**
 * Report period switch and everything derived from it
 */
export function useReport() {
	const t = useTranslations('Reports')
	const methods = usePaymentMethods()
	const format = useFormat()
	const [range, setRange] = useState<ReportRange>('year')
	const data = range === 'year' ? MONTHLY_REVENUE : MONTHLY_REVENUE.slice(6)
	const total = data.reduce((sum, d) => sum + d.value, 0)
	const place = barLayout(data.length)
	const thousands = t('kSom')

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
			{ id: 'half' as const, label: t('n6Months') },
			{ id: 'year' as const, label: t('n12Months') },
		],
		rangeLabel: t(RANGE_LABEL[range]),
		revenue: `${(total / 1000).toFixed(1).replace('.', ',')} ${t('mSom')}`,
		kpi: RANGE_KPI[range],
		bars,
		chartLabel: `${t('revenueByMonth')}: ${data.map(d => `${t(d.month)} ${format.number(d.value)} ${thousands}`).join(', ')}`,
		methods: REVENUE_BY_METHOD.map(item => ({
			id: item.method,
			name: methods.byId(item.method).name,
			percent: item.percent,
			bar: (item.percent / TOP_SHARE) * 100,
			barClass: methods.byId(item.method).barClass,
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
