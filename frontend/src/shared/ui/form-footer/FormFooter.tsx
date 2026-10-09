'use client'

import { useTranslations } from 'next-intl'

import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'

interface FormFooterProps {
	saved: boolean
	/**
	 * Display-ready confirmation text
	 */
	savedLabel: string
	dirty?: boolean
	onSave: () => void
	onReset: () => void
}

/**
 * Save/cancel bar at the bottom of a settings card
 */
export function FormFooter({
	saved,
	savedLabel,
	dirty,
	onSave,
	onReset,
}: FormFooterProps) {
	const t = useTranslations('Common')
	return (
		<div className='flex shrink-0 items-center justify-end gap-2.5 border-t border-line pt-3.5'>
			{saved && (
				<span role='status' className='mr-auto animate-fade'>
					<Badge tone='ok'>{savedLabel}</Badge>
				</span>
			)}
			{dirty && !saved && (
				<span className='mr-auto text-[12.5px] text-ink-muted'>
					{t('youHaveUnsavedChanges')}
				</span>
			)}
			<Button onClick={onReset}>{t('cancel')}</Button>
			<Button variant='primary' onClick={onSave}>
				{t('save')}
			</Button>
		</div>
	)
}
