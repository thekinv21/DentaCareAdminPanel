'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'

import { type ToolId, TOOLS } from '../model/Teeth'
import { Swatch } from './Swatch'

export function ChartToolbar({
	tool,
	onChange,
}: {
	tool: ToolId
	onChange: (tool: ToolId) => void
}) {
	const t = useTranslations('DentalChart')
	return (
		<div
			role='toolbar'
			aria-label={t('markupTools')}
			className='flex flex-wrap gap-1.5'
		>
			{TOOLS.map(item => {
				const active = item.id === tool
				return (
					<button
						key={item.id}
						type='button'
						title={t(item.hint)}
						aria-pressed={active}
						onClick={() => onChange(item.id)}
						className={cn(
							'inline-flex h-8.5 items-center gap-2 rounded-[10px] border px-2.5 text-[13px] font-semibold transition-[background-color,border-color,box-shadow] duration-150',
							active
								? 'border-brand bg-brand-soft text-brand-strong shadow-[0_0_0_1px_var(--brand)]'
								: 'border-line bg-surface hover:bg-raised',
						)}
					>
						<Swatch className={item.swatch} />
						{t(item.label)}
					</button>
				)
			})}
		</div>
	)
}
