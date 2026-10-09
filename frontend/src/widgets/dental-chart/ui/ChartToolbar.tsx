'use client'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'

import { type ToolId, TOOLS } from '../model/teeth'
import { Swatch } from './Swatch'

export function ChartToolbar({
	tool,
	onChange,
}: {
	tool: ToolId
	onChange: (tool: ToolId) => void
}) {
	const { t } = useI18n()
	return (
		<div
			role='toolbar'
			aria-label={t('Инструменты разметки')}
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
							'inline-flex h-[34px] items-center gap-2 rounded-[10px] border px-2.5 text-[13px] font-semibold transition-[background-color,border-color,box-shadow] duration-150',
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
