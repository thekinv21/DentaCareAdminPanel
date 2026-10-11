'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { Card, CardHeader } from '@/shared/ui/card'

import { useVisitHistory } from '../model/useVisitHistory'

type TVisit = ReturnType<typeof useVisitHistory>[number]

export function VisitHistorySection() {
	const t = useTranslations('PatientProfile')
	const visits = useVisitHistory()

	return (
		<Card as='section' className='animate-fade'>
			<CardHeader title={t('visitHistory')} />
			<ol className='flex flex-col'>
				{visits.map(visit => (
					<VisitItem key={visit.key} visit={visit} />
				))}
			</ol>
		</Card>
	)
}

type TVisitItemProps = { visit: TVisit }

function VisitItem({ visit }: TVisitItemProps) {
	return (
		<li className='flex gap-3'>
			<div className='flex flex-col items-center'>
				<span
					className={cn(
						'mt-1.25 size-2.75 shrink-0 rounded-full',
						visit.isDone ? 'bg-success' : 'bg-line-strong',
					)}
				/>
				{!visit.isLast && <span className='mt-1 w-0.5 grow bg-line' />}
			</div>
			<div className={cn(!visit.isLast && 'pb-4')}>
				<div className='font-semibold'>
					{visit.title} <span className='font-mono'>{visit.tooth}</span>
				</div>
				<div className='text-[12.5px] leading-4.5 text-ink-muted'>
					{visit.meta}
				</div>
				{visit.note && <div className='mt-1 text-[13px]'>{visit.note}</div>}
			</div>
		</li>
	)
}
