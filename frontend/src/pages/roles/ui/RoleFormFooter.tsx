'use client'

import Link from 'next/link'

import { useTranslations } from 'next-intl'

import { ROUTES } from '@/shared/routes'
import { buttonClass } from '@/shared/ui/button'
import { SubmitButton } from '@/shared/ui/submit-button'

type TRoleFormFooterProps = {
	isEdit: boolean
	saving: boolean
	/**
	 * "Unsaved changes" or where the permissions apply
	 */
	statusText: string
}

export function RoleFormFooter(props: TRoleFormFooterProps) {
	const { isEdit, saving, statusText } = props

	const t = useTranslations('RoleForm')
	const tCommon = useTranslations('Common')
	return (
		<div className='flex shrink-0 flex-wrap items-center gap-2.5 rounded-b-[20px] border-t border-line bg-raised px-5.5 py-3.5'>
			<span className='mr-auto text-[12.5px] text-ink-muted'>{statusText}</span>
			<Link href={ROUTES.roles} className={buttonClass()}>
				{tCommon('cancel')}
			</Link>
			<SubmitButton busy={saving}>
				{isEdit ? t('saveChanges') : t('createRole')}
			</SubmitButton>
		</div>
	)
}
