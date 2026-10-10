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

	const isEdit = item !== null
	const openCreate = () => show(null)
	const openEdit = (next: TItem) => show(next)
	const close = () => setOpen(false)

	return { open, item, isEdit, openCreate, openEdit, close }
}
