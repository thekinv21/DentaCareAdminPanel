'use client'

import { useTranslations } from 'next-intl'

import { PaymentMethodTile } from '@/entities/invoice'

import { Overline } from '@/shared/ui/overline'
import { ProgressBar } from '@/shared/ui/progress'

import { type TRevenueShare, useRevenueSplit } from '../model/useRevenueSplit'

const ROW_ANIMATION_STEP_MS = 60

/**
 * Revenue of the month by bank, with bars scaled to the largest share
 */
export function RevenueSplitList() {
	const t = useTranslations('Billing')
	const revenueShares = useRevenueSplit()

	return (
		<div className='flex flex-col gap-2.5 border-t border-line pt-3.5'>
			<Overline as='span'>{t('revenueThisMonth')}</Overline>
			{revenueShares.map((share, index) => (
				<RevenueSplitItem
					key={share.id}
					share={share}
					animationDelay={index * ROW_ANIMATION_STEP_MS}
				/>
			))}
		</div>
	)
}

type TRevenueSplitItemProps = {
	share: TRevenueShare
	animationDelay: number
}

function RevenueSplitItem({ share, animationDelay }: TRevenueSplitItemProps) {
	return (
		<div>
			<div className='flex items-center justify-between gap-1.5 text-[13px]'>
				<span className='inline-flex items-center gap-2'>
					<PaymentMethodTile method={share.id} size='sm' />
					{share.name}
				</span>
				<span>
					<span className='font-mono font-semibold'>{share.sum}</span>{' '}
					<span className='font-mono text-ink-muted'>{share.percent}%</span>
				</span>
			</div>
			<ProgressBar
				value={share.barPercent}
				fillClass={share.barClass}
				delay={animationDelay}
				className='mt-1.5'
			/>
		</div>
	)
}
