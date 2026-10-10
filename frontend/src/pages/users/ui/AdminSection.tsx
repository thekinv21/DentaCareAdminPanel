'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { useFieldProps } from '@/shared/lib/form'
import { AffixInput } from '@/shared/ui/affix-input'
import { Badge } from '@/shared/ui/badge'
import { ToggleChipsField } from '@/shared/ui/choice-chips'
import { Field, FormField, formGrid2 } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { Select } from '@/shared/ui/select'
import { SwitchCardField } from '@/shared/ui/switch-card'

import { PAYMENT_CHANNELS, TILLS } from '../model/Options'
import type { TUserFormValues } from '../model/UserFormSchema'

export function AdminSection() {
	const t = useTranslations('UserForm')

	const { control } = useFormContext<TUserFormValues>()

	const inputProps = useFieldProps<TUserFormValues>()

	return (
		<FormSection
			className='animate-fade'
			title={t('receptionAndTill')}
			aside={<Badge>{t('adminFields')}</Badge>}
		>
			<Field as='div' label={t('acceptsPaymentVia')}>
				<ToggleChipsField
					control={control}
					name='payments'
					aria-label={t('paymentMethods')}
					options={PAYMENT_CHANNELS.map(channel => ({
						id: channel,
						label: t(`channel_${channel}`),
					}))}
				/>
			</Field>
			<div className={formGrid2}>
				<FormField
					name='discountLimit'
					label={t('discountWithoutApproval')}
					hint={t('discountHint')}
				>
					<AffixInput suffix='%' {...inputProps('discountLimit')} />
				</FormField>
				<Field label={t('till')}>
					<Select {...inputProps('till')}>
						{TILLS.map(till => (
							<option key={till} value={till}>
								{t(till)}
							</option>
						))}
					</Select>
				</Field>
				<SwitchCardField
					control={control}
					name='switches.cancelAppointments'
					label={t('cancelAppointments')}
					hint={t('cancelAppointmentsHint')}
					aria-label={t('cancelAppointmentsShort')}
				/>
				<SwitchCardField
					control={control}
					name='switches.issueRefunds'
					label={t('refunds')}
					hint={t('refundsHint')}
				/>
			</div>
		</FormSection>
	)
}
