'use client'

import { useContext } from 'react'

import { ConfirmContext } from './ConfirmContext'

/**
 * Opens the global confirmation dialog: `confirm({ tone, title, ... })`
 */
export function useConfirm() {
	const confirm = useContext(ConfirmContext)
	if (!confirm)
		throw new Error('useConfirm must be used inside <ConfirmProvider>')
	return confirm
}
