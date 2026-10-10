'use client'

import { useTranslations } from 'next-intl'

import type { TAppointmentStatus } from '@/entities/appointment'

import { cn } from '@/shared/lib/cn'
import { useFormat } from '@/shared/lib/i18n'

import type { TCalendarEvent } from '../lib/Schedule'
import type { TMonthDay } from '../model/useCalendarMonthDays'

const MAX_VISIBLE_EVENTS = 3

const STATUS_CHIP_CLASS: Record<TAppointmentStatus, string> = {
	done: 'bg-raised text-ink-muted',
	chair: 'bg-brand text-on-brand',
	next: 'bg-accent-soft text-accent',
	confirmed: 'bg-brand-soft text-brand-strong',
	pending: 'bg-warning-soft text-warning',
	noshow: 'bg-danger-soft text-danger',
}

type TMonthDayCellProps = {
	day: TMonthDay
	onOpen: (iso: string) => void
}

/**
 * One day of the month grid: its number, the first events and a "more" line
 */
export function MonthDayCell({ day, onOpen }: TMonthDayCellProps) {
	const t = useTranslations('Appointments')
	const format = useFormat()
	const hiddenCount = day.events.length - MAX_VISIBLE_EVENTS

	return (
		<button
			type='button'
			onClick={() => onOpen(day.iso)}
			aria-label={`${format.date(day.iso, { day: 'numeric', month: 'long' })}, ${t('appointmentsLabel')} ${day.events.length}`}
			className={cn(
				'flex min-h-28 flex-col items-stretch gap-0.75 rounded-xl border p-1.5 text-left transition-colors duration-150 hover:border-brand hover:bg-raised',
				!day.isInMonth && 'border-line bg-transparent opacity-45',
				day.isInMonth &&
					day.isToday &&
					'border-brand bg-surface shadow-[0_0_0_1px_var(--brand)]',
				day.isInMonth &&
					!day.isToday &&
					(day.isClosed ? 'border-line bg-raised' : 'border-line bg-surface'),
			)}
		>
			<span className='flex items-center justify-between gap-1'>
				<span
					className={cn(
						'font-display text-sm font-extrabold',
						day.isToday &&
							'inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-brand text-on-brand',
					)}
				>
					{day.dayNumber}
				</span>
				{day.events.length > 0 && (
					<span className='font-mono text-[11px] text-ink-muted'>
						{day.events.length}
					</span>
				)}
			</span>
			{day.events.slice(0, MAX_VISIBLE_EVENTS).map(event => (
				<MonthDayEvent key={event.key} event={event} />
			))}
			{hiddenCount > 0 && (
				<span className='px-1.5 text-[11.5px] font-semibold text-brand'>
					{t('more', { n: hiddenCount })}
				</span>
			)}
			{day.isClosed && (
				<span className='px-1.5 text-[11.5px] text-ink-subtle'>
					{t('dayOff')}
				</span>
			)}
		</button>
	)
}

type TMonthDayEventProps = { event: TCalendarEvent }

function MonthDayEvent({ event }: TMonthDayEventProps) {
	const format = useFormat()

	return (
		<span
			className={cn(
				'block truncate rounded-md px-1.5 text-[11.5px] leading-4.5',
				STATUS_CHIP_CLASS[event.status],
			)}
		>
			<span className='font-mono'>{event.time}</span>{' '}
			{format.name(event.patientName)}
		</span>
	)
}
