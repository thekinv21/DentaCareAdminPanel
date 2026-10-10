'use client'

import { ReceiptText } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Controller, FormProvider } from 'react-hook-form'

import { Avatar } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { Field, formGrid3 } from '@/shared/ui/field'
import { Modal } from '@/shared/ui/modal'
import { Spinner } from '@/shared/ui/spinner'

import { INVOICE_BASES } from '../model/InvoiceFormSchema'
import type { TInvoiceFormModel } from '../model/useInvoiceForm'
import { InvoiceDueDateField } from './InvoiceDueDateField'
import { InvoiceItemsTable } from './InvoiceItemsTable'
import { InvoicePaymentTerms } from './InvoicePaymentTerms'

const BASIS_LABEL = {
	plan: 'basisPlan',
	visit: 'basisVisit',
	none: 'basisNone',
} as const

type TInvoiceFormModalProps = { form: TInvoiceFormModel }

export function InvoiceFormModal({ form }: TInvoiceFormModalProps) {
	const t = useTranslations('InvoiceForm')
	const tCommon = useTranslations('Common')

	return (
		<FormProvider {...form.methods}>
			<Modal
				open={form.open}
				onClose={form.close}
				onSubmit={form.submit}
				busy={form.saving}
				wide
				icon={<ReceiptText size={20} aria-hidden='true' />}
				title={form.title}
				subtitle={form.subtitle}
				footer={
					<>
						<span className='flex-1' />
						<Button onClick={form.close}>{tCommon('cancel')}</Button>
						{!form.isEdit && (
							<Button onClick={form.submitOnly}>{t('createInvoice')}</Button>
						)}
						<Button type='submit' variant='primary' aria-busy={form.saving}>
							{form.saving && <Spinner />}
							{form.saving
								? t('creating')
								: form.isEdit
									? tCommon('save')
									: t('createAndCollect')}
						</Button>
					</>
				}
			>
				<div className={formGrid3}>
					<Field as='div' label={t('patient')} required>
						<div className='flex items-center gap-3 rounded-[14px] border-[1.5px] border-brand bg-brand-soft px-2.5 py-2'>
							<Avatar initials={form.patient.initials} size={32} />
							<div className='min-w-0 flex-1'>
								<div className='truncate font-bold'>{form.patient.name}</div>
								<div className='font-mono text-[11.5px] text-ink-muted'>
									{form.patient.meta}
								</div>
							</div>
						</div>
					</Field>
					<Field as='div' label={t('basis')}>
						<Controller
							control={form.methods.control}
							name='basis'
							render={({ field }) => (
								<ChoiceChips
									aria-label={t('basis')}
									options={INVOICE_BASES.map(id => ({
										id,
										label: t(BASIS_LABEL[id]),
									}))}
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>
					</Field>
					<InvoiceDueDateField />
				</div>
				<InvoiceItemsTable />
				<InvoicePaymentTerms />
			</Modal>
		</FormProvider>
	)
}
