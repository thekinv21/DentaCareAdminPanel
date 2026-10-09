'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { usePaymentMethods } from '@/entities/invoice'

import { Button } from '@/shared/ui/button'
import { Delta, StatCard, StatGrid } from '@/shared/ui/stat-card'

import { useBilling } from '../model/useBilling'
import { useInvoiceActions } from '../model/useInvoiceActions'
import { useInvoiceForm } from '../model/useInvoiceForm'
import { InvoiceFormModal } from './InvoiceFormModal'
import { InvoicesTable } from './InvoicesTable'
import { PaymentPanel } from './PaymentPanel'

export function BillingPage() {
	const t = useTranslations('Billing')
	const methods = usePaymentMethods()
	const form = useInvoiceForm()
	const actions = useInvoiceActions(
		invoice => methods.byId(invoice.method).name,
	)
	const billing = useBilling({
		voided: actions.voided,
		onEdit: form.openEdit,
		onVoid: actions.voidInvoice,
		onRefund: actions.refund,
	})

	return (
		<>
			<PageHeader
				crumb={t('october2026AcceptedVia')}
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
						label={t('receivedInOctober')}
						value='2 184 300'
						unit={t('som')}
						footer={
							<>
								<Delta>+9%</Delta> {t('vsSeptember')}
							</>
						}
					/>
					<StatCard
						label={t('amountDue')}
						value='218 400'
						unit={t('som')}
						delay={50}
						footer={t('n23Patients')}
					/>
					<StatCard
						label={t('overdue')}
						value='46 900'
						unit={t('som')}
						valueClass='text-danger'
						delay={100}
						footer={t('n6InvoicesOlderThan')}
					/>
				</StatGrid>
				<section className='flex flex-[1_0_auto] flex-wrap items-stretch gap-4'>
					<InvoicesTable billing={billing} />
					<PaymentPanel billing={billing} />
				</section>
			</PageContent>
			<InvoiceFormModal form={form} />
		</>
	)
}
