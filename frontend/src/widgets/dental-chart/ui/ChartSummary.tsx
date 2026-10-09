'use client'

import { useTranslations } from 'next-intl'

import type { summarize } from '../model/ChartActions'
import type { TToolId } from '../model/Teeth'
import { Swatch, swatchOf } from './Swatch'

type TCounts = ReturnType<typeof summarize>

const ITEMS: { key: keyof TCounts; label: string; tool: TToolId }[] = [
	{ key: 'car', label: 'caries', tool: 'car' },
	{ key: 'fill', label: 'fillings', tool: 'fill' },
	{ key: 'crown', label: 'crowns', tool: 'crown' },
	{ key: 'endo', label: 'rootCanals', tool: 'endo' },
	{ key: 'implant', label: 'implants', tool: 'implant' },
	{ key: 'extract', label: 'forExtraction', tool: 'extract' },
	{ key: 'missing', label: 'missing', tool: 'missing' },
]

type TChartSummaryProps = { counts: TCounts }

export function ChartSummary({ counts }: TChartSummaryProps) {
	const t = useTranslations('DentalChart')
	return (
		<ul className='flex flex-wrap gap-2 border-t border-line pt-3'>
			{ITEMS.map(item => (
				<li
					key={item.key}
					className='inline-flex items-center gap-2 rounded-full bg-raised px-3 py-1.25 text-[13px]'
				>
					<Swatch className={swatchOf(item.tool)} />
					{t(item.label)}
					<span className='font-mono font-semibold'>{counts[item.key]}</span>
				</li>
			))}
		</ul>
	)
}
