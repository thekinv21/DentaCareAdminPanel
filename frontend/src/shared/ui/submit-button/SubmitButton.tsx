'use client'

import type { ReactNode } from 'react'

import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'
import { Spinner } from '@/shared/ui/spinner'

type TSubmitButtonProps = {
	busy: boolean
	/**
	 * Shown while busy; "Saving…" by default
	 */
	busyLabel?: string
	children: ReactNode
}

/**
 * Primary submit button that shows a spinner while the form is submitting
 */
export function SubmitButton({
	busy,
	busyLabel,
	children,
}: TSubmitButtonProps) {
	const t = useTranslations('Common')

	return (
		<Button type='submit' variant='primary' aria-busy={busy}>
			{busy && <Spinner />}
			{busy ? (busyLabel ?? t('saving')) : children}
		</Button>
	)
}
