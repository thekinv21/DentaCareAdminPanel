'use client'

import Link from 'next/link'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { ROLES, type TSystemRoleId, useRoleLabels } from '@/entities/role'

import { ROUTES } from '@/shared/routes'
import { Button } from '@/shared/ui/button'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { Field, formGrid2 } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { SwitchCard, SwitchCardField } from '@/shared/ui/switch-card'

import type { TUserFormValues } from '../model/UserFormSchema'

const ASSIGNABLE = ROLES.filter(role => role.id !== 'store')

const ROLE_HINT: Record<TSystemRoleId, string | null> = {
	owner: 'ownerHint',
	chief: 'chiefHint',
	doctor: 'doctorHint',
	assistant: 'assistantHint',
	reception: 'receptionHint',
	finance: 'financeHint',
	store: null,
}

/**
 * Mock password age until the backend sends it
 */
const PASSWORD_AGE_DAYS = 64

type TAccessSectionProps = {
	isEdit: boolean
	onResetPassword: () => void
}

export function AccessSection({
	isEdit,
	onResetPassword,
}: TAccessSectionProps) {
	const t = useTranslations('UserForm')
	const labels = useRoleLabels()
	const { control } = useFormContext<TUserFormValues>()

	return (
		<FormSection title={t('access')}>
			<div className={formGrid2}>
				<Controller
					control={control}
					name='role'
					render={({ field }) => {
						const hint = ROLE_HINT[field.value]
						return (
							<Field
								as='div'
								label={t('role')}
								required
								className='col-span-full'
								hint={
									<>
										{hint && `${t(hint)} · `}
										<Link
											href={ROUTES.roles}
											className='font-semibold text-brand no-underline hover:underline'
										>
											{t('configureRoles')}
										</Link>
									</>
								}
							>
								<ChoiceChips
									aria-label={t('role')}
									options={ASSIGNABLE.map(role => ({
										id: role.id as TSystemRoleId,
										label: labels.text(role.name),
									}))}
									value={field.value}
									onChange={field.onChange}
								/>
							</Field>
						)
					}}
				/>
				<Field as='div' label={t('signIn')}>
					{isEdit ? (
						<SwitchCard
							label={t('password')}
							hint={t('editedDaysAgo', { days: PASSWORD_AGE_DAYS })}
							action={
								<Button size='sm' onClick={onResetPassword}>
									{t('resetPassword')}
								</Button>
							}
						/>
					) : (
						<SwitchCardField
							control={control}
							name='switches.sendInvite'
							label={t('sendSmsInvite')}
							hint={t('employeeSetsPassword')}
							aria-label={t('sendInvite')}
						/>
					)}
				</Field>
				<div className='flex flex-col gap-3.5 pt-5.5 max-mobile:pt-0'>
					<SwitchCardField
						control={control}
						name='switches.twoFactor'
						label={t('twoStepVerification')}
						hint={t('smsCodeEveryLogin')}
					/>
				</div>
				<SwitchCardField
					control={control}
					name='switches.accountActive'
					label={t('active')}
					hint={t('turnOffToCloseAccess')}
				/>
			</div>
		</FormSection>
	)
}
