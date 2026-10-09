'use client'

import { APPOINTMENT_BLOCK_CLASS } from '@/entities/appointment'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'
import { Card, CardHeader } from '@/shared/ui/card'
import { Legend } from '@/shared/ui/legend'
import { TableScroll } from '@/shared/ui/table'

import { useChairTimeline } from '../model/use-chair-timeline'

const TICK_SHIFT = {
	start: '',
	middle: '-translate-x-1/2',
	end: '-translate-x-full',
}

export function ChairTimeline() {
	const { t } = useI18n()
	const { lanes, ticks, now, nowRatio, legend } = useChairTimeline()

	return (
		<Card
			as='section'
			className='animate-rise'
			style={{ animationDelay: '300ms' }}
		>
			<CardHeader
				title={t('Загрузка кресел')}
				description={
					<>
						{t('08:00 – 18:00 · сейчас')}{' '}
						<span className='font-mono font-semibold text-accent'>{now}</span>
					</>
				}
				actions={<Legend items={legend} />}
			/>
			<TableScroll>
				<div className='flex min-w-[680px] flex-col gap-2 pb-0.5'>
					<div className='relative ml-24 h-4 font-mono text-[11px] text-ink-subtle'>
						{ticks.map(tick => (
							<span
								key={tick.label}
								className={cn(
									'absolute top-0',
									TICK_SHIFT[tick.edge as keyof typeof TICK_SHIFT],
								)}
								style={{ left: `${tick.left}%` }}
							>
								{tick.label}
							</span>
						))}
					</div>
					<div className='relative flex flex-col gap-2'>
						{lanes.map(lane => (
							<div key={lane.key} className='flex items-center gap-3'>
								<div className='w-[84px] shrink-0'>
									<div className='font-semibold'>{lane.name}</div>
									<div className='truncate text-[12.5px] leading-[18px] text-ink-muted'>
										{lane.doctor}
									</div>
								</div>
								<div className='relative h-10 flex-grow rounded-xl bg-sunken bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px)] bg-[length:10%_100%] shadow-press'>
									{lane.bars.map(bar => (
										<div
											key={bar.key}
											title={bar.title}
											className={cn(
												'absolute top-[5px] bottom-[5px] flex origin-left animate-grow items-center truncate rounded-[9px] px-2 text-xs font-semibold whitespace-nowrap',
												APPOINTMENT_BLOCK_CLASS[bar.status],
											)}
											style={{
												left: bar.left,
												width: bar.width,
												animationDelay: `${bar.delay}ms`,
											}}
										>
											<span className='truncate'>{bar.label}</span>
										</div>
									))}
								</div>
							</div>
						))}
						<div
							aria-hidden='true'
							className='absolute -top-1 -bottom-1 z-[2] -ml-px w-0.5 rounded-sm bg-accent'
							style={{
								left: `calc(96px + (100% - 96px) * ${nowRatio.toFixed(4)})`,
							}}
						>
							<span className='absolute -top-1 -left-1 size-2.5 animate-blink rounded-full bg-accent' />
						</div>
					</div>
				</div>
			</TableScroll>
		</Card>
	)
}
