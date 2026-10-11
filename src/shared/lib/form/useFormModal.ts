'use client'

import { useState } from 'react'

/**
 * Open state of a create/edit modal and the record being edited (`null` while creating).
 * `onOpen` fills the form before the modal shows.
 */
export function useFormModal<TItem>(onOpen: (item: TItem | null) => void) {
	const [open, setOpen] = useState<boolean>(false)
	const [item, setItem] = useState<TItem | null>(null)

	const show = (next: TItem | null): void => {
		setItem(next)
		onOpen(next)
		setOpen(true)
	}

	return {
		open,
		item,
		isEdit: item !== null,
		openCreate: () => show(null),
		openEdit: (next: TItem) => show(next),
		close: () => setOpen(false),
	}
}
