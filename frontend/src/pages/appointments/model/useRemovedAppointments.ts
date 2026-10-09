'use client'

import { useState } from 'react'

/**
 * Keys of events deleted or cancelled in this session (mock until the API exists)
 */
export function useRemovedAppointments() {
	const [removedKeys, setRemovedKeys] = useState<Set<string>>(new Set())
	const change = (key: string, removed: boolean) =>
		setRemovedKeys(current => {
			const next = new Set(current)
			if (removed) next.add(key)
			else next.delete(key)
			return next
		})

	return {
		removedKeys,
		remove: (key: string) => change(key, true),
		restore: (key: string) => change(key, false),
	}
}
