'use client'

import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PaymentMethodTile } from '@/entities/invoice'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { ProgressBar } from '@/shared/ui/progress'

import type { BillingModel } from '../model/useBilling'
import { usePaymentForm } from '../model/usePaymentForm'
import { useRevenueSplit } from '../model/useRevenueSplit'
import { PaymentForm } from './PaymentForm'

type TPaymentPanelProps = { billing: BillingModel }

export function PaymentPanel({ billing }: TPaymentPanelProps) {
	const t = useTranslations('Billing')
	const form = usePaymentForm(billing.invoice, billing.invoiceIndex)
	const split = useRevenueSplit()
	const amount = `${form.amount} ${t('som')}`

	return (
		<Card
			as='aside'
			aria-label={t('acceptPayment')}
			className='max-w-110 flex-[1_1_320px] animate-rise max-[720px]:max-w-none'
			style={{ animationDelay: '200ms' }}
		>
			{billing.done ? (
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
							<span className='font-mono'>{amount}</span> · {form.methodName}{' '}
							{t('invoiceInline')}{' '}
							<span className='font-mono'>{billing.invoice.number}</span>
						</p>
					</div>
					<div className='flex w-full gap-2'>
						<Button size='sm' className='flex-1'>
							{t('printReceipt')}
						</Button>
						<Button size='sm' className='flex-1'>
							{t('sendSms')}
						</Button>
					</div>
					<Button size='sm' variant='ghost' onClick={billing.reset}>
						{t('newPayment')}
					</Button>
				</div>
			) : (
				<PaymentForm
					invoice={billing.invoice}
					form={form}
					onConfirm={billing.confirm}
				/>
			)}

			<div className='flex flex-col gap-2.5 border-t border-line pt-3.5'>
				<span className='text-[11px] leading-3.5 font-semibold tracking-[0.06em] text-ink-muted uppercase'>
					{t('octoberRevenue')}
				</span>
				{split.map((item, index) => (
					<div key={item.id}>
						<div className='flex items-center justify-between gap-1.5 text-[13px]'>
							<span className='inline-flex items-center gap-2'>
								<PaymentMethodTile method={item.id} size='sm' />
								{item.name}
							</span>
							<span>
								<span className='font-mono font-semibold'>{item.sum}</span>{' '}
								<span className='font-mono text-ink-muted'>
									{item.percent}%
								</span>
							</span>
						</div>
						<ProgressBar
							value={item.bar}
							fillClass={item.barClass}
							delay={index * 60}
							className='mt-1.5'
						/>
					</div>
				))}
			</div>
		</Card>
	)
}
