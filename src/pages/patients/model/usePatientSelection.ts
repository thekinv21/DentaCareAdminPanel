'use client'

import { useState } from 'react'

/**
 * Checked rows of the patient table for bulk actions
 */
export function usePatientSelection(visibleIds: string[]) {
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
	const isAllSelected =
		visibleIds.length > 0 && visibleIds.every(id => selectedIds.has(id))

	return {
		selectedIds,
		isAllSelected,
		toggle: (id: string) =>
			setSelectedIds(current => {
				const next = new Set(current)
				if (next.has(id)) next.delete(id)
				else next.add(id)
				return next
			}),
		toggleAll: () =>
			setSelectedIds(current => {
				const next = new Set(current)
				visibleIds.forEach(id =>
					isAllSelected ? next.delete(id) : next.add(id),
				)
				return next
			}),
		clear: () => setSelectedIds(new Set()),
	}
}
