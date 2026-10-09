import { formatNumber } from '@/shared/lib/format'

import { MONTHLY_REVENUE, REVENUE_TARGET } from '../model/report'

const CHART = { left: 44, right: 640, base: 210, top: 15, max: 3000 }
const GRID = [3000, 2000, 1000]

const y = (value: number) =>
	CHART.base - (value / CHART.max) * (CHART.base - CHART.top)

export function RevenueChart({ data }: { data: typeof MONTHLY_REVENUE }) {
	const slot = (CHART.right - CHART.left) / data.length
	const barWidth = Math.min(34, slot * 0.6)
	const aria = `Выручка по месяцам: ${data.map(d => `${d.month} ${d.value} тыс. сом`).join(', ')}`

	return (
		<svg
			viewBox='0 0 640 250'
			role='img'
			aria-label={aria}
			className='h-auto w-full overflow-visible'
		>
			{GRID.map(value => (
				<g key={value}>
					<line
						x1={CHART.left}
						x2={CHART.right}
						y1={y(value)}
						y2={y(value)}
						stroke='var(--line)'
						strokeDasharray='3 4'
					/>
					<text
						x='0'
						y={y(value) + 4}
						fontSize='11'
						fill='var(--ink-subtle)'
						className='font-mono'
					>
						{formatNumber(value)}
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
			{data.map((d, i) => {
				const x = CHART.left + i * slot + (slot - barWidth) / 2
				const top = y(d.value)
				return (
					<g key={d.month}>
						<rect
							x={x}
							y={top}
							width={barWidth}
							height={CHART.base - top}
							rx='5'
							fill={d.value >= REVENUE_TARGET ? 'var(--brand)' : 'var(--info)'}
							className='origin-bottom animate-growy transition-opacity duration-150 [transform-box:fill-box] hover:opacity-80'
							style={{ animationDelay: `${i * 40}ms` }}
						>
							<title>{`${d.month} · ${formatNumber(d.value)} тыс. сом`}</title>
						</rect>
						<text
							x={x + barWidth / 2}
							y='230'
							fontSize='11'
							textAnchor='middle'
							fill='var(--ink-subtle)'
							className='font-mono'
						>
							{d.month}
						</text>
					</g>
				)
			})}
			<line
				x1={CHART.left}
				x2={CHART.right}
				y1={y(REVENUE_TARGET)}
				y2={y(REVENUE_TARGET)}
				stroke='var(--accent)'
				strokeWidth='2'
				strokeDasharray='6 5'
			/>
		</svg>
	)
}
