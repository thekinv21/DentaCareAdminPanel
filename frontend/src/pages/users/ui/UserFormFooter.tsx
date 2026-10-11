'use client'

import Link from 'next/link'

import { useTranslations } from 'next-intl'

import { ROUTES } from '@/shared/routes'
import { buttonClass } from '@/shared/ui/button'
import { SubmitButton } from '@/shared/ui/submit-button'

type TUserFormFooterProps = { isEdit: boolean; saving: boolean }

export function UserFormFooter({ isEdit, saving }: TUserFormFooterProps) {
	const t = useTranslations('UserForm')

	const tCommon = useTranslations('Common')

	return (
		<div className='flex shrink-0 flex-wrap items-center gap-2.5 border-t border-line pt-3.5'>
			<span className='mr-auto text-[12.5px] text-ink-muted'>
				{tCommon('requiredFieldsNote')}
			</span>
			<Link href={ROUTES.users} className={buttonClass()}>
				{tCommon('cancel')}
			</Link>
			<SubmitButton busy={saving}>
				{isEdit ? t('saveChanges') : t('createUser')}
			</SubmitButton>
		</div>
	)
}
