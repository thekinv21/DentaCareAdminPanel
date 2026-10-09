'use client'

import Link from 'next/link'

import { useTranslations } from 'next-intl'

import { ROLES, type TSystemRoleId, useRoleLabels } from '@/entities/role'

import { ROUTES } from '@/shared/routes'
import { Button } from '@/shared/ui/button'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { Field, formGrid2 } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { SwitchCard } from '@/shared/ui/switch-card'

import type { TUserFormModel } from '../model/useUserForm'

const ASSIGNABLE = ROLES.filter(role => role.id !== 'store')

const ROLE_HINT: Record<string, string> = {
	owner: 'ownerHint',
	chief: 'chiefHint',
	doctor: 'doctorHint',
	assistant: 'assistantHint',
	reception: 'receptionHint',
	finance: 'financeHint',
}

type TAccessSectionProps = { form: TUserFormModel }

export function AccessSection({ form }: TAccessSectionProps) {
	const t = useTranslations('UserForm')
	const labels = useRoleLabels()

	return (
		<FormSection title={t('access')}>
			<div className={formGrid2}>
				<Field
					as='div'
					label={t('role')}
					required
					className='col-span-full'
					hint={
						<>
							{t(ROLE_HINT[form.role])} ·{' '}
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
						value={form.role}
						onChange={form.setRole}
					/>
				</Field>
				<Field as='div' label={t('signIn')}>
					{form.isEdit ? (
						<SwitchCard
							label={t('password')}
							hint={t('changed64DaysAgo')}
							action={
								<Button size='sm' onClick={form.resetPassword}>
									{t('resetPassword')}
								</Button>
							}
						/>
					) : (
						<SwitchCard
							label={t('sendSmsInvite')}
							hint={t('employeeSetsPassword')}
							aria-label={t('sendInvite')}
							checked={form.switches.invite}
							onChange={form.flip('invite')}
						/>
					)}
				</Field>
				<div className='flex flex-col gap-3.5 pt-5.5 max-[720px]:pt-0'>
					<SwitchCard
						label={t('twoStepVerification')}
						hint={t('smsCodeEveryLogin')}
						checked={form.switches.tfa}
						onChange={form.flip('tfa')}
					/>
				</div>
				<SwitchCard
					label={t('active')}
					hint={t('turnOffToCloseAccess')}
					checked={form.switches.active}
					onChange={form.flip('active')}
				/>
			</div>
		</FormSection>
	)
}
