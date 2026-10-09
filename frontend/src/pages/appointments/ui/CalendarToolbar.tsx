'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'
import { Segmented } from '@/shared/ui/segmented'

import type { CalendarModel } from '../model/use-calendar'

const DOT: Record<string, string> = {
	brand: 'bg-brand',
	info: 'bg-info',
	accent: 'bg-accent',
}

export function CalendarToolbar({ calendar }: { calendar: CalendarModel }) {
	const { t } = useI18n()
	return (
		<>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<div className='flex flex-wrap items-center gap-1.5'>
					<IconButton
						aria-label={t('Назад')}
						className='h-9 min-w-9'
						onClick={calendar.prev}
					>
						<ChevronLeft size={16} strokeWidth={2.2} aria-hidden='true' />
					</IconButton>
					<IconButton
						aria-label={t('Вперёд')}
						className='h-9 min-w-9'
						onClick={calendar.next}
					>
						<ChevronRight size={16} strokeWidth={2.2} aria-hidden='true' />
					</IconButton>
					<Button size='sm' onClick={calendar.goToday}>
						{t('Сегодня')}
					</Button>
					<h2
						aria-live='polite'
						className='ml-2 font-display text-lg leading-6 font-extrabold tracking-[-0.01em]'
					>
						{calendar.title}
					</h2>
				</div>
				<Segmented
					aria-label={t('Вид')}
					options={calendar.views}
					value={calendar.view}
					onChange={calendar.setView}
				/>
			</div>

			<div className='flex flex-wrap items-center gap-2'>
				<span className='mr-1 text-[12.5px] text-ink-muted'>{t('Врачи')}</span>
				{calendar.doctors.map(doctor => (
					<button
						key={doctor.key}
						type='button'
						aria-pressed={doctor.on}
						onClick={doctor.toggle}
						className={cn(
							'inline-flex h-8 items-center gap-[7px] rounded-full border px-3 text-[13px] font-semibold transition-colors duration-150',
							doctor.on
								? 'border-line-strong bg-surface text-ink'
								: 'border-transparent bg-sunken text-ink-muted',
						)}
					>
						<span
							className={cn(
								'size-[9px] rounded-full',
								DOT[doctor.color],
								!doctor.on && 'opacity-35',
							)}
						/>
						{doctor.name}
					</button>
				))}
				<span className='flex-grow' />
				<span className='text-[12.5px] text-ink-muted'>{calendar.total}</span>
			</div>
		</>
	)
}
