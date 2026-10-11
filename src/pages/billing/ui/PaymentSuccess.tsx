'use client'

import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'

import type { TPaymentModel } from '../model/usePayment'
import type { TPaymentDetails } from '../model/usePaymentDetails'

type TPaymentSuccessProps = {
	payment: TPaymentModel
	details: TPaymentDetails
}

export function PaymentSuccess({ payment, details }: TPaymentSuccessProps) {
	const t = useTranslations('Billing')

	return (
		<div
			role='status'
			className='flex animate-fade flex-col items-start gap-3.5'
		>
			<span className='flex size-14 items-center justify-center rounded-[18px] bg-success-soft text-success'>
				<Check size={28} strokeWidth={2.4} aria-hidden='true' />
			</span>
			<div>
				<h2 className='font-display text-base leading-5.5 font-bold'>
					{t('paymentAccepted')}
				</h2>
				<p className='text-[12.5px] leading-4.5 text-ink-muted'>
					<span className='font-mono'>{details.amount}</span> ·{' '}
					{details.methodName} {t('invoiceInline')}{' '}
					<span className='font-mono'>{payment.invoice.number}</span>
				</p>
			</div>
			{/* receipts and SMS come with the fiscal printer and SMS gateway */}
			<div className='flex w-full gap-2'>
				<Button size='sm' className='flex-1' disabled>
					{t('printReceipt')}
				</Button>
				<Button size='sm' className='flex-1' disabled>
					{t('sendSms')}
				</Button>
			</div>
			<Button size='sm' variant='ghost' onClick={payment.restart}>
				{t('newPayment')}
			</Button>
		</div>
	)
}
