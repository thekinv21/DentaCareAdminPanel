'use client'

import Link from 'next/link'

import { useTranslations } from 'next-intl'

import { PaymentMethodTile } from '@/entities/invoice'

import { translateOptional, useFormat } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { Badge } from '@/shared/ui/badge'
import { buttonClass } from '@/shared/ui/button'
import { Card, CardHeader } from '@/shared/ui/card'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import { PAYMENTS } from '../model/Profile'

export function PaymentsSection() {
	const t = useTranslations('PatientProfile')
	const format = useFormat()
	return (
		<Card as='section' className='animate-fade'>
			<CardHeader
				title={t('billing')}
				description={t('balanceDueLastPayment')}
				actions={
					<Link href={ROUTES.billing} className={buttonClass({ size: 'sm' })}>
						{t('acceptPayment')}
					</Link>
				}
			/>
			<TableScroll>
				<Table className='min-w-140'>
					<thead>
						<tr>
							<Th>{t('date')}</Th>
							<Th>{t('invoice')}</Th>
							<Th>{t('method')}</Th>
							<Th align='right'>{t('amount')}</Th>
							<Th>{t('status')}</Th>
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
										{translateOptional(t, payment.methodLabel)}
									</span>
								</Td>
								<Td mono align='right'>
									{format.som(payment.amount)}
								</Td>
								<Td>
									<Badge tone='ok'>{t('paid')}</Badge>
								</Td>
							</tr>
						))}
					</tbody>
				</Table>
			</TableScroll>
		</Card>
	)
}
