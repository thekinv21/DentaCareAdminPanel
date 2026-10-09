'use client'

import { Smartphone } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { type Invoice, PaymentMethodTile } from '@/entities/invoice'

import { cn } from '@/shared/lib/cn'
import { useFormat } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { inputClass } from '@/shared/ui/field'

import type { PaymentFormModel } from '../model/usePaymentForm'

type TPaymentFormProps = {
	invoice: Invoice
	form: PaymentFormModel
	onConfirm: () => void
}

export function PaymentForm({ invoice, form, onConfirm }: TPaymentFormProps) {
	const t = useTranslations('Billing')
	const format = useFormat()
	const amount = `${form.amount} ${t('som')}`

	return (
		<div className='flex flex-col gap-3.5'>
			<div>
				<h2 className='font-display text-base leading-5.5 font-bold'>
					{t('acceptPayment')}
				</h2>
				<p className='text-[12.5px] leading-4.5 text-ink-muted'>
					{t('invoice')} <span className='font-mono'>{invoice.number}</span> ·{' '}
					{format.name(invoice.patientName)}
				</p>
			</div>

			<label className='flex flex-col gap-1.5'>
				<span className='text-[12.5px] leading-4 font-semibold'>
					{t('amountSom')}
				</span>
				<input
					key={invoice.number}
					className={cn(inputClass, 'h-11.5 font-mono text-lg font-semibold')}
					inputMode='numeric'
					defaultValue={form.amount}
				/>
				<span className='text-[12.5px] leading-4.5 text-ink-muted'>
					{t('invoiceBalance')} <span className='font-mono'>{amount}</span>
				</span>
			</label>

			<div className='flex flex-col gap-1.5'>
				<span
					id='payment-method-label'
					className='text-[12.5px] leading-4 font-semibold'
				>
					{t('paymentMethod')}
				</span>
				<div
					role='radiogroup'
					aria-labelledby='payment-method-label'
					className='grid grid-cols-2 gap-2'
				>
					{form.methods.map(item => (
						<button
							key={item.id}
							type='button'
							role='radio'
							aria-checked={item.checked}
							onClick={() => form.setMethod(item.id)}
							className={cn(
								'flex w-full items-center gap-2.5 rounded-[14px] border p-2.5 text-left transition-[border-color,background-color,box-shadow] duration-150',
								item.checked
									? 'border-brand bg-brand-soft shadow-[0_0_0_1px_var(--brand)]'
									: 'border-line bg-surface hover:bg-raised',
							)}
						>
							<PaymentMethodTile method={item.id} />
							<span className='min-w-0'>
								<span className='block truncate text-[13.5px] font-semibold'>
									{item.name}
								</span>
								<span className='block truncate text-[11.5px] text-ink-muted'>
									{item.kind}
								</span>
							</span>
						</button>
					))}
				</div>
			</div>

			<div className='flex animate-fade items-center gap-3.5 rounded-[14px] border border-line bg-raised p-3.5'>
				{form.isCard ? (
					<span className='flex size-26 shrink-0 items-center justify-center rounded-[14px] border border-line bg-surface text-info'>
						<Smartphone size={44} strokeWidth={1.4} aria-hidden='true' />
					</span>
				) : (
					<svg
						width='104'
						height='104'
						viewBox='0 0 25 25'
						role='img'
						aria-label={t('paymentQrCode')}
						className='shrink-0 rounded-lg bg-white p-1'
					>
						<path d={form.qr} fill='#0D2A2E' />
					</svg>
				)}
				<div className='flex min-w-0 flex-col gap-1'>
					<span className='font-semibold'>{form.hint.title}</span>
					<span className='text-[12.5px] leading-4.5 text-ink-muted'>
						{form.hint.text}
					</span>
					<Badge tone='info' className='mt-1 self-start'>
						{form.hint.status}
					</Badge>
				</div>
			</div>

			<Button variant='primary' block className='h-11.5' onClick={onConfirm}>
				{t('confirmPayment')} <span className='font-mono'>{amount}</span>
			</Button>
			<Button variant='ghost' size='sm' block>
				{t('issueReceipt')}
			</Button>
		</div>
	)
}
