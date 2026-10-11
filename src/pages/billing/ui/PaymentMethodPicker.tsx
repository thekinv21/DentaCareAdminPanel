'use client'

import { useId } from 'react'

import { useTranslations } from 'next-intl'
import { useController, useFormContext } from 'react-hook-form'

import { PaymentMethodTile } from '@/entities/invoice'

import { cn } from '@/shared/lib/cn'

import type { TPaymentFormInput } from '../model/PaymentFormSchema'
import type { TPaymentDetails } from '../model/usePaymentDetails'

type TPaymentMethod = TPaymentDetails['paymentMethods'][number]

type TPaymentMethodPickerProps = { paymentMethods: TPaymentMethod[] }

/**
 * Bank/card tiles of the payment form (radio group)
 */
export function PaymentMethodPicker({
	paymentMethods,
}: TPaymentMethodPickerProps) {
	const t = useTranslations('Billing')
	const labelId = useId()
	const { control } = useFormContext<TPaymentFormInput>()
	const { field } = useController({ control, name: 'method' })

	return (
		<div className='flex flex-col gap-1.5'>
			<span id={labelId} className='text-[12.5px] leading-4 font-semibold'>
				{t('paymentMethod')}
			</span>
			<div
				role='radiogroup'
				aria-labelledby={labelId}
				className='grid grid-cols-2 gap-2'
			>
				{paymentMethods.map(paymentMethod => (
					<PaymentMethodOption
						key={paymentMethod.id}
						paymentMethod={paymentMethod}
						isSelected={paymentMethod.id === field.value}
						onSelect={() => field.onChange(paymentMethod.id)}
					/>
				))}
			</div>
		</div>
	)
}

type TPaymentMethodOptionProps = {
	paymentMethod: TPaymentMethod
	isSelected: boolean
	onSelect: () => void
}

function PaymentMethodOption(props: TPaymentMethodOptionProps) {
	const { paymentMethod, isSelected, onSelect } = props

	return (
		<button
			type='button'
			role='radio'
			aria-checked={isSelected}
			onClick={onSelect}
			className={cn(
				'flex w-full items-center gap-2.5 rounded-[14px] border p-2.5 text-left transition-[border-color,background-color,box-shadow] duration-150',
				isSelected
					? 'border-brand bg-brand-soft shadow-[0_0_0_1px_var(--brand)]'
					: 'border-line bg-surface hover:bg-raised',
			)}
		>
			<PaymentMethodTile method={paymentMethod.id} />
			<span className='min-w-0'>
				<span className='block truncate text-[13.5px] font-semibold'>
					{paymentMethod.name}
				</span>
				<span className='block truncate text-[11.5px] text-ink-muted'>
					{paymentMethod.kind}
				</span>
			</span>
		</button>
	)
}
