'use client'

import { ReceiptText } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { Avatar } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { ChoiceChipsField } from '@/shared/ui/choice-chips'
import { Field, formGrid3 } from '@/shared/ui/field'
import { Modal, ModalFooter } from '@/shared/ui/modal'
import { SubjectTile } from '@/shared/ui/subject-tile'

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
					<ModalFooter
						onCancel={form.close}
						saving={form.saving}
						savingLabel={t('creating')}
						submitLabel={form.isEdit ? tCommon('save') : t('createAndCollect')}
						extra={
							!form.isEdit && (
								<Button onClick={form.submitOnly}>{t('createInvoice')}</Button>
							)
						}
					/>
				}
			>
				<div className={formGrid3}>
					<Field as='div' label={t('patient')} required>
						<SubjectTile
							compact
							media={<Avatar initials={form.patient.initials} size={32} />}
							title={form.patient.name}
							caption={<span className='font-mono'>{form.patient.meta}</span>}
						/>
					</Field>
					<Field as='div' label={t('basis')}>
						<ChoiceChipsField
							control={form.methods.control}
							name='basis'
							aria-label={t('basis')}
							options={INVOICE_BASES.map(basis => ({
								id: basis,
								label: t(BASIS_LABEL[basis]),
							}))}
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
