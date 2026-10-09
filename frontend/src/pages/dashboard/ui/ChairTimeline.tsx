import {
	APPOINTMENT_BLOCK_CLASS,
	APPOINTMENT_LEGEND,
	APPOINTMENT_STATUS,
	fromMinutes,
	NOW_TIME,
	shortPersonName,
	TODAY_APPOINTMENTS,
	toMinutes,
} from '@/entities/appointment'

import { cn } from '@/shared/lib/cn'
import { Card, CardHeader } from '@/shared/ui/card'
import { Legend } from '@/shared/ui/legend'
import { TableScroll } from '@/shared/ui/table'

const DAY_START = toMinutes('08:00')
const DAY_LENGTH = toMinutes('18:00') - DAY_START
const TICKS = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00']

const LANES = [
	{ chair: 1, doctor: 'Касымова А.' },
	{ chair: 2, doctor: 'Петров С.' },
	{ chair: 3, doctor: 'Токтогулов Э.' },
	{ chair: 4, doctor: 'Токтогулов Э.' },
]

const percent = (minutes: number) => ((minutes - DAY_START) / DAY_LENGTH) * 100

export function ChairTimeline() {
	const now = percent(toMinutes(NOW_TIME)) / 100
	let order = 0

	return (
		<Card
			as='section'
			className='animate-rise'
			style={{ animationDelay: '300ms' }}
		>
			<CardHeader
				title='Загрузка кресел'
				description={
					<>
						08:00 – 18:00 · сейчас{' '}
						<span className='font-mono font-semibold text-accent'>
							{NOW_TIME}
						</span>
					</>
				}
				actions={
					<Legend
						items={APPOINTMENT_LEGEND.map(item => ({
							label: APPOINTMENT_STATUS[item.status].label,
							swatch: item.swatch,
						}))}
					/>
				}
			/>
			<TableScroll>
				<div className='flex min-w-170 flex-col gap-2 pb-0.5'>
					<div className='relative ml-24 h-4 font-mono text-[11px] text-ink-subtle'>
						{TICKS.map((tick, i) => (
							<span
								key={tick}
								className={cn(
									'absolute top-0',
									i === 0
										? ''
										: i === TICKS.length - 1
											? '-translate-x-full'
											: '-translate-x-1/2',
								)}
								style={{ left: `${i * 20}%` }}
							>
								{tick}
							</span>
						))}
					</div>
					<div className='relative flex flex-col gap-2'>
						{LANES.map(lane => (
							<div key={lane.chair} className='flex items-center gap-3'>
								<div className='w-21 shrink-0'>
									<div className='font-semibold'>Кресло {lane.chair}</div>
									<div className='truncate text-[12.5px] leading-4.5 text-ink-muted'>
										{lane.doctor}
									</div>
								</div>
								<div className='relative h-10 grow rounded-xl bg-sunken bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px)] bg-size-[10%_100%] shadow-press'>
									{TODAY_APPOINTMENTS.filter(a => a.chair === lane.chair).map(
										a => {
											const start = toMinutes(a.time)
											const label = shortPersonName(a.patientName)
											const delay = 360 + order++ * 30
											return (
												<div
													key={a.id}
													title={`${label} · ${a.time}–${fromMinutes(start + a.duration)}`}
													className={cn(
														'absolute top-[5px] bottom-[5px] flex origin-left animate-grow items-center truncate rounded-[9px] px-2 text-xs font-semibold whitespace-nowrap',
														APPOINTMENT_BLOCK_CLASS[a.status],
													)}
													style={{
														left: `calc(${percent(start).toFixed(3)}% + 2px)`,
														width: `calc(${((a.duration / DAY_LENGTH) * 100).toFixed(3)}% - 4px)`,
														animationDelay: `${delay}ms`,
													}}
												>
													<span className='truncate'>{label}</span>
												</div>
											)
										},
									)}
								</div>
							</div>
						))}
						<div
							aria-hidden='true'
							className='absolute -top-1 -bottom-1 z-[2] -ml-px w-0.5 rounded-sm bg-accent'
							style={{ left: `calc(96px + (100% - 96px) * ${now.toFixed(4)})` }}
						>
							<span className='absolute -top-1 -left-1 size-2.5 animate-blink rounded-full bg-accent' />
						</div>
					</div>
				</div>
			</TableScroll>
		</Card>
	)
}
