'use client'

import { useTranslations } from 'next-intl'

import { Alert } from '@/shared/ui/alert'

import type { TBulkFailure } from './useBulkRun'

type TBulkFailuresProps = { failures: TBulkFailure[]; total: number }

/**
 * Items the bulk run could not process, with the reason for each
 */
export function BulkFailures({ failures, total }: TBulkFailuresProps) {
	const t = useTranslations('Confirm')

	return (
		<Alert tone='danger' size='sm' className='font-semibold'>
			{t('failedOf', { failed: failures.length, total })}
			<ul className='mt-1.5 flex flex-col gap-1.5 font-medium'>
				{failures.map(failure => (
					<li key={failure.item.id}>
						{failure.item.name} — {failure.error}
					</li>
				))}
			</ul>
		</Alert>
	)
}
