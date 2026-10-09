'use client'

import type { AppointmentStatus } from '@/entities/appointment'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'

import type { CalendarModel } from '../model/use-calendar'

const CHIP: Record<AppointmentStatus, string> = {
	done: 'bg-raised text-ink-muted',
	chair: 'bg-brand text-on-brand',
	next: 'bg-accent-soft text-accent',
	confirmed: 'bg-brand-soft text-brand-strong',
	pending: 'bg-warning-soft text-warning',
	noshow: 'bg-danger-soft text-danger',
}

const GRID = 'grid grid-cols-[repeat(7,minmax(110px,1fr))] gap-1.5'

export function MonthGrid({ calendar }: { calendar: CalendarModel }) {
	const { t, format } = useI18n()
	return (
		<div className='min-w-[800px] animate-fade'>
			<div className='sticky top-0 z-[6] bg-surface pb-2'>
				<div className={GRID}>
					{calendar.weekdayNames.map(name => (
						<span
							key={name}
							className='px-1.5 py-0.5 text-[11px] font-semibold tracking-[0.06em] text-ink-muted uppercase'
						>
							{name}
						</span>
					))}
				</div>
			</div>
			<div className={GRID}>
				{calendar.monthDays.map(day => (
					<button
						key={day.iso}
						type='button'
						onClick={() => calendar.openDay(day.iso)}
						aria-label={`${format.date(day.iso, { day: 'numeric', month: 'long' })}, ${t('записей:')} ${day.events.length}`}
						className={cn(
							'flex min-h-28 flex-col items-stretch gap-[3px] rounded-xl border p-1.5 text-left transition-colors duration-150 hover:border-brand hover:bg-raised',
							!day.inMonth && 'border-line bg-transparent opacity-45',
							day.inMonth &&
								day.isToday &&
								'border-brand bg-surface shadow-[0_0_0_1px_var(--brand)]',
							day.inMonth &&
								!day.isToday &&
								(day.closed
									? 'border-line bg-raised'
									: 'border-line bg-surface'),
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
								{day.day}
							</span>
							{day.events.length > 0 && (
								<span className='font-mono text-[11px] text-ink-muted'>
									{day.events.length}
								</span>
							)}
						</span>
						{day.events.slice(0, 3).map(event => (
							<span
								key={event.key}
								className={cn(
									'block truncate rounded-md px-1.5 text-[11.5px] leading-[18px]',
									CHIP[event.status],
								)}
							>
								<span className='font-mono'>{event.time}</span>{' '}
								{format.name(event.who)}
							</span>
						))}
						{day.events.length > 3 && (
							<span className='px-1.5 text-[11.5px] font-semibold text-brand'>
								{t('+{n} ещё', { n: day.events.length - 3 })}
							</span>
						)}
						{day.closed && (
							<span className='px-1.5 text-[11.5px] text-ink-subtle'>
								{t('Выходной')}
							</span>
						)}
					</button>
				))}
			</div>
		</div>
	)
}
