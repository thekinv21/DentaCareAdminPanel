'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'

import { ConfirmSection } from './ConfirmSection'
import { IMPACT_CLASS, IMPACT_MARK } from './ConfirmTone'
import type { TConfirmImpact } from './ConfirmTypes'

type TConfirmImpactListProps = { impact: TConfirmImpact[] }

/**
 * "What will happen": consequences with numbers or marks
 */
export function ConfirmImpactList({ impact }: TConfirmImpactListProps) {
	const t = useTranslations('Confirm')

	return (
		<ConfirmSection label={t('whatWillHappen')}>
			<ul className='flex flex-col gap-1.5'>
				{impact.map((item, index) => (
					<ImpactRow key={`${index}-${item.text}`} item={item} />
				))}
			</ul>
		</ConfirmSection>
	)
}

type TImpactRowProps = { item: TConfirmImpact }

function ImpactRow({ item }: TImpactRowProps) {
	const tone = item.tone ?? 'neutral'

	return (
		<li className='flex items-start gap-2.5 text-[13.5px] leading-4.75'>
			<span
				className={cn(
					'inline-flex size-5 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-bold',
					IMPACT_CLASS[tone],
				)}
			>
				{item.n ?? IMPACT_MARK[tone]}
			</span>
			<span>{item.text}</span>
		</li>
	)
}
