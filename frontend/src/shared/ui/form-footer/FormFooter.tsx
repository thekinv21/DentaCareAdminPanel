'use client'

import { useTranslations } from 'next-intl'

import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Spinner } from '@/shared/ui/spinner'

type TFormFooterProps = {
	saved: boolean
	/**
	 * Display-ready confirmation text
	 */
	savedLabel: string
	dirty: boolean
	saving: boolean
	onReset: () => void
}

/**
 * Save/cancel bar at the bottom of a settings form; "Save" submits the form
 */
export function FormFooter(props: TFormFooterProps) {
	const { saved, savedLabel, dirty, saving, onReset } = props

	const t = useTranslations('Common')

	return (
		<div className='flex shrink-0 items-center justify-end gap-2.5 border-t border-line pt-3.5'>
			{saved && !dirty && (
				<span role='status' className='mr-auto animate-fade'>
					<Badge tone='ok'>{savedLabel}</Badge>
				</span>
			)}
			{dirty && (
				<span className='mr-auto text-[12.5px] text-ink-muted'>
					{t('youHaveUnsavedChanges')}
				</span>
			)}
			<Button onClick={onReset} disabled={!dirty || saving}>
				{t('cancel')}
			</Button>
			<Button type='submit' variant='primary' aria-busy={saving}>
				{saving && <Spinner />}
				{saving ? t('saving') : t('save')}
			</Button>
		</div>
	)
}
