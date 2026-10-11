import { cn } from '@/shared/lib/cn'

import type { TCalendarModel } from '../model/useCalendar'

type TDoctorFilterChipProps = {
	doctorFilter: TCalendarModel['doctorFilters'][number]
}

/**
 * Pressable dentist chip that shows or hides the dentist's appointments
 */
export function DoctorFilterChip({ doctorFilter }: TDoctorFilterChipProps) {
	return (
		<button
			type='button'
			aria-pressed={doctorFilter.isSelected}
			onClick={doctorFilter.toggle}
			className={cn(
				'inline-flex h-8 items-center gap-1.75 rounded-full border px-3 text-[13px] font-semibold transition-colors duration-150',
				doctorFilter.isSelected
					? 'border-line-strong bg-surface text-ink'
					: 'border-transparent bg-sunken text-ink-muted',
			)}
		>
			<span
				className={cn(
					'size-2.25 rounded-full',
					doctorFilter.dotClass,
					!doctorFilter.isSelected && 'opacity-35',
				)}
			/>
			{doctorFilter.name}
		</button>
	)
}
