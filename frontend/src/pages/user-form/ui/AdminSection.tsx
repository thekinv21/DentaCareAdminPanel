'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { AffixInput } from '@/shared/ui/affix-input'
import { Badge } from '@/shared/ui/badge'
import { ToggleChips } from '@/shared/ui/choice-chips'
import { Field, formGrid2, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'

import { PAYMENT_CHANNELS, TILLS } from '../model/Options'
import type { TUserFormValues } from '../model/Schema'
import { UserSwitch } from './UserSwitch'

export function AdminSection() {
	const t = useTranslations('UserForm')
	const { control, register } = useFormContext<TUserFormValues>()

	return (
		<FormSection
			className='animate-fade'
			title={t('receptionAndTill')}
			aside={<Badge>{t('adminFields')}</Badge>}
		>
			<Field as='div' label={t('acceptsPaymentVia')}>
				<Controller
					control={control}
					name='payments'
					render={({ field }) => (
						<ToggleChips
							aria-label={t('paymentMethods')}
							options={PAYMENT_CHANNELS.map(id => ({
								id: id as string,
								label: t(`channel_${id}`),
							}))}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</Field>
			<div className={formGrid2}>
				<Field label={t('discountWithoutApproval')} hint={t('discountHint')}>
					<AffixInput suffix='%' {...register('discountLimit')} />
				</Field>
				<Field label={t('till')}>
					<select className={inputClass} {...register('till')}>
						{TILLS.map(till => (
							<option key={till} value={till}>
								{t(till)}
							</option>
						))}
					</select>
				</Field>
				<UserSwitch
					name='cancel'
					label={t('cancelAppointments')}
					hint={t('cancelAppointmentsHint')}
					ariaLabel={t('cancelAppointmentsShort')}
				/>
				<UserSwitch
					name='refund'
					label={t('refunds')}
					hint={t('refundsHint')}
				/>
			</div>
		</FormSection>
	)
}
