'use client'

import { useRef, useState } from 'react'

import { errorMessage } from '@/shared/lib/error'

import type { TBulkItem, TConfirmOptions } from './ConfirmTypes'

export type TBulkFailure = { item: TBulkItem; error: string }

/**
 * Sequential bulk run with a progress counter and a retry of failed items
 */
export function useBulkRun(bulk: TConfirmOptions['bulk']) {
	const [done, setDone] = useState(0)

	const [failed, setFailed] = useState<TBulkFailure[] | null>(null)

	const succeeded = useRef<string[]>([])

	const total = bulk?.items.length ?? 0

	/**
	 * Resolves with true when every item succeeded
	 */
	const run = async (items: TBulkItem[]) => {
		if (!bulk) return true

		const offset = total - items.length

		// a full run starts over; a retry keeps the items that already succeeded
		if (offset === 0) succeeded.current = []

		const failures: TBulkFailure[] = []

		setFailed(null)

		for (const [index, item] of items.entries()) {
			try {
				await bulk.run(item)
				succeeded.current.push(item.id)
			} catch (error) {
				failures.push({ item, error: errorMessage(error) })
			}
			setDone(offset + index + 1)
		}

		if (failures.length) {
			setFailed(failures)
			setDone(total - failures.length)
		}

		return failures.length === 0
	}

	const percent = total ? Math.round((done / total) * 100) : 0

	const retry = () => run(failed?.map(failure => failure.item) ?? [])

	const settle = () => bulk?.onDone?.(succeeded.current)

	return { total, done, failed, percent, run, retry, settle }
}
