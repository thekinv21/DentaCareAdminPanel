import type { TTone } from '@/shared/ui/badge'

export type TConfirmTone =
	'danger' | 'critical' | 'warning' | 'success' | 'info'

export type TImpactTone = 'danger' | 'warning' | 'ok' | 'neutral' | 'info'

type TConfirmSubject = {
	title: string
	subtitle?: string
	initials?: string
	tone?: TTone
}

export type TBulkItem = {
	id: string
	name: string
	initials?: string
	tone?: TTone
}

export type TConfirmPayload = {
	reason: string | null
	reasonText: string
	options: Record<string, boolean>
	choice: string | null
}

export type TConfirmOptions = {
	tone?: TConfirmTone
	/**
	 * A question with a verb: "Delete user?"
	 */
	title: string
	/**
	 * What will change, in plain words
	 */
	description: string
	subject?: TConfirmSubject
	/**
	 * Consequences with numbers from the API
	 */
	impact?: { tone?: TImpactTone; n?: number | string; text: string }[]
	/**
	 * Pick one variant, e.g. the new role for the staff of a deleted role
	 */
	choice?: {
		label: string
		value: string
		items: { id: string; label: string; hint?: string }[]
	}
	/**
	 * Reason chips plus a free comment; with `reasonRequired` the button waits for one
	 */
	reasons?: string[]
	reasonRequired?: boolean
	options?: { id: string; label: string; hint?: string; checked?: boolean }[]
	/**
	 * Code the user has to type by hand before confirming
	 */
	typeToConfirm?: string
	/**
	 * Seconds before the confirm button becomes active
	 */
	countdown?: number
	/**
	 * Runs `run` for every item with progress; failed items can be retried
	 */
	bulk?: {
		title?: string
		items: TBulkItem[]
		run: (item: TBulkItem) => Promise<unknown>
		onDone?: (succeededIds: string[]) => void
	}
	confirmText: string
	cancelText?: string
	pendingText?: string
	/**
	 * Bulk progress label: "Deleted 4 of 12"
	 */
	progressText?: string
	/**
	 * Toast after success
	 */
	successText?: string
	/**
	 * After success the toast offers "Undo" for 5 seconds
	 */
	undo?: { onUndo: () => void; text?: string }
	/**
	 * Return a promise: the dialog shows a spinner, and a rejection keeps it
	 * open with the error message and "Retry"
	 */
	onConfirm?: (payload: TConfirmPayload) => unknown
}

export type TConfirmRequest = TConfirmOptions & { key: number }
