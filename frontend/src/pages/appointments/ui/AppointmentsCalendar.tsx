'use client'

import { type CSSProperties, useState } from 'react'

import Link from 'next/link'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import {
	APPOINTMENT_BLOCK_CLASS,
	APPOINTMENT_LEGEND,
	APPOINTMENT_STATUS,
	type AppointmentStatus,
	type DoctorKey,
	NOW_TIME,
	TODAY,
	toMinutes,
} from '@/entities/appointment'
import { DOCTORS } from '@/entities/employee'

import { cn } from '@/shared/lib/cn'
import { ROUTES } from '@/shared/routes'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { IconButton } from '@/shared/ui/icon-button'
import { Legend } from '@/shared/ui/legend'
import { Segmented } from '@/shared/ui/segmented'

import {
	addDays,
	addMonths,
	type CalendarEvent,
	DAY_START,
	eventsForDay,
	GRID_HEIGHT,
	GRID_HOURS,
	HOUR_HEIGHT,
	MONTHS,
	MONTHS_GENITIVE,
	placeEvents,
	toDate,
	toIso,
	weekday,
	WEEKDAYS,
	WEEKDAYS_SHORT,
} from '../lib/calendar'

type View = 'day' | 'week' | 'month'

const VIEWS: { id: View; label: string }[] = [
	{ id: 'day', label: 'День' },
	{ id: 'week', label: 'Неделя' },
	{ id: 'month', label: 'Месяц' },
]

const DOCTOR_KEYS: DoctorKey[] = ['kas', 'pet', 'tok']
const DOCTOR_DOT: Record<string, string> = {
	brand: 'bg-brand',
	info: 'bg-info',
	accent: 'bg-accent',
}

const MONTH_CHIP: Record<AppointmentStatus, string> = {
	done: 'bg-raised text-ink-muted',
	chair: 'bg-brand text-on-brand',
	next: 'bg-accent-soft text-accent',
	confirmed: 'bg-brand-soft text-brand-strong',
	pending: 'bg-warning-soft text-warning',
	noshow: 'bg-danger-soft text-danger',
}

const NOW_TOP = ((toMinutes(NOW_TIME) - DAY_START) * HOUR_HEIGHT) / 60

const COLUMN_STYLE: CSSProperties = {
	height: GRID_HEIGHT,
	backgroundImage:
		'linear-gradient(to bottom, var(--line) 1px, transparent 1px), linear-gradient(to bottom, transparent 27px, var(--sunken) 27px, var(--sunken) 28px, transparent 28px)',
	backgroundSize: `100% ${HOUR_HEIGHT}px`,
	backgroundPosition: '0 -1px',
}

interface Column {
	key: string
	overline: string
	title: string
	caption: string
	aria: string
	isToday: boolean
	showNow: boolean
	events: CalendarEvent[]
	onPick?: () => void
}

function EventBlock({
	placed,
}: {
	placed: ReturnType<typeof placeEvents>[number]
}) {
	const { event, top, height, lane, lanes, end } = placed
	const width = 100 / lanes
	return (
		<Link
			href={event.patientId ? ROUTES.patient(event.patientId) : ROUTES.patients}
			title={`${event.who} · ${event.what} · ${event.time}–${end} · Кресло ${event.chair}`}
			className={cn(
				'absolute z-[1] flex flex-col overflow-hidden rounded-[9px] px-[7px] py-1 no-underline transition-[transform,box-shadow] duration-150 hover:z-[4] hover:-translate-y-px hover:shadow-float',
				APPOINTMENT_BLOCK_CLASS[event.status],
			)}
			style={{
				top,
				height,
				left: `calc(${(lane * width).toFixed(2)}% + 3px)`,
				width: `calc(${width.toFixed(2)}% - 6px)`,
			}}
		>
			<span className='font-mono text-[10.5px] leading-[14px] opacity-90'>
				{event.time}–{end}
			</span>
			<span className='truncate text-[12.5px] leading-4 font-semibold'>
				{event.who}
			</span>
			{event.duration >= 45 && (
				<span className='truncate text-[11.5px] leading-[15px] opacity-90'>
					{event.what} · {DOCTORS[event.doctorId].shortName}
				</span>
			)}
		</Link>
	)
}

function TimeGrid({
	columns,
	minColumn,
}: {
	columns: Column[]
	minColumn: number
}) {
	const gridStyle: CSSProperties = {
		display: 'grid',
		gridTemplateColumns: `52px repeat(${columns.length}, minmax(${minColumn}px, 1fr))`,
		gap: 6,
	}
	return (
		<div
			className='animate-fade'
			style={{ minWidth: columns.length === 4 ? 700 : 780 }}
		>
			<div className='sticky top-0 z-[6] bg-surface pb-2'>
				<div style={gridStyle}>
					<span />
					{columns.map(column => (
						<button
							key={column.key}
							type='button'
							aria-label={column.aria}
							onClick={column.onPick}
							className={cn(
								'flex w-full flex-col items-center rounded-xl border-0 px-1 py-1.5 transition-colors duration-150',
								column.isToday
									? 'bg-brand text-on-brand shadow-brand'
									: 'bg-raised text-ink hover:bg-sunken',
							)}
						>
							<span className='text-[11px] leading-[14px] font-semibold tracking-[0.05em] uppercase opacity-85'>
								{column.overline}
							</span>
							<span className='font-display text-[17px] leading-[22px] font-extrabold'>
								{column.title}
							</span>
							<span className='text-[11.5px] leading-[15px] opacity-85'>
								{column.caption}
							</span>
						</button>
					))}
				</div>
			</div>
			<div style={gridStyle}>
				<div className='relative' style={{ height: GRID_HEIGHT }}>
					{GRID_HOURS.map((hour, i) => (
						<span
							key={hour}
							className={cn(
								'absolute right-1.5 font-mono text-[11px] leading-[14px] text-ink-subtle',
								i === 0
									? ''
									: i === GRID_HOURS.length - 1
										? '-translate-y-full'
										: '-translate-y-1/2',
							)}
							style={{ top: i * HOUR_HEIGHT }}
						>
							{hour}
						</span>
					))}
				</div>
				{columns.map(column => (
					<div
						key={column.key}
						className={cn(
							'relative rounded-xl border border-line',
							column.isToday ? 'bg-raised' : 'bg-surface',
						)}
						style={COLUMN_STYLE}
					>
						{placeEvents(column.events).map(placed => (
							<EventBlock key={placed.event.key} placed={placed} />
						))}
						{column.showNow && (
							<div
								aria-hidden='true'
								className='pointer-events-none absolute right-0 left-0 z-[5] h-0.5 bg-accent'
								style={{ top: NOW_TOP }}
							>
								<span className='absolute -top-1 -left-[5px] size-2.5 animate-blink rounded-full bg-accent' />
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

function MonthGrid({
	cursor,
	filter,
	onPickDay,
}: {
	cursor: string
	filter: (events: CalendarEvent[]) => CalendarEvent[]
	onPickDay: (iso: string) => void
}) {
	const base = toDate(cursor)
	const first = toIso(
		new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), 1)),
	)
	const nextFirst = addMonths(first, 1)
	const days: string[] = []
	for (
		let day = addDays(first, -weekday(first));
		day < nextFirst || weekday(day) !== 0;
		day = addDays(day, 1)
	) {
		days.push(day)
	}

	return (
		<div className='min-w-[800px] animate-fade'>
			<div className='sticky top-0 z-[6] bg-surface pb-2'>
				<div className='grid grid-cols-[repeat(7,minmax(110px,1fr))] gap-1.5'>
					{WEEKDAYS_SHORT.map(day => (
						<span
							key={day}
							className='px-1.5 py-0.5 text-[11px] font-semibold tracking-[0.06em] text-ink-muted uppercase'
						>
							{day}
						</span>
					))}
				</div>
			</div>
			<div className='grid grid-cols-[repeat(7,minmax(110px,1fr))] gap-1.5'>
				{days.map(iso => {
					const date = toDate(iso)
					const inMonth = date.getUTCMonth() === base.getUTCMonth()
					const isToday = iso === TODAY
					const closed = inMonth && weekday(iso) === 6
					const events = inMonth ? filter(eventsForDay(iso)) : []
					return (
						<button
							key={iso}
							type='button'
							onClick={() => onPickDay(iso)}
							aria-label={`${date.getUTCDate()} ${MONTHS_GENITIVE[date.getUTCMonth()]}, записей: ${events.length}`}
							className={cn(
								'flex min-h-28 flex-col items-stretch gap-[3px] rounded-xl border p-1.5 text-left transition-colors duration-150 hover:border-brand hover:bg-raised',
								!inMonth && 'border-line bg-transparent opacity-45',
								inMonth &&
									isToday &&
									'border-brand bg-surface shadow-[0_0_0_1px_var(--brand)]',
								inMonth &&
									!isToday &&
									(closed ? 'border-line bg-raised' : 'border-line bg-surface'),
							)}
						>
							<span className='flex items-center justify-between gap-1'>
								<span
									className={cn(
										'font-display text-sm font-extrabold',
										isToday &&
											'inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-brand text-on-brand',
									)}
								>
									{date.getUTCDate()}
								</span>
								{events.length > 0 && (
									<span className='font-mono text-[11px] text-ink-muted'>
										{events.length}
									</span>
								)}
							</span>
							{events.slice(0, 3).map(event => (
								<span
									key={event.key}
									className={cn(
										'block truncate rounded-md px-1.5 text-[11.5px] leading-[18px]',
										MONTH_CHIP[event.status],
									)}
								>
									<span className='font-mono'>{event.time}</span> {event.who}
								</span>
							))}
							{events.length > 3 && (
								<span className='px-1.5 text-[11.5px] font-semibold text-brand'>
									+{events.length - 3} ещё
								</span>
							)}
							{closed && (
								<span className='px-1.5 text-[11.5px] text-ink-subtle'>
									Выходной
								</span>
							)}
						</button>
					)
				})}
			</div>
		</div>
	)
}

export function AppointmentsCalendar() {
	const [view, setView] = useState<View>('week')
	const [cursor, setCursor] = useState(TODAY)
	const [hidden, setHidden] = useState<Set<DoctorKey>>(new Set())

	const visible = (events: CalendarEvent[]) =>
		events.filter(event => !hidden.has(event.doctorId))
	const openDay = (iso: string) => {
		setView('day')
		setCursor(iso)
	}

	const cursorDate = toDate(cursor)
	let title = ''
	let total = 0
	let columns: Column[] = []

	if (view === 'day') {
		const events = visible(eventsForDay(cursor))
		total = events.length
		title = `${WEEKDAYS[weekday(cursor)]}, ${cursorDate.getUTCDate()} ${MONTHS_GENITIVE[cursorDate.getUTCMonth()]}`
		columns = [1, 2, 3, 4].map(chair => {
			const doctor = DOCTORS[chair === 1 ? 'kas' : chair === 2 ? 'pet' : 'tok']
			const chairEvents = events.filter(event => event.chair === chair)
			return {
				key: `chair-${chair}`,
				overline: `Кресло ${chair}`,
				title: doctor.shortName,
				caption: `${chairEvents.length} записей`,
				aria: `Кресло ${chair}`,
				isToday: false,
				showNow: cursor === TODAY,
				events: chairEvents,
			}
		})
	} else if (view === 'week') {
		const monday = addDays(cursor, -weekday(cursor))
		const days = [0, 1, 2, 3, 4, 5].map(offset => addDays(monday, offset))
		columns = days.map(iso => {
			const date = toDate(iso)
			const events = visible(eventsForDay(iso))
			total += events.length
			return {
				key: iso,
				overline: WEEKDAYS_SHORT[weekday(iso)],
				title: String(date.getUTCDate()),
				caption: events.length ? `${events.length} зап.` : '—',
				aria: `${WEEKDAYS[weekday(iso)]}, ${date.getUTCDate()} ${MONTHS_GENITIVE[date.getUTCMonth()]}: открыть день`,
				isToday: iso === TODAY,
				showNow: iso === TODAY,
				events,
				onPick: () => openDay(iso),
			}
		})
		const first = toDate(days[0])
		const last = toDate(days[5])
		const sameMonth = first.getUTCMonth() === last.getUTCMonth()
		title = `${first.getUTCDate()}${sameMonth ? '' : ` ${MONTHS_GENITIVE[first.getUTCMonth()]}`} – ${last.getUTCDate()} ${MONTHS_GENITIVE[last.getUTCMonth()]} ${last.getUTCFullYear()}`
	} else {
		title = `${MONTHS[cursorDate.getUTCMonth()]} ${cursorDate.getUTCFullYear()}`
		const first = toIso(
			new Date(
				Date.UTC(cursorDate.getUTCFullYear(), cursorDate.getUTCMonth(), 1),
			),
		)
		for (
			let day = first;
			toDate(day).getUTCMonth() === cursorDate.getUTCMonth();
			day = addDays(day, 1)
		) {
			total += visible(eventsForDay(day)).length
		}
	}

	const shift = (direction: 1 | -1) =>
		setCursor(current =>
			view === 'month'
				? addMonths(current, direction)
				: addDays(current, direction * (view === 'day' ? 1 : 7)),
		)

	const toggleDoctor = (key: DoctorKey) =>
		setHidden(current => {
			const next = new Set(current)
			if (next.has(key)) next.delete(key)
			else next.add(key)
			return next
		})

	return (
		<Card
			as='section'
			aria-label='Календарь'
			className='min-h-0 flex-auto animate-rise gap-3 px-[18px] py-4 max-[720px]:h-[720px] max-[720px]:flex-none'
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<div className='flex flex-wrap items-center gap-1.5'>
					<IconButton
						aria-label='Назад'
						className='h-9 min-w-9'
						onClick={() => shift(-1)}
					>
						<ChevronLeft size={16} strokeWidth={2.2} aria-hidden='true' />
					</IconButton>
					<IconButton
						aria-label='Вперёд'
						className='h-9 min-w-9'
						onClick={() => shift(1)}
					>
						<ChevronRight size={16} strokeWidth={2.2} aria-hidden='true' />
					</IconButton>
					<Button size='sm' onClick={() => setCursor(TODAY)}>
						Сегодня
					</Button>
					<h2
						aria-live='polite'
						className='ml-2 font-display text-lg leading-6 font-extrabold tracking-[-0.01em]'
					>
						{title}
					</h2>
				</div>
				<Segmented
					aria-label='Вид'
					options={VIEWS}
					value={view}
					onChange={setView}
				/>
			</div>

			<div className='flex flex-wrap items-center gap-2'>
				<span className='mr-1 text-[12.5px] text-ink-muted'>Врачи</span>
				{DOCTOR_KEYS.map(key => {
					const doctor = DOCTORS[key]
					const on = !hidden.has(key)
					return (
						<button
							key={key}
							type='button'
							aria-pressed={on}
							onClick={() => toggleDoctor(key)}
							className={cn(
								'inline-flex h-8 items-center gap-[7px] rounded-full border px-3 text-[13px] font-semibold transition-colors duration-150',
								on
									? 'border-line-strong bg-surface text-ink'
									: 'border-transparent bg-sunken text-ink-muted',
							)}
						>
							<span
								className={cn(
									'size-[9px] rounded-full',
									DOCTOR_DOT[doctor.color],
									!on && 'opacity-35',
								)}
							/>
							{doctor.shortName}
						</button>
					)
				})}
				<span className='flex-grow' />
				<span className='text-[12.5px] text-ink-muted'>
					Всего записей: {total}
				</span>
			</div>

			<div className='-mx-[18px] min-h-0 flex-auto overflow-auto px-[18px] pb-1 scrollbar-thin'>
				{view === 'month' ? (
					<MonthGrid cursor={cursor} filter={visible} onPickDay={openDay} />
				) : (
					<TimeGrid columns={columns} minColumn={view === 'day' ? 150 : 118} />
				)}
			</div>

			<Legend
				className='border-t border-line pt-2.5'
				items={[
					...APPOINTMENT_LEGEND.map(item => ({
						label: APPOINTMENT_STATUS[item.status].label,
						swatch: item.swatch,
					})),
					{
						label: `Сейчас · ${NOW_TIME}`,
						swatch: 'h-0.5 w-3.5 rounded-none bg-accent',
					},
				]}
			/>
		</Card>
	)
}
