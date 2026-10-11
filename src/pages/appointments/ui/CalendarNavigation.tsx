'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'

import type { TCalendarModel } from '../model/useCalendar'

type TCalendarNavigationProps = { calendar: TCalendarModel }

/**
 * Previous/next/today buttons and the title of the visible range
 */
export function CalendarNavigation({ calendar }: TCalendarNavigationProps) {
	const t = useTranslations('Appointments')

	return (
		<div className='flex flex-wrap items-center gap-1.5'>
			<IconButton
				aria-label={t('back')}
				className='h-9 min-w-9'
				onClick={calendar.previous}
			>
				<ChevronLeft size={16} strokeWidth={2.2} aria-hidden='true' />
			</IconButton>
			<IconButton
				aria-label={t('forward')}
				className='h-9 min-w-9'
				onClick={calendar.next}
			>
				<ChevronRight size={16} strokeWidth={2.2} aria-hidden='true' />
			</IconButton>
			<Button size='sm' onClick={calendar.goToday}>
				{t('today')}
			</Button>
			<h2
				aria-live='polite'
				className='ml-2 font-display text-lg leading-6 font-extrabold tracking-[-0.01em]'
			>
				{calendar.title}
			</h2>
		</div>
	)
}
