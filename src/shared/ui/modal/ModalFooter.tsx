'use client'

import type { ReactNode } from 'react'

import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'
import { SubmitButton } from '@/shared/ui/submit-button'

type TModalFooterProps = {
	onCancel: () => void
	saving: boolean
	submitLabel: string
	/**
	 * Shown on the submit button while saving; "Saving…" by default
	 */
	savingLabel?: string
	/**
	 * Left-aligned actions, e.g. a <ModalDeleteButton>
	 */
	leading?: ReactNode
	/**
	 * Secondary actions between "Cancel" and the submit button
	 */
	extra?: ReactNode
}

/**
 * Standard modal footer: leading actions, then Cancel, extra actions and submit
 */
export function ModalFooter(props: TModalFooterProps) {
	const { onCancel, saving, submitLabel, savingLabel, leading, extra } = props

	const t = useTranslations('Common')
	return (
		<>
			{leading}
			<span className='flex-1' />
			<Button onClick={onCancel}>{t('cancel')}</Button>
			{extra}
			<SubmitButton busy={saving} busyLabel={savingLabel}>
				{submitLabel}
			</SubmitButton>
		</>
	)
}
