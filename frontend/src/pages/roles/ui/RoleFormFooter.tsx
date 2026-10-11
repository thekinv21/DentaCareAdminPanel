'use client'

import Link from 'next/link'

import { useTranslations } from 'next-intl'

import { ROUTES } from '@/shared/routes'
import { buttonClass } from '@/shared/ui/button'
import { SubmitButton } from '@/shared/ui/submit-button'

type TRoleFormFooterProps = { isEdit: boolean; saving: boolean }

export function RoleFormFooter({ isEdit, saving }: TRoleFormFooterProps) {
	const t = useTranslations('RoleForm')

	const tCommon = useTranslations('Common')

	return (
		<div className='flex shrink-0 flex-wrap items-center justify-end gap-2.5 border-t border-line pt-3.5'>
			<Link href={ROUTES.roles} className={buttonClass()}>
				{tCommon('cancel')}
			</Link>
			<SubmitButton busy={saving}>
				{isEdit ? t('saveChanges') : t('createRole')}
			</SubmitButton>
		</div>
	)
}
