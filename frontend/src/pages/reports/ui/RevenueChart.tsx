'use client'

import { useFormat } from '@/shared/lib/i18n'

import { CHART, chartY, GRID_VALUES } from '../lib/ChartGeometry'
import { REVENUE_TARGET } from '../model/Report'
import type { ReportModel } from '../model/useReport'

type TRevenueChartProps = {
	bars: ReportModel['bars']
	label: string
}

export function RevenueChart({ bars, label }: TRevenueChartProps) {
	const format = useFormat()
	return (
		<svg
			viewBox='0 0 640 250'
			role='img'
			aria-label={label}
			className='h-auto w-full overflow-visible'
		>
			{GRID_VALUES.map(value => (
				<g key={value}>
					<line
						x1={CHART.left}
						x2={CHART.right}
						y1={chartY(value)}
						y2={chartY(value)}
						stroke='var(--line)'
						strokeDasharray='3 4'
					/>
					<text
						x='0'
						y={chartY(value) + 4}
						fontSize='11'
						fill='var(--ink-subtle)'
						className='font-mono'
					>
						{format.number(value)}
					</text>
				</g>
			))}
			<line
				x1={CHART.left}
				x2={CHART.right}
				y1={CHART.base}
				y2={CHART.base}
				stroke='var(--line-strong)'
			/>
			<text
				x='30'
				y={CHART.base + 4}
				fontSize='11'
				fill='var(--ink-subtle)'
				className='font-mono'
			>
				0
			</text>
			{bars.map(bar => (
				<g key={bar.key}>
					<rect
						x={bar.x}
						y={bar.y}
						width={bar.width}
						height={bar.height}
						rx='5'
						fill={bar.fill}
						className='origin-bottom animate-growy transition-opacity duration-150 transform-fill hover:opacity-80'
						style={{ animationDelay: `${bar.delay}ms` }}
					>
						<title>{bar.title}</title>
					</rect>
					<text
						x={bar.center}
						y='230'
						fontSize='11'
						textAnchor='middle'
						fill='var(--ink-subtle)'
						className='font-mono'
					>
						{bar.month}
					</text>
				</g>
			))}
			<line
				x1={CHART.left}
				x2={CHART.right}
				y1={chartY(REVENUE_TARGET)}
				y2={chartY(REVENUE_TARGET)}
				stroke='var(--accent)'
				strokeWidth='2'
				strokeDasharray='6 5'
			/>
		</svg>
	)
}
