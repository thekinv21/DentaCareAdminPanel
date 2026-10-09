'use client'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'
import { Card, CardHeader } from '@/shared/ui/card'

import { VISITS } from '../model/profile'

export function VisitHistorySection() {
	const { t } = useI18n()
	return (
		<Card as='section' className='animate-fade'>
			<CardHeader title={t('История визитов')} />
			<ol className='flex flex-col'>
				{VISITS.map((visit, index) => {
					const last = index === VISITS.length - 1
					return (
						<li key={visit.meta} className='flex gap-3'>
							<div className='flex flex-col items-center'>
								<span
									className={cn(
										'mt-[5px] size-[11px] shrink-0 rounded-full',
										visit.done ? 'bg-success' : 'bg-line-strong',
									)}
								/>
								{!last && <span className='mt-1 w-0.5 flex-grow bg-line' />}
							</div>
							<div className={cn(!last && 'pb-4')}>
								<div className='font-semibold'>
									{t(visit.title)}{' '}
									<span className='font-mono'>{visit.tooth}</span>
								</div>
								<div className='text-[12.5px] leading-[18px] text-ink-muted'>
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
