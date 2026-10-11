'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { ToggleRowField } from '@/shared/ui/toggle-row'

import { BANK_DETAILS, PAYMENT_OPTIONS } from '../model/Payments'
import type { TSettingsFormValues } from '../model/SettingsForm'
import { BankCard } from './BankCard'

export function PaymentSection() {
	const t = useTranslations('Settings')
	const { control } = useFormContext<TSettingsFormValues>()

	return (
		<div className='flex animate-fade flex-col gap-3 pb-2'>
			{BANK_DETAILS.map(bank => (
				<BankCard key={bank.id} bank={bank} />
			))}
			<div className='rounded-2xl border border-line px-3.5 py-1'>
				{PAYMENT_OPTIONS.map(option => (
					<ToggleRowField
						key={option.id}
						control={control}
						name={`paymentOptions.${option.id}`}
						label={t(option.label)}
						hint={t(option.hint)}
					/>
				))}
			</div>
		</div>
	)
}
