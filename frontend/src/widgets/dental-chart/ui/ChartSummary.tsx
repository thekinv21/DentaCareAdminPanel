'use client'

import { useI18n } from '@/shared/lib/i18n'

import type { summarize } from '../model/chart-actions'
import type { ToolId } from '../model/teeth'
import { Swatch, swatchOf } from './Swatch'

type Counts = ReturnType<typeof summarize>

const ITEMS: { key: keyof Counts; label: string; tool: ToolId }[] = [
	{ key: 'car', label: 'Кариес', tool: 'car' },
	{ key: 'fill', label: 'Пломбы', tool: 'fill' },
	{ key: 'crown', label: 'Коронки', tool: 'crown' },
	{ key: 'endo', label: 'Каналы', tool: 'endo' },
	{ key: 'implant', label: 'Импланты', tool: 'implant' },
	{ key: 'extract', label: 'К удалению', tool: 'extract' },
	{ key: 'missing', label: 'Отсутствуют', tool: 'missing' },
]

export function ChartSummary({ counts }: { counts: Counts }) {
	const { t } = useI18n()
	return (
		<ul className='flex flex-wrap gap-2 border-t border-line pt-3'>
			{ITEMS.map(item => (
				<li
					key={item.key}
					className='inline-flex items-center gap-2 rounded-full bg-raised px-3 py-[5px] text-[13px]'
				>
					<Swatch className={swatchOf(item.tool)} />
					{t(item.label)}
					<span className='font-mono font-semibold'>{counts[item.key]}</span>
				</li>
			))}
		</ul>
	)
}
