import Link from 'next/link'

import { PaymentMethodTile } from '@/entities/invoice'

import { cn } from '@/shared/lib/cn'
import { formatSom } from '@/shared/lib/format'
import { ROUTES } from '@/shared/routes'
import { Badge } from '@/shared/ui/badge'
import { Button, buttonClass } from '@/shared/ui/button'
import { Card, CardHeader } from '@/shared/ui/card'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import { PAYMENTS, PLAN_STEPS, VISITS } from '../model/profile'

export function TreatmentPlanSection() {
	const total = PLAN_STEPS.reduce((sum, step) => sum + step.price, 0)
	const coverage = 6000
	return (
		<Card as='section' className='animate-fade'>
			<CardHeader
				title='План лечения'
				description='Согласован с пациентом 12.09.2026 · Касымова А.'
				actions={<Button size='sm'>Записать оставшиеся</Button>}
			/>
			<TableScroll>
				<Table className='min-w-[640px]'>
					<thead>
						<tr>
							<Th>№</Th>
							<Th>Процедура</Th>
							<Th>Зуб</Th>
							<Th>Дата</Th>
							<Th>Статус</Th>
							<Th align='right'>Стоимость</Th>
						</tr>
					</thead>
					<tbody>
						{PLAN_STEPS.map((step, index) => (
							<tr key={step.procedure}>
								<Td mono className='text-ink-muted'>
									{index + 1}
								</Td>
								<Td className='font-semibold'>{step.procedure}</Td>
								<Td mono>{step.tooth}</Td>
								<Td nowrap className={cn(step.dateMuted && 'text-ink-muted')}>
									{step.date}
								</Td>
								<Td>
									<Badge tone={step.status.tone}>{step.status.label}</Badge>
								</Td>
								<Td mono nowrap align='right'>
									{formatSom(step.price)}
								</Td>
							</tr>
						))}
					</tbody>
				</Table>
			</TableScroll>
			<dl className='flex flex-wrap justify-end gap-2'>
				<div className='min-w-[140px] rounded-xl bg-raised px-3.5 py-2'>
					<dt className='text-[12.5px] text-ink-muted'>Итого</dt>
					<dd className='font-mono font-semibold'>{formatSom(total)}</dd>
				</div>
				<div className='min-w-[140px] rounded-xl bg-info-soft px-3.5 py-2'>
					<dt className='text-[12.5px] text-info'>ФОМС</dt>
					<dd className='font-mono font-semibold'>−{formatSom(coverage)}</dd>
				</div>
				<div className='min-w-[140px] rounded-xl bg-brand-soft px-3.5 py-2'>
					<dt className='text-[12.5px] text-brand-strong'>К оплате</dt>
					<dd className='font-mono font-semibold'>
						{formatSom(total - coverage)}
					</dd>
				</div>
			</dl>
		</Card>
	)
}

export function VisitHistorySection() {
	return (
		<Card as='section' className='animate-fade'>
			<CardHeader title='История визитов' />
			<ol className='flex flex-col'>
				{VISITS.map((visit, index) => {
					const last = index === VISITS.length - 1
					return (
						<li key={visit.meta} className='flex gap-3'>
							<div className='flex flex-col items-center'>
								<span
									className={cn(
										'mt-[5px] size-[11px] shrink-0 rounded-full',
										visit.done ? 'bg-success' : 'bg-line-strong',
									)}
								/>
								{!last && <span className='mt-1 w-0.5 flex-grow bg-line' />}
							</div>
							<div className={cn(!last && 'pb-4')}>
								<div className='font-semibold'>
									{visit.title} <span className='font-mono'>{visit.tooth}</span>
								</div>
								<div className='text-[12.5px] leading-[18px] text-ink-muted'>
									{visit.meta}
								</div>
								{visit.note && (
									<div className='mt-1 text-[13px]'>{visit.note}</div>
								)}
							</div>
						</li>
					)
				})}
			</ol>
		</Card>
	)
}

export function PaymentsSection() {
	return (
		<Card as='section' className='animate-fade'>
			<CardHeader
				title='Оплаты'
				description='Долг 6 400 сом · последний платёж 12.09.2026'
				actions={
					<Link href={ROUTES.billing} className={buttonClass({ size: 'sm' })}>
						Принять оплату
					</Link>
				}
			/>
			<TableScroll>
				<Table className='min-w-[560px]'>
					<thead>
						<tr>
							<Th>Дата</Th>
							<Th>Счёт</Th>
							<Th>Способ</Th>
							<Th align='right'>Сумма</Th>
							<Th>Статус</Th>
						</tr>
					</thead>
					<tbody>
						{PAYMENTS.map(payment => (
							<tr key={payment.invoice}>
								<Td nowrap>{payment.date}</Td>
								<Td mono>{payment.invoice}</Td>
								<Td>
									<span className='inline-flex items-center gap-2'>
										<PaymentMethodTile method={payment.method} size='sm' />
										{payment.methodLabel}
									</span>
								</Td>
								<Td mono align='right'>
									{formatSom(payment.amount)}
								</Td>
								<Td>
									<Badge tone='ok'>Оплачено</Badge>
								</Td>
							</tr>
						))}
					</tbody>
				</Table>
			</TableScroll>
		</Card>
	)
}
