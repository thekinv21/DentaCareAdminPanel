'use client'

import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { useFormat } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'
import { FormField, inputClass } from '@/shared/ui/field'
import { Spinner } from '@/shared/ui/spinner'

import type { TPaymentFormInput } from '../model/PaymentFormSchema'
import type { TPaymentModel } from '../model/usePayment'
import type { TPaymentDetails } from '../model/usePaymentDetails'
import { PaymentInstructions } from './PaymentInstructions'
import { PaymentMethodPicker } from './PaymentMethodPicker'

type TPaymentFormProps = {
	payment: TPaymentModel
	details: TPaymentDetails
}

export function PaymentForm({ payment, details }: TPaymentFormProps) {
	const t = useTranslations('Billing')
	const format = useFormat()
	const { invoice, methods } = payment

	return (
		<FormProvider {...methods}>
			<form
				noValidate
				onSubmit={payment.submit}
				className='flex flex-col gap-3.5'
			>
				<div>
					<h2 className='font-display text-base leading-5.5 font-bold'>
						{t('acceptPayment')}
					</h2>
					<p className='text-[12.5px] leading-4.5 text-ink-muted'>
						{t('invoice')} <span className='font-mono'>{invoice.number}</span> ·{' '}
						{format.name(invoice.patientName)}
					</p>
				</div>

				<PaymentAmountField balance={details.balance} />
				<PaymentMethodPicker paymentMethods={details.paymentMethods} />
				<PaymentInstructions details={details} />

				<Button
					type='submit'
					variant='primary'
					block
					className='h-11.5'
					aria-busy={payment.saving}
				>
					{payment.saving && <Spinner />}
					{t('confirmPayment')}{' '}
					<span className='font-mono'>{details.amount}</span>
				</Button>
				{/* receipts come with the fiscal printer integration */}
				<Button variant='ghost' size='sm' block disabled>
					{t('issueReceipt')}
				</Button>
			</form>
		</FormProvider>
	)
}

type TPaymentAmountFieldProps = { balance: string }

function PaymentAmountField({ balance }: TPaymentAmountFieldProps) {
	const t = useTranslations('Billing')
	const inputProps = useFieldProps<TPaymentFormInput>()

	return (
		<FormField
			name='amount'
			label={t('amountSom')}
			hint={
				<>
					{t('invoiceBalance')} <span className='font-mono'>{balance}</span>
				</>
			}
		>
			<input
				className={cn(inputClass, 'h-11.5 font-mono text-lg font-semibold')}
				inputMode='numeric'
				{...inputProps('amount')}
			/>
		</FormField>
	)
}
