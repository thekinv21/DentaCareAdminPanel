'use client'

import { useTranslations } from 'next-intl'

import { ProgressBar } from '@/shared/ui/progress'

import type { TConfirmDialogModel } from './useConfirmDialog'

type TBulkProgressProps = {
	bulk: TConfirmDialogModel['bulk']
	/**
	 * "Deleted"; "Processed" by default
	 */
	progressText?: string
}

export function BulkProgress({ bulk, progressText }: TBulkProgressProps) {
	const t = useTranslations('Confirm')

	return (
		<div role='status' className='flex flex-col gap-1.5'>
			<div className='flex justify-between text-[13px]'>
				<span className='font-semibold'>
					{progressText ?? t('processed')} {bulk.done} {t('of')} {bulk.total}
				</span>
				<span className='font-mono text-ink-muted'>{bulk.percent}%</span>
			</div>
			<ProgressBar value={bulk.percent} size='md' />
		</div>
	)
}
