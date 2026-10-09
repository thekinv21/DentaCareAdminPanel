'use client'

import { useTranslations } from 'next-intl'

import { AffixInput } from '@/shared/ui/affix-input'
import { Badge } from '@/shared/ui/badge'
import { ToggleChips } from '@/shared/ui/choice-chips'
import { Field, formGrid2, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { SwitchCard } from '@/shared/ui/switch-card'

import { PAYMENT_CHANNELS, TILLS } from '../model/Options'
import type { TUserFormModel } from '../model/useUserForm'

type TAdminSectionProps = { form: TUserFormModel }

export function AdminSection({ form }: TAdminSectionProps) {
	const t = useTranslations('UserForm')

	return (
		<FormSection
			className='animate-fade'
			title={t('receptionAndTill')}
			aside={<Badge>{t('adminFields')}</Badge>}
		>
			<Field as='div' label={t('acceptsPaymentVia')}>
				<ToggleChips
					aria-label={t('paymentMethods')}
					options={PAYMENT_CHANNELS.map(id => ({
						id: id as string,
						label: t(`channel_${id}`),
					}))}
					value={form.choices.payments}
					onChange={value => form.choose('payments', value)}
				/>
			</Field>
			<div className={formGrid2}>
				<Field label={t('discountWithoutApproval')} hint={t('discountHint')}>
					<AffixInput suffix='%' {...form.field('discountLimit')} />
				</Field>
				<Field label={t('till')}>
					<select className={inputClass} {...form.field('till')}>
						{TILLS.map(till => (
							<option key={till} value={till}>
								{t(till)}
							</option>
						))}
					</select>
				</Field>
				<SwitchCard
					label={t('cancelAppointments')}
					hint={t('cancelAppointmentsHint')}
					aria-label={t('cancelAppointmentsShort')}
					checked={form.switches.cancel}
					onChange={form.flip('cancel')}
				/>
				<SwitchCard
					label={t('refunds')}
					hint={t('refundsHint')}
					checked={form.switches.refund}
					onChange={form.flip('refund')}
				/>
			</div>
		</FormSection>
	)
}
