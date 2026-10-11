import { useTranslations } from 'next-intl'

import type { TChartCounts } from '../model/ChartActions'
import type { TToolId } from '../model/Teeth'
import { getToolSwatchClass, Swatch } from './Swatch'

const SUMMARY_ITEMS: {
	key: keyof TChartCounts
	label: string
	tool: TToolId
}[] = [
	{ key: 'car', label: 'caries', tool: 'car' },
	{ key: 'fill', label: 'fillings', tool: 'fill' },
	{ key: 'crown', label: 'crowns', tool: 'crown' },
	{ key: 'endo', label: 'rootCanals', tool: 'endo' },
	{ key: 'implant', label: 'implants', tool: 'implant' },
	{ key: 'extract', label: 'forExtraction', tool: 'extract' },
	{ key: 'missing', label: 'missing', tool: 'missing' },
]

type TChartSummaryProps = { counts: TChartCounts }

export function ChartSummary({ counts }: TChartSummaryProps) {
	const t = useTranslations('DentalChart')
	return (
		<ul className='flex flex-wrap gap-2 border-t border-line pt-3'>
			{SUMMARY_ITEMS.map(item => (
				<li
					key={item.key}
					className='inline-flex items-center gap-2 rounded-full bg-raised px-3 py-1.25 text-[13px]'
				>
					<Swatch className={getToolSwatchClass(item.tool)} />
					{t(item.label)}
					<span className='font-mono font-semibold'>{counts[item.key]}</span>
				</li>
			))}
		</ul>
	)
}
