'use client'

import { useTranslations } from 'next-intl'

import { Card } from '@/shared/ui/card'

import type { TPaymentModel } from '../model/usePayment'
import { usePaymentDetails } from '../model/usePaymentDetails'
import { PaymentForm } from './PaymentForm'
import { PaymentSuccess } from './PaymentSuccess'
import { RevenueSplitList } from './RevenueSplitList'

type TPaymentPanelProps = { payment: TPaymentModel }

export function PaymentPanel({ payment }: TPaymentPanelProps) {
	const t = useTranslations('Billing')
	const details = usePaymentDetails(payment)

	return (
		<Card
			as='aside'
			aria-label={t('acceptPayment')}
			className='max-w-110 flex-[1_1_320px] animate-rise max-mobile:max-w-none'
			style={{ animationDelay: '200ms' }}
		>
			{payment.isDone ? (
				<PaymentSuccess payment={payment} details={details} />
			) : (
				<PaymentForm payment={payment} details={details} />
			)}
			<RevenueSplitList />
		</Card>
	)
}
