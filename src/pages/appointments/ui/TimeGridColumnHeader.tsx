import { cn } from '@/shared/lib/cn'

import type { TCalendarColumn } from '../model/useCalendarColumns'

type TTimeGridColumnHeaderProps = {
	column: TCalendarColumn
	onOpenDay: (iso: string) => void
}

export function TimeGridColumnHeader({
	column,
	onOpenDay,
}: TTimeGridColumnHeaderProps) {
	const { iso } = column

	return (
		<button
			type='button'
			aria-label={column.ariaLabel}
			onClick={iso ? () => onOpenDay(iso) : undefined}
			className={cn(
				'flex w-full flex-col items-center rounded-xl border-0 px-1 py-1.5 transition-colors duration-150',
				column.isToday
					? 'bg-brand text-on-brand shadow-brand'
					: 'bg-raised text-ink hover:bg-sunken',
			)}
		>
			<span className='text-[11px] leading-3.5 font-semibold tracking-wider uppercase opacity-85'>
				{column.overline}
			</span>
			<span className='font-display text-[17px] leading-5.5 font-extrabold'>
				{column.title}
			</span>
			<span className='text-[11.5px] leading-3.75 opacity-85'>
				{column.caption}
			</span>
		</button>
	)
}
