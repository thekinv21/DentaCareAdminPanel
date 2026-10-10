'use client'

import { useTranslations } from 'next-intl'

import { getInitials } from '@/shared/lib/format'
import { Avatar } from '@/shared/ui/avatar'

import { ConfirmSection } from './ConfirmSection'
import type { TBulkItem, TConfirmOptions } from './ConfirmTypes'

const MAX_VISIBLE_ITEMS = 6

type TConfirmBulkListProps = {
	bulk: NonNullable<TConfirmOptions['bulk']>
}

/**
 * Chips of the selected records, with a "+N more" tail
 */
export function ConfirmBulkList({ bulk }: TConfirmBulkListProps) {
	const t = useTranslations('Confirm')

	const hiddenCount = bulk.items.length - MAX_VISIBLE_ITEMS

	return (
		<ConfirmSection
			label={bulk.title ?? t('selectedN', { n: bulk.items.length })}
		>
			<div className='flex flex-wrap gap-1.5'>
				{bulk.items.slice(0, MAX_VISIBLE_ITEMS).map(item => (
					<BulkChip key={item.id} item={item} />
				))}
				{hiddenCount > 0 && (
					<span className='pl-2.5 text-[12.5px] font-semibold'>
						{t('moreN', { n: hiddenCount })}
					</span>
				)}
			</div>
		</ConfirmSection>
	)
}

type TBulkChipProps = { item: TBulkItem }

function BulkChip({ item }: TBulkChipProps) {
	return (
		<span className='inline-flex items-center gap-1.5 rounded-full border border-line bg-raised py-0.75 pr-2.5 pl-1 text-[12.5px] font-semibold'>
			<Avatar
				initials={item.initials ?? getInitials(item.name)}
				tone={item.tone ?? 'neutral'}
				size={22}
			/>
			{item.name}
		</span>
	)
}
