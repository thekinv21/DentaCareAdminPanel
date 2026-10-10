'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'
import { StatCard, StatDelta, StatGrid } from '@/shared/ui/stat-card'

import { useBilling } from '../model/useBilling'
import { useBillingSummary } from '../model/useBillingSummary'
import { useInvoiceActions } from '../model/useInvoiceActions'
import { useInvoiceForm } from '../model/useInvoiceForm'
import { usePayment } from '../model/usePayment'
import { InvoiceFormModal } from './InvoiceFormModal'
import { InvoicesTable } from './InvoicesTable'
import { PaymentPanel } from './PaymentPanel'

export function BillingPage() {
	const t = useTranslations('Billing')
	const form = useInvoiceForm()
	const payment = usePayment()
	const actions = useInvoiceActions()
	const summary = useBillingSummary()
	const billing = useBilling({
		voided: actions.voided,
		onEdit: form.openEdit,
		onVoid: actions.voidInvoice,
		onRefund: actions.refund,
		onPay: payment.start,
	})

	return (
		<>
			<PageHeader
				crumb={t('pageCrumb')}
				title={t('billing')}
				actions={
					<Button variant='primary' onClick={form.openCreate}>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						{t('newInvoice')}
					</Button>
				}
			/>
			<PageContent>
				<StatGrid label={t('summary')}>
					<StatCard
						label={t('receivedThisMonth')}
						value={summary.received}
						unit={t('som')}
						footer={
							<>
								<StatDelta>{summary.receivedChange}</StatDelta>{' '}
								{t('vsPreviousMonth')}
							</>
						}
					/>
					<StatCard
						label={t('amountDue')}
						value={summary.amountDue}
						unit={t('som')}
						delay={50}
						footer={summary.debtors}
					/>
					<StatCard
						label={t('overdue')}
						value={summary.overdue}
						unit={t('som')}
						valueClass='text-danger'
						delay={100}
						footer={summary.overdueInvoices}
					/>
				</StatGrid>
				<section className='flex flex-[1_0_auto] flex-wrap items-stretch gap-4'>
					<InvoicesTable billing={billing} />
					<PaymentPanel payment={payment} />
				</section>
			</PageContent>
			<InvoiceFormModal form={form} />
		</>
	)
}
