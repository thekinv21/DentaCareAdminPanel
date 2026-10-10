'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'

import { TOOLS, type TToolId } from '../model/Teeth'
import { Swatch } from './Swatch'

type TChartToolbarProps = {
	tool: TToolId
	onChange: (tool: TToolId) => void
}

export function ChartToolbar({ tool, onChange }: TChartToolbarProps) {
	const t = useTranslations('DentalChart')

	return (
		<div
			role='toolbar'
			aria-label={t('markupTools')}
			className='flex flex-wrap gap-1.5'
		>
			{TOOLS.map(item => (
				<ToolButton
					key={item.id}
					tool={item}
					isActive={item.id === tool}
					onSelect={() => onChange(item.id)}
				/>
			))}
		</div>
	)
}

type TToolButtonProps = {
	tool: (typeof TOOLS)[number]
	isActive: boolean
	onSelect: () => void
}

function ToolButton({ tool, isActive, onSelect }: TToolButtonProps) {
	const t = useTranslations('DentalChart')

	return (
		<button
			type='button'
			title={t(tool.hint)}
			aria-pressed={isActive}
			onClick={onSelect}
			className={cn(
				'inline-flex h-8.5 items-center gap-2 rounded-[10px] border px-2.5 text-[13px] font-semibold transition-[background-color,border-color,box-shadow] duration-150',
				isActive
					? 'border-brand bg-brand-soft text-brand-strong shadow-[0_0_0_1px_var(--brand)]'
					: 'border-line bg-surface hover:bg-raised',
			)}
		>
			<Swatch className={tool.swatch} />
			{t(tool.label)}
		</button>
	)
}
