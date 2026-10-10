'use client'

import { Smartphone } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Controller, FormProvider } from 'react-hook-form'

import { PaymentMethodTile } from '@/entities/invoice'

import { cn } from '@/shared/lib/cn'
import { useFormat } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { FormField, inputClass } from '@/shared/ui/field'
import { Spinner } from '@/shared/ui/spinner'

import type { TPaymentModel } from '../model/usePayment'
import type { TPaymentDetails } from '../model/usePaymentDetails'

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

				<FormField
					name='amount'
					label={t('amountSom')}
					hint={
						<>
							{t('invoiceBalance')}{' '}
							<span className='font-mono'>{details.balance}</span>
						</>
					}
				>
					<input
						className={cn(inputClass, 'h-11.5 font-mono text-lg font-semibold')}
						inputMode='numeric'
						aria-invalid={!!methods.formState.errors.amount}
						{...methods.register('amount')}
					/>
				</FormField>

				<div className='flex flex-col gap-1.5'>
					<span
						id='payment-method-label'
						className='text-[12.5px] leading-4 font-semibold'
					>
						{t('paymentMethod')}
					</span>
					<Controller
						control={methods.control}
						name='method'
						render={({ field }) => (
							<div
								role='radiogroup'
								aria-labelledby='payment-method-label'
								className='grid grid-cols-2 gap-2'
							>
								{details.methods.map(item => (
									<button
										key={item.id}
										type='button'
										role='radio'
										aria-checked={item.id === field.value}
										onClick={() => field.onChange(item.id)}
										className={cn(
											'flex w-full items-center gap-2.5 rounded-[14px] border p-2.5 text-left transition-[border-color,background-color,box-shadow] duration-150',
											item.id === field.value
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
						)}
					/>
				</div>

				<div className='flex animate-fade items-center gap-3.5 rounded-[14px] border border-line bg-raised p-3.5'>
					{details.isCard ? (
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
							<path d={details.qr} fill='#0D2A2E' />
						</svg>
					)}
					<div className='flex min-w-0 flex-col gap-1'>
						<span className='font-semibold'>{details.hint.title}</span>
						<span className='text-[12.5px] leading-4.5 text-ink-muted'>
							{details.hint.text}
						</span>
						<Badge tone='info' className='mt-1 self-start'>
							{details.hint.status}
						</Badge>
					</div>
				</div>

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
				<Button variant='ghost' size='sm' block>
					{t('issueReceipt')}
				</Button>
			</form>
		</FormProvider>
	)
}
