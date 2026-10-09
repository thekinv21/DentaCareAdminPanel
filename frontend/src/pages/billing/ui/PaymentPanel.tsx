'use client'

import { useMemo, useState } from 'react'

import { Check, Smartphone } from 'lucide-react'

import {
	type Invoice,
	PAYMENT_METHODS,
	type PaymentMethodId,
	PaymentMethodTile,
	REVENUE_BY_METHOD,
} from '@/entities/invoice'

import { cn } from '@/shared/lib/cn'
import { formatNumber, formatSom } from '@/shared/lib/format'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { inputClass } from '@/shared/ui/field'
import { ProgressBar } from '@/shared/ui/progress'

import { mockQrPath } from '../lib/mock-qr'

const METHOD_SEED: Record<PaymentMethodId, number> = {
	visa: 3,
	mbank: 7,
	komp: 11,
	optima: 13,
}
const TOP_SHARE = Math.max(...REVENUE_BY_METHOD.map(item => item.percent))

interface PaymentPanelProps {
	invoice: Invoice
	invoiceIndex: number
	done: boolean
	onConfirm: () => void
	onReset: () => void
}

export function PaymentPanel({
	invoice,
	invoiceIndex,
	done,
	onConfirm,
	onReset,
}: PaymentPanelProps) {
	const [method, setMethod] = useState<PaymentMethodId>('mbank')
	const amount = formatNumber(invoice.balance || invoice.amount)
	const isCard = method === 'visa'
	const qr = useMemo(
		() => mockQrPath(METHOD_SEED[method] + invoiceIndex * 5),
		[method, invoiceIndex],
	)
	const methodName = PAYMENT_METHODS[method].name

	return (
		<Card
			as='aside'
			aria-label='Принять оплату'
			className='max-w-[440px] flex-[1_1_320px] animate-rise max-[720px]:max-w-none'
			style={{ animationDelay: '200ms' }}
		>
			{done ? (
				<div
					role='status'
					className='flex animate-fade flex-col items-start gap-3.5'
				>
					<span className='flex size-14 items-center justify-center rounded-[18px] bg-success-soft text-success'>
						<Check size={28} strokeWidth={2.4} aria-hidden='true' />
					</span>
					<div>
						<h2 className='font-display text-base leading-[22px] font-bold'>
							Оплата принята
						</h2>
						<p className='text-[12.5px] leading-[18px] text-ink-muted'>
							<span className='font-mono'>{amount} сом</span> · {methodName} ·
							счёт <span className='font-mono'>{invoice.number}</span>
						</p>
					</div>
					<div className='flex w-full gap-2'>
						<Button size='sm' className='flex-1'>
							Печать чека
						</Button>
						<Button size='sm' className='flex-1'>
							Отправить SMS
						</Button>
					</div>
					<Button size='sm' variant='ghost' onClick={onReset}>
						Новая оплата
					</Button>
				</div>
			) : (
				<div className='flex flex-col gap-3.5'>
					<div>
						<h2 className='font-display text-base leading-[22px] font-bold'>
							Принять оплату
						</h2>
						<p className='text-[12.5px] leading-[18px] text-ink-muted'>
							Счёт <span className='font-mono'>{invoice.number}</span> ·{' '}
							{invoice.patientName}
						</p>
					</div>

					<label className='flex flex-col gap-1.5'>
						<span className='text-[12.5px] leading-4 font-semibold'>
							Сумма, сом
						</span>
						<input
							key={invoice.number}
							className={cn(
								inputClass,
								'h-[46px] font-mono text-lg font-semibold',
							)}
							inputMode='numeric'
							defaultValue={amount}
						/>
						<span className='text-[12.5px] leading-[18px] text-ink-muted'>
							Остаток по счёту: <span className='font-mono'>{amount} сом</span>
						</span>
					</label>

					<div className='flex flex-col gap-1.5'>
						<span
							id='payment-method-label'
							className='text-[12.5px] leading-4 font-semibold'
						>
							Способ оплаты
						</span>
						<div
							role='radiogroup'
							aria-labelledby='payment-method-label'
							className='grid grid-cols-2 gap-2'
						>
							{Object.values(PAYMENT_METHODS).map(item => {
								const checked = item.id === method
								return (
									<button
										key={item.id}
										type='button'
										role='radio'
										aria-checked={checked}
										onClick={() => setMethod(item.id)}
										className={cn(
											'flex w-full items-center gap-2.5 rounded-[14px] border p-2.5 text-left transition-[border-color,background-color,box-shadow] duration-150',
											checked
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
								)
							})}
						</div>
					</div>

					<div className='flex animate-fade items-center gap-3.5 rounded-[14px] border border-line bg-raised p-3.5'>
						{isCard ? (
							<span className='flex size-[104px] shrink-0 items-center justify-center rounded-[14px] border border-line bg-surface text-info'>
								<Smartphone size={44} strokeWidth={1.4} aria-hidden='true' />
							</span>
						) : (
							<svg
								width='104'
								height='104'
								viewBox='0 0 25 25'
								role='img'
								aria-label='QR-код для оплаты'
								className='shrink-0 rounded-lg bg-white p-1'
							>
								<path d={qr} fill='#0D2A2E' />
							</svg>
						)}
						<div className='flex min-w-0 flex-col gap-1'>
							<span className='font-semibold'>
								{isCard
									? 'Приложите или вставьте карту'
									: `Сканируйте QR в приложении ${methodName}`}
							</span>
							<span className='text-[12.5px] leading-[18px] text-ink-muted'>
								{isCard
									? 'Сумма отправлена на терминал у стойки администратора.'
									: 'Пациент подтверждает платёж в мобильном банке. Статус обновится автоматически.'}
							</span>
							<Badge tone='info' className='mt-1 self-start'>
								{isCard ? 'Терминал · ожидает карту' : 'QR действителен 5:00'}
							</Badge>
						</div>
					</div>

					<Button
						variant='primary'
						block
						className='h-[46px]'
						onClick={onConfirm}
					>
						Подтвердить оплату · <span className='font-mono'>{amount} сом</span>
					</Button>
					<Button variant='ghost' size='sm' block>
						Выдать чек
					</Button>
				</div>
			)}

			<div className='flex flex-col gap-2.5 border-t border-line pt-3.5'>
				<span className='text-[11px] leading-[14px] font-semibold tracking-[0.06em] text-ink-muted uppercase'>
					Поступления за октябрь
				</span>
				{REVENUE_BY_METHOD.map((item, index) => {
					const info = PAYMENT_METHODS[item.method]
					return (
						<div key={item.method}>
							<div className='flex items-center justify-between gap-1.5 text-[13px]'>
								<span className='inline-flex items-center gap-2'>
									<PaymentMethodTile method={item.method} size='sm' />
									{info.name}
								</span>
								<span>
									<span className='font-mono font-semibold'>
										{formatSom(item.sum)}
									</span>{' '}
									<span className='font-mono text-ink-muted'>
										{item.percent}%
									</span>
								</span>
							</div>
							<ProgressBar
								value={(item.percent / TOP_SHARE) * 100}
								fillClass={info.barClass}
								delay={index * 60}
								className='mt-1.5'
							/>
						</div>
					)
				})}
			</div>
		</Card>
	)
}
