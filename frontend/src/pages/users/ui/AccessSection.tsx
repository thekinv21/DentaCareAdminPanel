'use client'

import Link from 'next/link'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { ROUTES } from '@/shared/routes'
import { ChoiceChipsField } from '@/shared/ui/choice-chips'
import { Field } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { SwitchCardField } from '@/shared/ui/switch-card'

import type { TUserFormValues } from '../model/UserFormSchema'
import type { TUserFormModel } from '../model/useUserForm'

type TAccessSectionProps = { roles: TUserFormModel['roles'] }

export function AccessSection({ roles }: TAccessSectionProps) {
	const t = useTranslations('UserForm')

	const { control } = useFormContext<TUserFormValues>()

	return (
		<FormSection title={t('access')}>
			<Field
				as='div'
				label={t('role')}
				required
				hint={
					<Link
						href={ROUTES.roles}
						className='font-semibold text-brand no-underline hover:underline'
					>
						{t('configureRoles')}
					</Link>
				}
			>
				<ChoiceChipsField
					control={control}
					name='role'
					aria-label={t('role')}
					options={roles}
				/>
			</Field>
			<SwitchCardField
				control={control}
				name='active'
				label={t('active')}
				hint={t('turnOffToCloseAccess')}
			/>
		</FormSection>
	)
}
