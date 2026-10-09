'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { Card, CardHeader } from '@/shared/ui/card'

import { VISITS } from '../model/Profile'

export function VisitHistorySection() {
	const t = useTranslations('PatientProfile')
	return (
		<Card as='section' className='animate-fade'>
			<CardHeader title={t('visitHistory')} />
			<ol className='flex flex-col'>
				{VISITS.map((visit, index) => {
					const last = index === VISITS.length - 1
					return (
						<li key={visit.meta} className='flex gap-3'>
							<div className='flex flex-col items-center'>
								<span
									className={cn(
										'mt-1.25 size-2.75 shrink-0 rounded-full',
										visit.done ? 'bg-success' : 'bg-line-strong',
									)}
								/>
								{!last && <span className='mt-1 w-0.5 grow bg-line' />}
							</div>
							<div className={cn(!last && 'pb-4')}>
								<div className='font-semibold'>
									{t(visit.title)}{' '}
									<span className='font-mono'>{visit.tooth}</span>
								</div>
								<div className='text-[12.5px] leading-4.5 text-ink-muted'>
									{t(visit.meta)}
								</div>
								{visit.note && (
									<div className='mt-1 text-[13px]'>{t(visit.note)}</div>
								)}
							</div>
						</li>
					)
				})}
			</ol>
		</Card>
	)
}
