'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'

import { usePlanTotals } from '../model/usePlanTotals'

const totalRow = 'flex justify-between gap-2.5 text-[13.5px]'

export function PlanTotalsCard() {
	const t = useTranslations('PlanForm')
	const totals = usePlanTotals()

	return (
		<div className='flex w-75 flex-col gap-2 rounded-2xl border border-line bg-raised p-3.5 max-mobile:w-full'>
			<div className={totalRow}>
				<span className='text-ink-muted'>{t('total')}</span>
				<span className='font-mono'>{totals.sum}</span>
			</div>
			<div className={totalRow}>
				<span className='text-ink-muted'>{t('discount')}</span>
				<span className='font-mono'>{totals.discount}</span>
			</div>
			<div className={cn(totalRow, 'text-info')}>
				<span>{t('foms')}</span>
				<span className='font-mono'>{totals.foms}</span>
			</div>
			<div
				className={cn(
					totalRow,
					'border-t border-line pt-2 text-base font-extrabold',
				)}
			>
				<span>{t('toPay')}</span>
				<span className='font-mono'>{totals.total}</span>
			</div>
			{totals.installment && (
				<div className='text-[12.5px] text-ink-muted'>{totals.installment}</div>
			)}
		</div>
	)
}
