'use client'

import Link from 'next/link'

import { PaymentMethodTile } from '@/entities/invoice'

import { useI18n } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { Badge } from '@/shared/ui/badge'
import { buttonClass } from '@/shared/ui/button'
import { Card, CardHeader } from '@/shared/ui/card'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import { PAYMENTS } from '../model/profile'

export function PaymentsSection() {
	const { t, format } = useI18n()
	return (
		<Card as='section' className='animate-fade'>
			<CardHeader
				title={t('Оплаты')}
				description={t('Долг 6 400 сом · последний платёж 12.09.2026')}
				actions={
					<Link href={ROUTES.billing} className={buttonClass({ size: 'sm' })}>
						{t('Принять оплату')}
					</Link>
				}
			/>
			<TableScroll>
				<Table className='min-w-[560px]'>
					<thead>
						<tr>
							<Th>{t('Дата')}</Th>
							<Th>{t('Счёт')}</Th>
							<Th>{t('Способ')}</Th>
							<Th align='right'>{t('Сумма')}</Th>
							<Th>{t('Статус')}</Th>
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
										{t(payment.methodLabel)}
									</span>
								</Td>
								<Td mono align='right'>
									{format.som(payment.amount)}
								</Td>
								<Td>
									<Badge tone='ok'>{t('Оплачено')}</Badge>
								</Td>
							</tr>
						))}
					</tbody>
				</Table>
			</TableScroll>
		</Card>
	)
}
